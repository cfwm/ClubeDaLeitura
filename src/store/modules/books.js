import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,

    actions: {
        async setBooks(context) {
            await axios.get(resource_uri+'books')
                .then(res => {
                    context.commit('SET_BOOKS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async saveBook(context, book){
            await axios.post(resource_uri+'books', book)
            .then(res => 
                    context.commit('SAVE_BOOK', res.data))
                .catch(err => {console.log(err)})
        },

        async editBook(context, book){
            await axios.patch(resource_uri+`books/${book.id}`, book)
            .then(res => context.commit('EDIT_BOOK', res.data))
                .catch(err => {console.log(err)})
        },
        

        async deleteBook(context, deletedBook) {
            await axios.delete(resource_uri+`books/${deletedBook.id}`)
                .then(res => context.commit('DELETE_BOOK', res.data))
                    .catch(err => {console.log(err)})
        }
    },

    mutations: {
        SET_BOOKS(state, newState){
            state.books = newState
        },

        SAVE_BOOK(state, newBook){
            state.books.push(newBook)
        },

        EDIT_BOOK(state, newBook){
            state.books.map(book => book.id === newBook.id ?
                book = newBook : book)
        },

        DELETE_BOOK(state, deletedBook){
            state.books = state.books
                .filter(book => book.id !== deletedBook.id)
        }
        // DELETE_BOOK(state, deletedBook){
        //     state.books.map(book => book.id !== deletedBook.id ?
        //         book : null)
        // }
    },
    
    // state: () => ({
    //     books: '',
    // }),
    state: {
        books: '',
    },

    getters: {
        getBooks: (state) => state.books,
        getBookById: (state) => (id) => {
            return state.books.find(book => book.id === id)
        },
    },

}