<template>
  <div class="sidebar">
    <transition name="fade" @touchmove.stop.prevent>
      <div class="menu-mask" v-show="isReallShow" @click="hideMenu"></div>
    </transition>
    <transition name="side">
      <div v-show="isReallShow" class="menu-content">
        <div class="menu-test" ref="MineWrapper">
          <div>
            <div class="menu-detail">
              <div class="menu-userInfo" :style="{ backgroundImage: 'url(' + info.bg + ')',backgroundSize: 'cover' }">
                <img class="avatar" :src="info.avatar" width="56" height="56">
                <div class="user-detail">
                  <span class="name">{{info.name}}</span>
                  <img class="isvip" src="../../static/img/vip.png" alt="">
                  <span class="progress">Lv.{{info.grade}}</span>
                </div>
                <span class="sign" @click="signClick"><i v-show="showIcon" class="icon-coin"></i>{{sign}}</span>
              </div>
            </div>
            <div class="content">
              <sidelist iconclass="icon-message" sidetitle="我的消息" disc=""></sidelist>
              <sidelist iconclass="icon-vip" sidetitle="我的会员" disc=""></sidelist>
              <sidelist iconclass="icon-market" sidetitle="商城"></sidelist>
              <sidelist iconclass="icon-works" sidetitle="游戏推荐:明日之后"></sidelist>
              <sidelist iconclass="icon-search" sidetitle="在线听歌免流量"></sidelist>
              <split background="#f0f0f0" height="5" border="#eee"></split>
              <sidelist iconclass="icon-friend" sidetitle="我的好友"></sidelist>
              <sidelist iconclass="icon-place" sidetitle="附近的人"></sidelist>
              <split background="#f0f0f0" height="5" border="#eee"></split>
              <sidelist iconclass="icon-theme" sidetitle="个性换肤" disc="官方红"></sidelist>
              <sidelist iconclass="icon-erji" sidetitle="听歌识曲"></sidelist>
              <sidelist iconclass="icon-set-time" sidetitle="定时停止播放"></sidelist>
              <sidelist iconclass="icon-fullscreen" sidetitle="扫一扫"></sidelist>
              <sidelist iconclass="icon-lock" sidetitle="音乐闹钟"></sidelist>
              <sidelist iconclass="icon-car" sidetitle="驾驶模式"></sidelist>
              <sidelist iconclass="icon-community" sidetitle="亲子频道"></sidelist>
              <sidelist iconclass="icon-fm" sidetitle="小冰电台"></sidelist>
              <sidelist iconclass="icon-cloud" sidetitle="音乐云盘"></sidelist>
              <sidelist iconclass="icon-rank-list" sidetitle="优惠券"></sidelist>
              <sidelist iconclass="icon-wangyi" sidetitle="加入网易音乐人"></sidelist>
            </div>
          </div>
        </div>
        <div class="footer" v-show="isReallShow">
          <p class="border-1px"></p>
          <div class="nightmode">
            <i class="icon-night"></i>
            <span>夜间模式</span>
          </div>
          <div class="setting">
            <i class="icon-setting"></i>
            <span>设置</span>
          </div>
          <div class="exit">
            <i class="icon-exit"></i>
            <span>退出</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import store from '../store'
  import BScroll from 'better-scroll'
  import split from '../widget/Split'
  import sidelist from '../widget/Sidelist'

  export default {
    props: {
      info: {
        type: Object
      }
    },
    data() {
      return {
        sign: '签到',
        showIcon: true,
        userInfo: ''
      }
    },
    methods: {
      _initScroller() {
        this.$nextTick(() => {
          if (this.MineWrapperScroll) {
            this.MineWrapperScroll.refresh()
          } else {
            this.MineWrapperScroll = new BScroll(this.$refs.MineWrapper, {
              // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
              click: true,
              bounce: false
            })
          }
        })
      },
      // 显示菜单
      hideMenu() {
        store.dispatch({
          type: 'hideSideBar'
        })
      },
      // 点击签到
      signClick() {
        this.sign = '已签到'
        this.showIcon = false
      }
    },
    computed: {
      // 显示
      isReallShow() {
        let show = store.state.sideBar.isShow
        if (show) {
          this._initScroller()
        }
        return show
      }
    },
    components: {
      split: split,
      sidelist: sidelist
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/border-1px/index.styl"
  @import "../common/stylus/global.styl"
  .sidebar
    .menu-mask
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      opacity: 1
      z-index: 35
      background: rgba(0, 0, 0, 0.5)
      transfrom: translateZ(0)
      &.fade-enter-to, &.fade-leave-to
        transition: opacity 0.5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
    .menu-content
      display: inline-block
      position: fixed
      width: 345px
      height: 100%
      top: 0
      left: 0
      z-index: 35
      background: #fff
      -webkit-overflow-scrolling: touch
      &.side-enter-to, &.side-leave-to
        transition: transform 0.5s
      &.side-enter, &.side-leave-to, &.fade-leave-tohidden
        transform: translate3d(-345px, 0, 0)
      .menu-test
        display: fixed
        width: 345px
        height: 100%
        top: 0
        left: 0
        z-index: 35
        background: #fff
        -webkit-overflow-scrolling: touch
        .menu-userInfo
          box-sizing: border-box
          width: 100%
          height: 150px
          position: relative
          padding: 50px 15px 15px 15px
          .avatar
            position: absolute
            bottom: 50px
            left: 15px
            border-radius: 50%
          .user-detail
            position: absolute
            bottom: 20px
            left: 15px
            font-size: 0
            .name
              display: inline-block
              font-size: 16px
              font-weight: 500
              color: #fff
              vertical-align: middle
              max-width: 130px
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden
            .isvip
              width: 14px
              height: 14px
              vertical-align: middle
              margin-left: 6px
            .progress
              font-size: 8px
              padding: 1px 4px
              border-radius: 8px
              color: #fff
              font-weight: 400
              border: 1px solid #fff
              margin-left: 6px
              vertical-align: middle
          .sign
            display: inline-block
            height: 22px
            line-height: 12px
            position: absolute
            bottom: 16px
            font-size: 12px
            right: 12px
            padding: 4px 8px
            border: 1px solid #e1e1e1
            border-radius: 12px
            color: #fff
            &:active
              background: $rgba_active
            i
              height: 14px
              margin-right: 5px
              vertical-align: top
        .content
          background: #fff
          display: block
          padding-bottom: 40px
    .footer
      position: absolute
      transfrom: translateZ(0)
      bottom: 0
      height: 46px
      width: 345px
      font-size: 0
      z-index: 35
      background: #fff
      &.side-enter-to, &.side-leave-to
        transition: opacity 2s
      &.side-enter, &.side-leave-to, &.fade-leave-tohiddeen
        transition: 0 2s
        transform: translate3d(-286px, 0, 0)
      .border-1px
        border-1px($border_1px)
      div
        position: relative
        display: inline-block
        font-size: 16px
        height: 100%
        text-align: center
        i
          position: absolute
          display: inline-block
          left: 15px
          top: 13px
          color: $icon_color
          font-weight: bold
          font-size: 16px
          vertical-align: top
        span
          position: absolute
          left: 39px
          top: 3px
          line-height: 40px
          font-size: 14px
          vertical-align: top
        &:active
          background: $list_active
        &.nightmode
          width: 40%
          line-height: 40px
        &.setting, &.exit
          width: 30%
          line-height: 40px
</style>
