import axios from 'axios'

const resource_uri = 'http://localhost:3000/'

export default {
    namespaced: true,
    state: {
        // users: [
        //     {
        //       completeName: "Maria Silva",
        //       username: "maria",
        //       cpf: "15987452054",
        //       email: "maria.silva@email.com",
        //       phone: "48985235148",
        //       password: "asdasdasd12@"
        //     },
        //     {completeName: "José Oliveira",
        //       username: "zezinho",
        //       cpf: "89625157059",
        //       email: "jose.oliveira@email.com",
        //       phone: "19980236541",
        //       password: "dsasdasd133@"
        //     },
        //     { completeName: "Helena Arruda",
        //       username: "helena",
        //       cpf: "32159874320",
        //       email: "helena.arruda@email.com",
        //       phone: "54903652187",
        //       password: "opmkj4@$"
        //     },
        //     { completeName: "Bartolomeu Margarida",
        //       username: "bart",
        //       cpf: "78102548951",
        //       email: "bart.marg@email.com",
        //       phone: "1196200657415",
        //       password: "unun23&&"
        //     },
        //   ],
        users:'',
    },

    mutations: {
        setUserData(state, newState){
          state.users = newState},
    },

    getters: {
        getUsers: state => state.users
    },

    actions: {
        async getUsers(context) {
            await axios.get(resource_uri+'users')
                .then(res => {
                    context.commit('setUserData', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // editUser: {
        //     root: true,
        //     handler({ commit }, currentUser) {
        //         setTimeout(() => {
        //             commit('EDIT_CURRENT_USER', currentUser)
        //         }, 1000)
        //     }
        // }
    

        //  async getAllRooms(context){
            
        //     await axios.get(process.env.VUE_APP_PROD_URL + '/room')
            
        //     .then(resp => {

        //         context.commit('setAllRooms', resp.data)
            
        //     })

        //     .catch(err =>{
                  
        //         console.log(err);
        //         alert("erro ao carregar quartos" + err)
         
        //     })
        // },


        
    }
   

        //mutations: {
        //EDIT_CURRENT_USER
        
        //EDIT_CURRENT_USER: (state, currentUser) => state.currentUser = currentUser,
        //CURRENT_USER: (state) => state.users.filter(user => user.username === 'maria'),
        // ADD_USER: (state, user) => state.users.unshift(user),
        // UPDATE_USER: (state)
   // },
  

    // actions: {
        // getUsers({commit}) {
        //     const res = this.$http.get('users')
        //     commit('GET_USERS', res.data)
        // },

        // async addUser({commit}, user) {
        //     const res = await axios.post(resource_uri, user)
        //     commit('ADD_USER', res.data)
        // },

        // async getUsers({commit}) {
        //     const res = await axios.get(resource_uri)
        //     commit('GET_USERS', res.data)
        // },

        // async getUsers({commit}) {
        //     const res = await axios.get(resource_uri)
        //     commit('GET_USERS', res.data)
        // },


        // getUsers({commit}) {
        //     const res = this.$http.get('users') 
        //         commit('GET_USERS',  res.data).then(console.log(res.data))
        //         .then(console.log('res.data USERS',res.data))
        // },

        // getUsers({commit}) {
        //     axios
        //         .get(resource_uri)
        //         .then(data => {
        //             console.log(data.data)
        //             let users = data.data
        //             commit('GET_USERS', users)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // },


        
        // async addUser({commit}, user) {
        //     const res = await this.$http.post('users', user)
        //         commit('GET_USERS',  res.data).then(console.log(res.data))
        // },

        // async getUsers({commit}) {
        //     const res = await this.$http.get('users')
        //         commit('GET_USERS',  res.data).then(console.log(res.data))
        // },

        // async getUsers({commit}) {
        //     const res = await this.$http.get('users')
        //         commit('GET_USERS',  res.data).then(console.log(res.data))
        // },


     
        // async getUsers({commit}) {
        //     await this.$http.get('users')
        //         .then(res => { commit('GET_USERS',  res.data) })
        // } 
        
        //.then(res => { 

        // async getUsers({commit}) {
        //     const res = await this.$http.get('users')
        //         commit('GET_USERS',  res.data).then(console.log(res.data))
        // },

        // async getBooks({commit}) {
        //     const res = await this.$http.get('books')
        //         commit('GET_BOOKS',  res.data).then(console.log(res.data))
        // }
    // },
    
}


  