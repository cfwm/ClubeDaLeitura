import Vue from 'vue'
import Router from 'vue-router'

import Sobre from '@/components/system/About'
import Log from '@/components/system/Log'
import Books from '@/components/books/Books'
import User from '@/components/user/User'
import ReadingClub from '@/components/reading-club/ReadingClub'

// import AppBar from '@/components/template/AppBar'
// import Content from '@/components/template/Content'
// import Footer from '@/components/template/Footer'
// import Header from '@/components/template/Header'
// import Menu from '@/components/template/Menu'

Vue.use(Router)

const router = new Router({
    mode: 'history',  //para o servidor, ver: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    //https://router.vuejs.org/guide/essentials/history-mode.html
    
    routes: [
        {
            name: 'log',
            path: '/',
            components: {
                default: Log,
                //register: Register
            }
        },
        {
            name: 'sobre',
            path: '/sobre',
            components: {
                default: Sobre,
                // appBar: AppBar,
                // content: Content,
                // footer: Footer,
                // header: Header,
                // menu: Menu
            }
        },
        {
            name: 'livros',
            path: '/livros',
            components: {
                default: Books,
                // appBar: AppBar,
                // content: Content,
                // footer: Footer,
                // header: Header,
                // menu: Menu
            }
        },
        {
            name: 'usuario',
            path: '/usuario',
            components: {
                default: User,
                // appBar: AppBar,
                // content: Content,
                // footer: Footer,
                // header: Header,
                // menu: Menu
            }
        },
        {
            name: 'clube-da-leitura',
            path: '/clube-da-leitura',
            components: {
                default: ReadingClub,
                // appBar: AppBar,
                // content: Content,
                // footer: Footer,
                // header: Header,
                // menu: Menu
            }
        },
    ]
})

export default router

