<template>
  <div>
    <div class="mymusic" ref="mymusic">
      <div>
        <div class="bg"></div>
        <div class="border-1px"></div>
        <type-list name="本地音乐" iconinfo="icon-music" count="70" :playing="true"></type-list>
        <type-list name="最近播放" iconinfo="icon-zuijinplay" count="104"></type-list>
        <type-list name="下载管理" iconinfo="icon-download" count="83"></type-list>
        <type-list name="我的电台" iconinfo="icon-diantai" count="7"></type-list>
        <type-list name="我的收藏" iconinfo="icon-collect" count="专辑/歌手/视频/专栏"></type-list>
        <type-list name="Sati空间" iconinfo="icon-night" count="3"></type-list>
        <music-sheet v-for="(item, index) in items" :item="item" :index="index" :key="item.id"></music-sheet>
        <div class="border-1px"></div>
      </div>
      <!-- 底部显示的菜单列表 -->
      <menu-list></menu-list>
    </div>
</div>

</template>
<script>
  import MusicSheet from '../widget/musicsheet.vue'
  import TypeList from '../widget/typelist.vue'
  import MenuList from '../widget/menulist.vue'
  import BScroll from 'better-scroll'
  import Split from '../widget/Split'

  export default {
    created() {
      this.$nextTick(() => {
        this._initScroller()
      })
    },
    props: {
      eventPassthrough: {
        type: String,
        default: ''
      },
      bounce: {
        type: Boolean,
        default: true
      }
    },
  computed: {
    items() {
      return this.$store.getters.getMusicAllList.sheets
    }
  },
  methods: {
    _initScroller() {
      this.mymusicScroll = new BScroll(this.$refs.mymusic, {
        // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
        click: true,
        bounce: false
      })
    }
  },
  components: {
    TypeList,
      MusicSheet,
      MenuList,
      Split
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/global.styl"
  @import "../../static/font-icon/style.css"
  @import "../common/stylus/border-1px/index.styl"
  .mymusic
    position: fixed
    background: #fff
    bottom: 60px
    left: 0
    right: 0
    top: 85px;
    width: 100%;
    height: 80%;
    overflow: hidden
    z-index: 9
    -webkit-overflow-scrolling: touch
    .border-1px
      border-1px($border_1px)
    .bg
      position: fixed
      bottom: 60px
      left: 0
      right: 0
      top: 330px;
      width: 100%
      height: 500px
      z-index: 0
      background-color: #f7f7f7
</style>
