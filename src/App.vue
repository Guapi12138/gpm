<template>
  <div id="app">
    <!-- 播放所需要的标签 -->
    <audio id="myaudio" ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @playing="musicOnPlaying"
           @ended="musicEnded" @waiting="musicOnWaiting" @pause="musicOnPause" @loadstart="loadStart"></audio>
    <GpmHeader></GpmHeader>
    <div class="Menu">
      <router-link tag="div" class="Menu-item" to="/recom" exact>
        <span>推荐</span>
      </router-link>
      <router-link tag="div" class="Menu-item" to="/rating" exact>
        <span>我的音乐</span>
      </router-link>
      <router-link tag="div" class="Menu-item" to="/singer" exact>
        <span>电台</span>
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <MineView :info="info"></MineView>
    <BottomBar></BottomBar>
    <MusicList></MusicList>
    <MusicDetail></MusicDetail>
    <SongSheet></SongSheet>
  </div>
</template>

<script>
  import GpmHeader from './components/GpmHeader'
  import MenuView from './components/MenuView'
  import MineView from './components/MineView'
  import SearchView from './components/SearchView'
  import BottomBar from './components/BottomBar'
  import MusicList from './widget/MusicList'
  import MusicDetail from './components/MusicDetail'
  import SongSheet from './components/SongSheet'
  import Vue from 'vue'
  import axios from 'axios'
  import Vueaxios from 'vue-axios'
  import store from './store'

  Vue.use(Vueaxios, axios)
  let musicLrcIndex = 0
  export default {
    created() {
      this.$router.push('/')
      let LocalAPI = './static/data.json'
      axios.get(LocalAPI).then((res) => {
        // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
        this.info = res.data.user
        // 把所有的音乐数据给vuex的musicAllList
        store.dispatch('set_MusicAllList', res.data.music)
        // 所有的数据存起来  包括音乐个人信息 等等
        store.dispatch('set_AllInfo', res.data)
        // 设置音乐的地址  初始化 根据vuex的currentIndex来决定
        this.$refs.audio.setAttribute('src', store.getters.getCurrentMusic.url)
        // 给audio元素存在vuex 的state里面  方便日后调用
        store.dispatch('set_AudioElement', this.$refs.audio)
      }, (err) => {
        alert(err)
      })
    },
    data() {
      return {
        stop: false,
        info: {}
      }
    },
    methods: {
      // 音频播放结束事件
      musicEnded() {
        store.dispatch('play_Ended')
        // 歌词初始化
        musicLrcIndex = 0
        store.commit({
          type: 'setLyricIndex',
          index: 0
        })
      },
      // 音乐播放时间更新事件
      musicTimeUpdate() {
        store.dispatch({
          type: 'set_CurrentTime',
          time: Math.floor(this.$refs.audio.currentTime)
        })

        // 设置歌词内容(以索引的形式显示)
        let musicLrc = store.getters.getCurrentMusic.lyric
        let currentTime = Math.floor(this.$refs.audio.currentTime)
        if (musicLrc[musicLrcIndex] === undefined) return
        if (musicLrc.length === 0) {
          store.commit({
            type: 'setLyricIndex',
            index: -1
          })
          return
        }
        for (let i = 0; i < musicLrc.length; i++) {
          if (currentTime >= Number(musicLrc[musicLrcIndex].timeId)) {
            musicLrcIndex += 1
            // return
            break
          } else {
            if (musicLrcIndex <= 0) {
              musicLrcIndex = 0
            } else {
              musicLrcIndex--
            }
          }
        }
        store.commit({
          type: 'setLyricIndex',
          index: musicLrcIndex
        })
      },
      // 可以播放事件
      musicCanPlay() {
        store.dispatch({
          type: 'set_MusicDuration',
          duration: Math.floor(this.$refs.audio.duration)
        })
        store.commit({
          type: 'setMusicLoadStart',
          isloadstart: false
        })
      },
      // 音乐处于播放状态
      musicOnPlaying() {
        store.commit('play')
      },
      // 音乐处于watting状态
      musicOnWaiting() {
        // alert('音乐加载中')
      },
      // 音乐处于暂停状态
      musicOnPause() {
        store.commit('pause')
      },
      // 音乐加载
      loadStart() {
        store.commit({
          type: 'setMusicLoadStart',
          isloadstart: true
        })
      }
    },
    components: {
      GpmHeader,
      MenuView,
      MineView,
      SearchView,
      BottomBar,
      MusicList,
      MusicDetail,
      SongSheet
    }
  }
</script>

<style lang="scss">
  @import './common/scss/index.scss';
  @import "./common/scss/variable.scss";

  #app {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .Menu {
      display: flex;
      line-height: 46px;
      height: 46px;
      width: 100%;
      font-size: $font-size-medium;
      background: $color-theme;
      .Menu-item {
        flex: 1;
        text-align: center;
        color: $color-text-lm;
        span {
          padding-bottom: 3px;
        }
        &.router-link-active {
          span {
            font-weight: bold;
            color: $color-text-l;
            border-bottom: 2px solid $color-text-l
          }
        }
      }
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/border-1px/index.styl"
  @import "./common/stylus/global.styl"
  @import "../static/font-icon/style.css"
</style>
