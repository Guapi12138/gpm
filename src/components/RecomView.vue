<template>
  <div class="reconmmends" v-show="reconmended || reconmmend.findmusic" ref="musicWrapper">
    <div>
      <div v-if="!loading">
        <div class="red"></div>
        <app-banner :listImg="listImg"></app-banner>
        <div class="radio-station">
          <div class="radio-station-item">
            <p><img src='../../static/img/shortcut_fm.png' class="radio-img"/></p>
            <p>私人FM</p>
          </div>
          <div class="radio-station-item">
            <p><img src='../../static/img/t_dragonball_icn_daily.png' class="radio-img"/></p>
            <p>每日推荐</p>
          </div>
          <div class="radio-station-item">
            <p><img src='../../static/img/shortcut_identify.png' class="radio-img"/></p>
            <p>歌单</p>
          </div>
          <div class="radio-station-item">
            <p><img src='../../static/img/t_dragonball_icn_rank.png' class="radio-img last"/></p>
            <p>排行榜</p>
          </div>
        </div>
        <findsheettitle></findsheettitle>
        <div class="recommend-list">
          <findsheetlist v-show="reconmended" v-for="sheet in reconmended.findmusic.reconmmend.recommendMinSheets"
                         :key="sheet.id"
                         :imagesrc="sheet.info[0].img_url" :showtoprighttips="sheet.showtoptips"
                         :listpadding="sheet.padding" :toprighticonclass="sheet.toptipsclass"
                         :toprighttitle="sheet.listencount" :showbottomtips="sheet.showbottomtips"
                         :bottomtips="sheet.bottomtips" :showbottomtitle="sheet.showbottomtitle"
                         :bottomtitle="sheet.bottomtitle" :listwidth="sheet.listwidth"
                         @click.stop="showSongSheet(list)"></findsheetlist>
        </div>
        <findsheettitletwo></findsheettitletwo>
        <div class="recommend-list">
          <findsheetlist v-show="reconmended" v-for="sheet in reconmended.findmusic.reconmmend.recommendNewSheets"
                         :key="sheet.id"
                         :imagesrc="sheet.info[0].img_url" :showtoprighttips="sheet.showtoptips"
                         :listpadding="sheet.padding" :toprighticonclass="sheet.toptipsclass"
                         :toprighttitle="sheet.listencount" :showbottomtips="sheet.showbottomtips"
                         :bottomtips="sheet.bottomtips" :showbottomtitle="sheet.showbottomtitle"
                         :bottomtitle="sheet.bottomtitle" :listwidth="sheet.listwidth"
                         @click.stop="showSongSheet(list)"></findsheetlist>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from '../widget/Banner'
  import store from '../store'
  import BScroll from 'better-scroll'
  import findsheetlist from '../components/findsheetlist/findsheetlist'
  import findsheettitle from '../components/findsheettitle/findsheettitle'
  import findsheettitletwo from '../components/findsheettitle/findsheettitletwo'
  import a from '../../static/img/banner1.jpg'
  import b from '../../static/img/banner2.jpg'
  import c from '../../static/img/banner4.jpg'
  import d from '../../static/img/banner3.jpg'

  export default {
    data() {
      return {
        reconm: [],
        listImg: [{
          url: a
        }, {
          url: b
        }, {
          url: c
        }, {
          url: d
        }],
        imgIndex: 0,
        imgSrc: ''
      }
    },
    props: {
      bounce: {
        type: Boolean,
        default: true
      }
    },
    created() {
      this.fetchData()
      this.axios('/api/reconm')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.reconm = res.data
            // 等待数据请求完毕后并组件子组件全部加载渲染完毕之后,使用better-scroll实现滑动
            this.$nextTick(() => {
              this._initScroller()
            })
          }
        })
    },
    computed: {
      reconmended() {
        return store.getters.getAllInfo
      }
    },
    methods: {
      _initScroller() {
        this.musicWrapperScroll = new BScroll(this.$refs.musicWrapper, {
          // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
          click: true,
          bounce: false
        })
      },
      fetchData() {
        this.loading = true
        let that = this
        this.axios('/api/reconm')
          .then(function (res) {
            that.loading = false
          }, function (error) {
            console.log(error)
          })
          this.loading = true
      },
      showSongSheet(data) {
        store.dispatch({
          type: 'set_MusicSheetList',
          data: data
        })
        store.commit({
          type: 'setIsShowSongSheet',
          isShow: true
        })
      }
    },
    components: {
      'app-banner': Banner,
      findsheetlist,
      findsheettitle,
      findsheettitletwo
    }
  }
</script>
<style scoped>
  .reconmmends {
    position: fixed;
    top: 85px;
    left: 0;
    width: 100%;
    height: 80%;
    overflow: hidden;
  }
  .red {
    position: absolute;
    right: 0;
    top: -250px;
    width: 100%;
    height: 350px;
    background: #d44439;
    z-index: 1;
  }

  .radio-img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    background: #d33a31;
    margin-bottom: 5px;
  }

  .show-carousel li {
    list-style: none;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #fff;
    margin: 0 8px;
  }

  .radio-station {
    width: 100%;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid 1px #e5e8e8;
  }

  .radio-station-item {
    overflow: hidden;
  }

  .radio-station-item p {
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

  .radio-img {
    width: 53px;
    height: 53px;
  }

  footer {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(16, 1, 1, 0.7);
    opacity: 0.7;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .recommend-list {
    font-size: 0;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/global.styl"
  .findsheetlist
    display: inline-block
    width: 100%
    box-sizing: border-box
    height: auto
    position: relative
    vertical-align: top
    .content
      width: 100%
      height: auto
      position: relative
      .image
        width: 100%
        height: 0;
        padding-top: 100%
      .toprighttips
        height: 18px
        line-height: 18px
        display: block
        position: absolute
        top: 0
        left: 0
        right: 0
        color: #fff
        font-size: 12px
        font-weight: 400
        text-align: right
        padding: 0 4px
        .icon
          margin-right: 3px
      .bottomtips
        font-size: 12px
        font-weight: 400
        padding: 0 6px
        color: #fff
        height: 22px
        line-height: 22px
        position: absolute
        bottom: 0
        left: 0
        right: 0
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        background-image: -webkit-linear-gradient(to top, rgba(22, 22, 22, 0.2), rgba(255, 255, 255, 0));
        background-image: linear-gradient(to top, rgba(22, 22, 22, 0.2), rgba(255, 255, 255, 0));
    .title
      width: 100%
      height: 34px
      line-height: 17px
      margin: 4px 0
      padding: 0 3px
      box-sizing: border-box
      overflow: hidden
      color: #333
      font-weight: 400
      text-overflow: ellipsis
      font-size: 12px
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
</style>
