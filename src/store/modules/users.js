import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,

    actions: {
        async setUsers(context) {
            await axios.get(resource_uri+'users')
                .then(res => {
                    context.commit('SET_USERS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        
        async saveUser(context, user){
            let 
                method,
                methodUrl

            if(user.id > 0){
                method = 'patch'
                methodUrl = `users/${user.id}`
            } else {
                method = 'post'
                methodUrl = 'users'
            }
            await axios[method](resource_uri+[methodUrl], user)
                .then(res => {
                    console.log('res actions saveUser', res.data)
                    context.commit('SAVE_USER')
                })
                    .catch(err => {
                        console.log(err)
                    })
        },
    },

    mutations: {
        SET_USERS(state, newState){
          state.users = newState
        },

        SAVE_USER(state, newUser){
            state.users.push(newUser)
        }
    },

    state: {
        users:'',
        userPassword:'',
    },

    getters: {
        getUsers: state => state.users,
        getUserPassword: state => state.userPassword,
        //getCurrentUser: state => state.users[0],
        getUserByUsername: (state) => (username) => {
            return state.users.find(user => user.username === username)
        }
    },
}