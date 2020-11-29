import Vue from 'vue'
import Vuex from 'vuex'
//import axios from "axios"

import users from './modules/users'
import books from './modules/books'
import requests from './modules/requests'
import loans from './modules/loans'

Vue.use(Vuex)
// Vue.use({
//     install() { //install(Vue) {
//         Vue.prototype.$http = axios.create({
//             baseURL: 'http://localhost:3000/'
//         })
//     }
// })


export default new Vuex.Store({
    modules: {
        users, 
        books,
        requests,
        loans
    }
})