  <template>
  <div class="musiclist">
    <transition name="sideUp">
      <div class="content" v-show="isShowMusicList">
        <div class="title">
          <div class="play-type" @click.stop="setPlayType">
            <i :class="musicPlayType"></i>
            <span>{{musicPlayString}}</span>
            <span>({{musiclist.length}})</span>
          </div>
          <div class="right">
            <div class="collect">
              <i class="icon-add-project"></i>
              <span>收藏全部</span>
            </div>
            <div class="delete">
              <span>|</span>
              &nbsp;
              <i class="icon-delete"></i>
            </div>
          </div>
          <div class="border-1px"></div>
        </div>
        <ul class="container" ref="musiclistContent">
          <li class="list" v-for="(item, index) in musiclist"
              :class="index === getCurrentIndex ? 'active' : ''" @click.stop="playIndex(index)" :key="index">
            <div class="border-1px"></div>
            <i v-show="index === getCurrentIndex" class="playingicon icon-volume-medium"></i>
            <span class="name">{{item.name}}</span>
            <span class="singer"> - {{item.singer}}</span>
            <i class="close"></i>
            <div class="border-1px"></div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="isShowMusicList" @click.stop="hideMusicList" @touchmove.prevent>
      </div>
    </transition>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    data() {
      return {
      }
    },
    methods: {
      hideMusicList() {
        store.dispatch({
          type: 'hideMusicList'
        })
      },
      playIndex(index) {
        store.dispatch({
          type: 'play_Index',
          index: index
        })
        store.dispatch({
          type: 'hideMusicList'
        })
      },
      setPlayType() {
        store.dispatch('set_PlayType')
      }
    },
    computed: {
      isShowMusicList() {
        return this.$store.getters.getIsShowMusicList
      },
      musiclist() {
        return this.$store.getters.getMusicList
      },
      getCurrentIndex() {
        return this.$store.getters.getCurrentIndex
      },
      getScrollTop() {
        return this.$store.getters.getScrollTop
      },
      musicPlayType() {
        let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
        let className = ''
        switch (playType) {
          case 1:
            className = 'icon-music-shunxu'
            break
          case 2:
            className = 'icon-music-danqu1'
            break
          case 3:
            className = 'icon-music-random'
            break
          default:
            className = ''
        }
        return className
      },
      musicPlayString() {
        let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
        let typeName = ''
        switch (playType) {
          case 1:
            typeName = '列表循环'
            break
          case 2:
            typeName = '单曲循环'
            break
          case 3:
            typeName = '随机播放'
            break
          default:
            typeName = ''
        }
        return typeName
      }
    },
    mounted() {
      store.dispatch({
        type: 'set_RefScrollMusicList',
        refs: this.$refs.musiclistContent
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/border-1px/index.styl"
  @import "../common/stylus/global.styl"
  .musiclist
    .content
      position: fixed
      height: 400px
      background: #fff
      bottom: 0
      left: 0
      right: 0
      border-top-left-radius: 10px
      border-top-right-radius: 10px
      z-index: 35
      &.sideUp-enter-to, &.sideUp-leave-to
        transition: transform 0.3s
      &.sideUp-enter, &.sideUp-leave-to
        transform: translate3d(0, 100%, 0)
      .title
        width: 100%
        position: relative
        height: 50px
        font-size: 0
        .play-type, .collect, .delete
          display: inline-block
          width: auto
          height: 100%
          line-height: 50px
          padding: 0 15px
          &:active
            background: $list_active
            border-top-left-radius: 10px
        .play-type
          height: 100%
          i
            color: #666
            font-size: 18px
            display: inline-block
            width: 18px
            height: 18px
            margin-right: 5px
            vertical-align: middle
          span
            color: #666
            vertical-align: middle
            font-size: 15px
            font-weight: 300
        .right
          float: right
          height: 100%
          line-height: 50px
          .collect, .delete
            font-size: 14px
            color: #666
            padding-right: 8px;
            border-top-right-radius: 10px
            i
              font-size: 20px
              vertical-align: middle
            span
              vertical-align: middle
              font-size: 14px
              font-weight: 300
        .border-1px
          border-1px($border_1px)
      .container
        height: calc(100% - 50px)
        margin: 0
        padding: 0
        overflow: scroll
        -webkit-overflow-scrolling: touch
        box-sizing: border-box
        .list
          margin: 0
          list-style: none
          height: 42px
          line-height: 42px
          padding: 0 15px
          font-weight: 400
          font-size: 14px
          color: #666
          overflow: hidden
          .playingicon
            font-size: 14px
            vertical-align: middle
            color: $primarycolor
          &:active
            background: $list_active
          .border-1px
            border-1px($border_1px)
    .mask
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      z-index: 34
      opacity: 1
      background: $maskBackground
      &.fade-enter-to, &.fade-leave-to
        transition: opacity 0.3s
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>
