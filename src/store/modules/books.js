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
        setBooksData: (state, newState) => state.books = newState,
        // ADD_BOOK: (state, newBook) => state.books.push(newBook),
        // EDIT_BOOK: (state, editedBook) => state.books
        //     .map(book => {
        //         if(book.id === editedBook.id){
        //             if(book.title !== newBook.title){
        //                 book.title = newBook.title
        //             } else if(book.author !== newBook.author){
        //                 book.author = newBook.author
        //             }
        //             else if(book.category !== newBook.category){
        //                 book.category = newBook.category
        //             }
        //             else if(book.publisher !== newBook.publisher){
        //                 book.publisher = newBook.publisher
        //             }
        //             else if(book.edition !== newBook.edition){
        //                 book.edition = newBook.edition
        //             }
        //             else if(book.overview !== newBook.overview){
        //                 book.overview = newBook.overview
        //             }
        //             else if(book.language !== newBook.language){
        //                 book.language = newBook.language
        //             }
        //             else if(book.pages !== newBook.pages){
        //                 book.pages = newBook.pages
        //             }
        //         }
        //     }),
    },

    actions: {
        async getBooks(context) {
            await axios.get(resource_uri+'books')
                .then(res => context.commit('setBooksData', res.data))
                .catch(err => console.log(err))
        }
        // addLoan: {
        //     root: true,
        //     handler({ commit }, newBook) {
        //         setTimeout(() => {
        //             commit('ADD_BOOK', newBook)
        //         }, 1000)
        //     }
        // }
    }
    
}