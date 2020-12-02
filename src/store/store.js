import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import books from './modules/books'
import requests from './modules/requests'
import loans from './modules/loans'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users, 
        books,
        requests,
        loans
    }
})