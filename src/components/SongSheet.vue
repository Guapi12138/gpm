<template>
  <transition name="sliderUpHideRight">
    <div class="songsheet" ref="songsheet" v-show="showSongSheet" @scroll="scrollEvent">
      <div class="songheader">
        <i class="back icon-back" @click.stop="hideSongSheet"></i>
        <p class="title">歌单</p>
        <i class="search icon-search"></i>
        <i class="menu icon-list-circle"></i>
        <div class="songheaderimg" ref="songheader"></div>
      </div>
      <div class="content" :style="ShowImg">
        <div class="top" ref="top">
          <div class="songsheetdisc">
            <div class="songsheetimg">
              <img v-if="getSongSheet.info" :src="getSongSheet.info[0].img_url" alt="">
              <span class="info" @click.stop="showDownloadImg" @click="showDetail">i</span>
            </div>
            <div class="disc">
              <p v-show="getSongSheet" class="songsheetname">{{getSongSheet.name}}</p>
              <div class="user">
                <img v-if="getSongSheet.user" class="avatar" :src="getSongSheet.user.avatar" alt="">
                <p v-if="getSongSheet.user" class="songsheetuser">{{getSongSheet.user.name}}</p>
                <i class="icon-right"></i>
              </div>
            </div>
          </div>
          <div class="do">
            <div class="list nocollect">
              <i class="icon-like" style="color:#d20000"></i>
              <span class="disc">收藏</span>
            </div>
            <div class="list">
              <i class="icon-msg"></i>
              <span class="disc">评论</span>
            </div>
            <div class="list">
              <i class="icon-share"></i>
              <span class="disc">分享</span>
            </div>
            <div class="list">
              <i class="icon-download"></i>
              <span class="disc">下载</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-wrapper">
            <div class="info" @click="playAll(0)">
              <i class="icon-music"></i>
              <span class="name">播放全部</span>
              <span class="count">(共{{getSongSheet.count}}首)</span>
            </div>
            <div class="rightSetting">
              <i class="icon-menu"></i>
              <span>多选</span>
            </div>
          </div>
          <div class="border-1px"></div>
          <songlist></songlist>
        </div>
      </div>
      <BottomBar></BottomBar>
      <downloadimage @hidedownloadimage="hideDownloadImg" :show-image="showDownloadImage"
                     :sheet-data="sheetData"></downloadimage>
      <menulist></menulist>
    </div>
  </transition>
