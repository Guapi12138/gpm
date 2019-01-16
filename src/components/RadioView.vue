<template>
  <div class="Recommend">
    <div class="red"></div>
    <div>
      <app-banner :listImg="listImg"></app-banner>
    </div>
    <div class="radio-station">
      <div class="radio-station-item">
        <p><img src='../../static/img/t_dragonball_icn_radio_calss.png' class="radio-img"/></p>
        <p>电台分类</p>
      </div>
      <div class="radio-station-item" >
        <p><img src='../../static/img/t_dragonball_icn_radio_rank.png' class="radio-img"/></p>
        <p>电台排行</p>
      </div>
      <div class="radio-station-item">
        <p><img src='../../static/img/t_dragonball_icn_radio_boutique.png' class="radio-img"/></p>
        <p>DI电音</p>
      </div>
      <div class="radio-station-item">
        <p><img src='../../static/img/t_dragonball_icn_xiaoice.png' class="radio-img last"/></p>
        <p>小冰电台</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from '../widget/Banner'
  import a from '../../static/img/banner5.jpg'
  import b from '../../static/img/banner6.jpg'
  import c from '../../static/img/banner7.jpg'
  import d from '../../static/img/banner8.jpg'

  export default {
    created() {
    },
    data() {
      return {
        listImg: [{
          url: a
        }, {
          url: b
        }, {
          url: c
        }, {
          url: d
        }]
      }
    },
    destroyed: function () {
      clearInterval(this.timer)
    },
    components: {
      'app-banner': Banner
    }
  }
</script>
<style scoped>
  .red {
    position: absolute;
    right: 0;
    top: 80px;
    width: 100%;
    height: 110px;
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
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(16, 1, 1, 0.7);
    opacity: 0.7;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
