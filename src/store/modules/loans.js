export default {
    namespaced: true,
    state: {
        loans: [
            {
                id: "1",
                request_id: "1",
                dateBorrow: "aaaammdd-hhmm",
                dateDevolution:"aaaammdd-hhmm"
            },            
            {
                id: "2",
                request_id: "2",
                dateBorrow: "aaaammdd-hhmm",
                dateDevolution:"aaaammdd-hhmm"
            },            
            {
                id: "3",
                request_id: "3",
                dateBorrow: "aaaammdd-hhmm",
                dateDevolution:"aaaammdd-hhmm"
            },  
            {   id: "4",
                request_id: "4",
                dateBorrow: "aaaammdd-hhmm",
                dateDevolution:"aaaammdd-hhmm"
            },     
            {   id: "5",
                request_id: "5",
                dateBorrow: "aaaammdd-hhmm",
                dateDevolution:"aaaammdd-hhmm"
            },            
            {
                id: "6",
                request_id: "6",
                dateBorrow: "aaaammdd-hhmm",
                dateDevolution:"aaaammdd-hhmm"
            }
      ]
    },

    getters: {
        getLoans: (state) => state.loans
    },

    mutations: {
        GET_LOANS: (state, loans) => state.loans = loans,
        ADD_LOAN: (state, loan) => state.loans.push(loan) 
    },

    actions: {
        addLoan: {
            root: true,
            handler({ commit }, loan) {
                setTimeout(() => {
                    commit('ADD_LOAN', loan)
                }, 1000)
            }
        }
    }
}