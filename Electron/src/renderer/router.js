import Vue from 'vue'
import Router from 'vue-router'

import CountdownPage from './components/CountdownPage'
import AlertPage from './components/AlertPage'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'countdown',
    component: CountdownPage
  },
  {
    path: '/alert',
    name: 'alert',
    component: AlertPage
  }]
})
