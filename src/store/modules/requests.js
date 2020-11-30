import axios from 'axios'

const resource_uri = 'http://localhost:3000/'


export default {
    namespaced: true,
    
    actions: {
        async getRequests(context) {
            await axios.get(resource_uri+'requests')
                .then(res => {
                    context.commit('setRequestsData', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },

    mutations: {
        setRequestsData(state, newState){
            state.requests = newState},
    },

    state: {
        requests: '',
    },

    getters: {
        getRequests: (state) => state.requests,
    },

}