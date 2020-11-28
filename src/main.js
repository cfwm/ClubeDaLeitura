import Vue from 'vue'
import App from '@/App'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/store/store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
