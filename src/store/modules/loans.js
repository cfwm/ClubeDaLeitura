import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,
    
    actions: {
        async getLoans(context) {
            await axios.get(resource_uri+'loans')
                .then(res => {
                    context.commit('GET_LOANS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },

    mutations: {
        GET_LOANS(state, newState){
            state.loans = newState},
    },

    state: {
        loans: '',
    },

    getters: {
        getLoans: (state) => state.loans
    },
    
}


// addLoan: {
        //     root: true,
        //     handler({ commit }, loan) {
        //         setTimeout(() => {
        //             commit('ADD_LOAN', loan)
        //         }, 1000)
        //     }
        // }