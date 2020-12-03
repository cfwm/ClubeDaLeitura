import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,
    
    actions: {
        async setLoans(context) {
            await axios.get(resource_uri+'loans')
                .then(res => {
                    context.commit('SET_LOANS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async saveLoan(context, loan){
            await axios.post(resource_uri+'loans', loan)
            .then(res => 
                    context.commit('SAVE_LOAN', res.data))
                .catch(err => {console.log(err)})
        },

        async editLoan(context, loan){
            await axios.patch(resource_uri+`loans/${loan.id}`, loan)
            .then(res => context.commit('EDIT_LOAN', res.data))
                .catch(err => {console.log(err)})
        },
        

        async deleteLoan(context, deletedLoan) {
            await axios.delete(resource_uri+`loans/${deletedLoan.id}`)
                .then(res => context.commit('DELETE_LOAN', res.data))
                    .catch(err => {console.log(err)})
        }
    },

    mutations: {
        SET_LOANS(state, newState){
            state.loans = newState
        },

        SAVE_LOAN(state, newLoan){
            state.loans.push(newLoan)
        },

        EDIT_LOAN(state, newLoan){
            state.loans.map(loan => loan.id === newLoan.id ?
                loan = newLoan : loan)
        },

        DELETE_LOAN(state, deletedLoan){
            state.loans = state.loans
                .filter(loan => loan.id !== deletedLoan.id)
        }
    },

    state: {
        loans: '',
    },

    getters: {
        getLoans: (state) => state.loans
    },
    
}