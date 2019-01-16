import Vue from 'vue'
import Router from 'vue-router'
import MineView from '../components/MineView'
import RecomView from '../components/RecomView'
import SingerView from '../components/RadioView'
import RatingView from '../components/RatingView'
import SearchView from '../components/SearchView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recom'
    },
    {
      path: '/mine',
      component: MineView
    },
    {
      path: '/search',
      component: SearchView
    },
    {
      path: '/recom',
      component: RecomView
    },
    {
      path: '/singer',
      component: SingerView
    },
    {
      path: '/rating',
      component: RatingView
    }
  ]
})
