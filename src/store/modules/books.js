import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,

    actions: {
        async getBooks(context) {
            await axios.get(resource_uri+'books')
                .then(res => {
                    context.commit('GET_BOOKS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async saveBook(context, book){
            let 
                method,
                methodUrl

            if(book.id > 0){
                method = 'patch'
                methodUrl = `books/${book.id}`
            } else {
                method = 'post'
                methodUrl = 'books'
            }
            await axios[method](resource_uri+[methodUrl], book)
                .then(context.commit('SAVE_BOOK'))
                    .catch(err => {
                        console.log(err)
                    })
                    console.log(book)
                },
        

        async deleteBook(context, bookId) {
            await axios.delete(resource_uri+`books/${bookId}`)
                .then(res => {
                    console.log('res actions deleteBook', res.data)
                    context.commit('DELETE_BOOK', bookId)
                })
                    .catch(err => {
                        console.log(err)
                    })
        }
    },

    mutations: {
        GET_BOOKS(state, newState){
            state.books = newState
        },

        SET_ID_BOOKS(state, newState){
            state.id_books = newState
        },

        SAVE_BOOK(state, newBook){
            state.books.push(newBook)
        },

        DELETE_BOOK(state, bookId){
            state.books = state.books
                .filter(book => book.id !== bookId)
        }
    },
    
    state: () => ({
        books: '',
    }),

    getters: {
        getBooks: (state) => state.books,
        getBookById: (state) => (id) => {
            return state.books.find(book => book.id === id)
        },
    },

}