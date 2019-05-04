import Vue from 'vue'
import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  data: {
    state: {}
  },
  render: h => h(App)
}).$mount('#app')
