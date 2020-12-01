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

        async saveBook(context, book){
            let 
                method,
                methodUrl

            if(book.id < 1){
                //book.ownerId = rootGetters.getCurrentUser.id -> tentar fazer com storage
                //book.ownerId = context.getters ? have to set global getters?
                method = 'post'
                methodUrl = 'books'
                console.log('ID ****saveBook**** id < 1', book.id)
            } else {
                method = 'patch'
                methodUrl = `books/${book.id}`
                console.log('red saveBook id >= 1', book)
            }
            await axios[method](resource_uri+[methodUrl], book)
                .then(res => {
                    console.log('res actions saveBook', res.data)
                    context.commit('SAVE_BOOK')
                })
                    .catch(err => {
                        console.log(err)
                    })
        },

        async deleteBook(context, bookId) {
            //TODO: não está funcionando
            await axios.delete(resource_uri+'books/'+bookId)
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
        getBookId: (state) => {
            return state.books.length+1
        }
    },    
}