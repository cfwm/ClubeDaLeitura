import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,
    state: {
        loans: '',
    },

    mutations: {
        setLoansData(state, newState){
            state.loans = newState},
    },

    getters: {
        getLoans: (state) => state.loans
    },

    actions: {
        async getLoans(context) {
            await axios.get(resource_uri+'loans')
                .then(res => {
                    context.commit('setLoansData', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // addLoan: {
        //     root: true,
        //     handler({ commit }, loan) {
        //         setTimeout(() => {
        //             commit('ADD_LOAN', loan)
        //         }, 1000)
        //     }
        // }
    }
}