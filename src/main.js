import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element-ui'
import * as filters from './filters'
import * as utils from '@/utils/index.js'
Vue.prototype.$utils = utils
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
