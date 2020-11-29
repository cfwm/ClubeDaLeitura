import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,
    state: {
        books: '',
    },

    getters: {
        getBooks: (state) => state.books,
    },

    
    mutations: {
        setBooksData(state, newState){
            state.books = newState
        },

        addBook(state, newBook){
            state.books.push(newBook)
        },
    },

    

    actions: {
        async getBooks(context) {
            await axios.get(resource_uri+'books')
                .then(res => {
                    context.commit('setBooksData', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async addBook(context){
            await axios.post(resource_uri+'books')
                .then(res => {
                    context.commit('addBook', res.data)
                    console.log('addBook',res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // async saveBook(context){
        //     await axios[metodo](resource_uri)
        // }

    }
    
}