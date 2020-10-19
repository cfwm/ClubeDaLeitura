import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
        'mdi-bookshelf': 'mdi-bookshelf',
        'mdi:card-account-details': 'mdi:card-account-details'
    }
});