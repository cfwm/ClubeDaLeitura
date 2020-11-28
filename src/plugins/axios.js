import Vue from 'vue'
import axios from "axios"

Vue.use({
    install() { //install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'http://localhost:3000/'
        })
    }
})

// import axios from 'axios';

// export const HTTP = axios.create({
//   baseURL: 'http://localhost:3000/',
//   withCredentials: true,
//   headers: {
//     Authorization: 'Bearer {token}',
//     'Content-Type': 'application/json'
//   }
// });


// import axios from 'axios'

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.Authentication = localStorage.token
//     return config
//   },

//   (error) => {
//     return Promise.reject(error)
//   }
// )

// export default axios