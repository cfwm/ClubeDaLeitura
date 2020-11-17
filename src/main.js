import Vue from 'vue'
import App from '@/App'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/store/store'
import '@/plugins/axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
