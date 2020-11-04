import Vue from 'vue'
import App from '@/App'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import '@/plugins/axios'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