</template>
<script>
  import store from '../store'
  import songlist from '../widget/songlist.vue'
  import downloadimage from '../widget/downloadimage.vue'
  import BottomBar from '../components/BottomBar'
  import menulist from '../widget/menulist'

  export default {
    data() {
      return {
        isShow: false,
        isData: false,
        sheetData: false,
        showDownloadImage: false
      }
    },
    methods: {
      hideSongSheet() {
        store.commit({
          type: 'setIsShowSongSheet',
          isShow: false,
          isData: false
        })
      },
      showDetail() {
        this.sheetData = this.$store.getters.getMusicSheetList
      },
      ShowImg() {
        this.isShow = this.$store.getters.getIsShowSongSheet ? this.$store.getters.getIsShowSongSheet : false
      },
      scrollEvent() {
        let opacity = this.$refs.songsheet.scrollTop / (this.$refs.top.offsetHeight - this.$refs.songheader.offsetHeight)
        if (this.$refs.songsheet.scrollTop < this.$refs.top.offsetHeight - this.$refs.songheader.offsetHeight) {
          this.$refs.songheader.style.opacity = opacity
          this.$refs.songheader.style.filter = `alpha(opacity:${opacity * 100})`
        } else {
          this.$refs.songheader.style.opacity = 1
          this.$refs.songheader.style.filter = `alpha(opacity:${100})`
        }
      },
      playAll(index) {
        // index 是从第几个开始播放
        store.commit({
          type: 'setMusiSheetType',
          sheettype: this.$store.getters.getMusicSheetList.type
        })
        store.commit({
          type: 'setMusicList',
          list: this.$store.getters.getMusicSheetList.info
        })
        store.commit({
          type: 'playIndex',
          index: index
        })
      },
      showDownloadImg() {
        this.showDownloadImage = true
        this.$refs.songsheet.style.overflow = 'hidden'
      },
      hideDownloadImg() {
        this.showDownloadImage = false
        this.$refs.songsheet.style.overflow = 'auto'
      }
    },
    computed: {
      showSongSheet() {
        this.ShowImg()
        return this.$store.getters.getIsShowSongSheet
      },
      getSongSheet() {
        return this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
      },
      getImageColor() {
        return this.$store.getters.getSongSheetImageColor ? this.$store.getters.getSongSheetImageColor : '#333'
      }
    },
    watch: {
      isShow(newisshow, oldisshow) {
        this.$refs.songsheet.scrollTop = 0
        let img = this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
        if (newisshow) {
          this.$refs.top.style.backgroundImage = `url(${img.info[0].img_url})`
          this.$refs.top.style.backgroundSize = `6000%`
          this.$refs.top.style.backgroundPosition = `center center`
          this.$refs.songheader.style.backgroundImage = `url(${img.info[0].img_url})`
          this.$refs.songheader.style.backgroundSize = `6000%`
          this.$refs.songheader.style.backgroundPosition = `center center`
        }
      }
    },
    components: {
      songlist,
      downloadimage,
      BottomBar,
      menulist
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/global.styl"
  @import "../common/stylus/border-1px"
  .songsheet
    position: fixed
    left: 0
    top: 0
    bottom: 60px
    right: 0
    z-index: 32
    background: #fff
    overflow: auto
    -webkit-overflow-scrolling: touch
    .songheader
      position: fixed
      transform: translateZ(0)
      top: 0
      left: 0
      right: 0
      height: 60px
      z-index: 10
      display: flex
      align-items: center
      padding: 0 10px
      // background: #000
      .songheaderimg
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: -1;
        opacity: 0
      i
        flex: 0 0 36px
        width: 36px
        height: 36px
        line-height: 36px
        text-align: center
        font-size: 24px
        color: #fff
        &.menu
          font-size: 20px
      .title
        flex: 1 1 auto
        max-width: calc(100% - 108px)
        font-size: 16px
        color: #fff
        font-weight: 400
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
        margin: 0
        padding: 0 5px
    .content
      min-height: calc(10vh - 46px)
      background: #FFF
      box-sizing: border-box
      .top
        height: 230px
        background: #000
        padding: 70px 25px 20px 25px
        .songsheetdisc
          height: 100px
          display: flex
          .songsheetimg
            position: relative
            flex: 0 0 100px
            width: 100px
            height: 100px
            img
              width: 100px
              height: 100px
            .info
              display: block
              position: absolute
              bottom: 2px
              right: 2px
              width: 16px
              height: 16px
              border: 1px solid #f0f0f0
              border-radius: 50%
              text-align: center
              line-height: 16px
              color: #fff
              font-weight: 400
              background: rgba(0, 0, 0, 0.6)
          .disc
            flex: 1 1 auto
            max-width: calc(100% - 100px)
            margin-left: 15px
            display: flex
            flex-direction: column
            padding-top: 10px
            p
              margin: 0
              &.songsheetname
                height: 40px
                line-height: 20px
                font-size: 14px
                font-weight: 500
                overflow: hidden
                color: #fff
            .user
              width: 100%
              height: 30px
              line-height: 30px
              display: flex
              align-items: center
              .avatar
                width: 20px
                height: 20px
                border-radius: 50%
                color: #f0f0f0
              .songsheetuser
                text-indent: 6px
                max-width: calc(100% - 40px)
                text-overflow: ellipsis
                white-space: nowrap
                overflow: hidden
                color: #f0f0f0
                font-size: 12px
              i
                width: 20px
                height: 20px
                text-align: center
                line-height: 20px
                font-size: 12px
                color: #f0f0f0
        .do
          display: flex
          width: 100%
          height: 40px
          align-items: center
          margin-top: 15px
          div
            flex: 1
            display: flex
            flex-direction: column
            align-items: center
            color: #fff
            &:active
              color: #ccc
            &.nocollect
              i
                color: rgba(255, 255, 255, 0.3)
              span
                color: rgba(255, 255, 255, 0.8)
            i
              width: 28px
              height: 28px
              font-size: 18px
              text-align: center
              line-height: 28px
            span
              font-size: 12px
      .bottom
        position: relative
        .border-1px
          border-1px($border_1px)
        .bottom-wrapper
          height: 42px
          line-height: 42px
          .info
            position: absolute
            top: 0
            right: 0
            height: 42px
            width: 100%
            line-height: 42px
            font-size: 0
            &:active
              background: $list_active
            i
              height: 42px
              width: 42px
              line-height: 42px
              text-align: center
              font-size: 16px
              margin-right: 5px
              margin-left: 10px
              vertical-align: middle
              color: #666
            span
              display: inline-block
              vertical-align: middle
              font-size: 14px
              color: #333
              &.count
                font-size: 10px
                margin-left: 5px
                font-weight: 400
                color: #aaa
          .rightSetting
            position: absolute
            top: 0
            right: 0
            height: 42px
            width: auto
            font-size: 0
            padding: 0 10px
            &:active
              background: $list_active
            i
              height: 42px
              width: 42px
              line-height: 42px
              text-align: center
              font-size: 16px
              margin-right: 2px
              vertical-align: middle
              color: #666
            span
              display: inline-block
              vertical-align: middle
              font-size: 12px
              color: #666
    &.sliderUpHideRight-enter-to, &.sliderUpHideRight-leave-to
      transition: all 0.3s
    &.sliderUpHideRight-enter
      transform: translate3d(0, 100%, 0)
      opacity: 0
    &.sliderUpHideRight-leave-to
      transform: translate3d(100%, 0, 0)
      opacity: 0
</style>
