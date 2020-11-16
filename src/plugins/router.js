import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Books from '@/components/books/Books'
import BooksSearching from '@/components/reading-club/BooksSearching'
import ReadingClub from '@/components/reading-club/ReadingClub'
import Solicitations from '@/components/reading-club/Solicitations'
import User from '@/components/user/User'
import Login from '@/components/login/Login'

Vue.use(VueRouter)

//const Admin = () => import('@/components/admin/Admin.vue')
//const Books = () => import('@/components/books/Books')
//const BooksSearching = () => import('@/components/reading-club/BooksSearching.vue')
//const Home = () => import('@/components/home/Home')
//const Login = () => import('@/components/login/Login')
//const User = () => import('@/components/user/User')
//const ReadingClub = () => import('@/components/reading-club/ReadingClub')
//const Solicitations = () => import('@/components/reading-club/Solicitations')

const routes = [
    {
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        name: 'books',
        path: '/meus-livros',
        component: Books
    },
    {
        name: 'booksSearching',
        path: '/buscar-livros',
        component: BooksSearching
    },
    {
        name: 'readingClub',
        path: '/clube-da-leitura',
        component: ReadingClub
    },
    {
        name: 'solicitations',
        path: '/solicitacoes',
        component: Solicitations
    },
    {
        name: 'user',
        path: '/meus-dados',
        component: User
    },
    {
        name: 'login',
        path: '/',
        component: Login
    },
]

const router = new VueRouter({
    mode: 'history',  
    //para configurar o servidor com mode: history, ver: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    //https://router.vuejs.org/guide/essentials/history-mode.html
    routes
    // scrollBehavior(to, from, savedPosition) {
    //     if(savedPosition) {
    //         return savedPosition
    //     } else if(to.hash) {
    //         return  { selector: to.hash}
    //     } else {
    //         return { x: 0, y: 0}
    //     }
    // },
})

router.beforeEach((to, from, next) => {
    console.log('beforeEach antes das rotas - GLOBAL', to, from)
    next()
})

export default router

