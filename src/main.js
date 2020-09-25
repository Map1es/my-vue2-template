import Vue from 'vue'
import App from './App.vue'
import router from './router/common'
import store from './store/common'

import utils from './utils/utils'
import dict from './utils/dict'
import '@/assets/styles/normalize.css'

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$dict = dict

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
