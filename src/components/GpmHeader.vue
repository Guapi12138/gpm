<template>
  <div class="Gheader">
    <h1 class="text">网易云音乐</h1>
    <router-link to="" class="mine" tag="div">
      <i class="iconfont icon-menu" @click="showMenu"></i>
    </router-link>
  <!--    <router-link to="/recom" @click="hideMenu" tag="div"></router-link> -->
    <router-link to="/" class="search" tag="div">
      <i class="iconfont icon-search" v-show="showSheet"></i>
    </router-link>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    created() {
    },
    data() {
      return {
        showSheet: true
      }
    },
    methods: {
      showMenu() {
        store.dispatch({
          type: 'showSideBar'
        })
      },
      hideMenu() {
        store.dispatch({
          type: 'hideSideBar'
        })
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../common/scss/variable.scss"
  .Gheader
    position: relative
    height: 40px
    width: 100%
    text-align: center
    background: $color-theme
    .text
      line-height: 40px
      font-weight: bold
      color: $color-text-l
      letter-spacing: 3px
    .mine
      position: absolute
      top: -1.5px
      left: 0
      .iconfont
        display: block
        padding: 11px
        font-size: 22px
        color: $color-theme-l
    .search
      position: absolute
      top: 0
      right: 2px
      .iconfont
        display: block
        padding: 12px
        font-size: 18px
        color: $color-theme-l
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/global.styl"
  @import "../../static/font-icon/style.css"
  @import "../common/stylus/border-1px/index.styl"
</style>
