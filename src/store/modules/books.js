import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,
    
    actions: {
        async getBooks(context) {
            await axios.get(resource_uri+'books')
                .then(res => {
                    console.log('res actions getBooks', res)
                    context.commit('GET_BOOKS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async saveBook(context, payload){
            await axios.post(resource_uri+'books', payload)
            .then(res => {
                console.log('res actions saveBook', res.data)
                context.commit('GET_BOOKS')
            })
            .catch(err => {
                console.log(err)
            })
        },

    },
    
    mutations: {
        GET_BOOKS(state, newState){
            state.books = newState
        },

        // SAVE_BOOK(state, newBook){
        //     state.books.push(newBook)
        // },
    },
    
    state: {
        books: '',
    },

    getters: {
        getBooks: (state) => state.books,
        getBookById: (state) => (id) => {
            return state.books.find(book => book.id === id)
        }
        
    },    
}