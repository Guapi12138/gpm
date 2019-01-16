// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import vuex from 'vuex'
import router from './router/index'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(MuseUI)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
})
Vue.use(VueAxios, axios)
Vue.use(vuex)
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
router.push('/')
