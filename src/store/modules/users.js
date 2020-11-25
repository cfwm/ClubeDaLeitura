export default {
    state: {
        users: [],
    },

    getters: {
        getCurrentUser: 
            (state) => state.users.filter(user => user.username === 'maria')
    },

    mutations: {
        GET_USERS(state, users) {
            state.users = users
        }
    },

    actions: {
        // async getUsers() {
        //     try {
        //     this.users = []
        //     await this.$http.get('users')
        //         .then(res => { this.users = res.data })
        //     } catch(fail) {
        //     console.error(fail)
        //     }
        // },
        async getUsers({commit}) {
            await this.$http.get('users')
                .then(res => { commit('GET_USERS',  res.data) })
        }
    },
    
}