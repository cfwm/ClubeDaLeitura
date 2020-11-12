import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: { // more icons: https://iconify.design/icon-sets/mdi/
        iconfont: 'mdi',
        'mdi-bookshelf': 'mdi-bookshelf',
        'mdi-card-account-details': 'mdi-card-account-details',
        'mdi-state-machine': 'mdi-state-machine'
    }
});