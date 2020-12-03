import axios from 'axios'

const resource_uri = 'http://localhost:3000/'


export default {
    namespaced: true,
    
    actions: {
        async setRequests(context) {
            await axios.get(resource_uri+'requests')
                .then(res => {
                    context.commit('SET_REQUESTS', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async saveRequest(context, request){
            await axios.post(resource_uri+'requests', request)
            .then(res => 
                    context.commit('SAVE_REQUEST', res.data))
                .catch(err => {console.log(err)})
        },

        async editRequest(context, request){
            await axios.patch(resource_uri+`requests/${request.id}`, request)
            .then(res => context.commit('EDIT_REQUEST', res.data))
                .catch(err => {console.log(err)})
        },
        

        async deleteRequest(context, deletedRequest) {
            await axios.delete(resource_uri+`requests/${deletedRequest.id}`)
                .then(res => context.commit('DELETE_REQUEST', res.data))
                    .catch(err => {console.log(err)})
        }
    },

    mutations: {
        SET_REQUESTS(state, newState){
            state.requests = newState
        },

        SAVE_REQUEST(state, newRequest){
            state.requests.push(newRequest)
        },

        EDIT_REQUEST(state, newRequest){
            state.requests.map(request => request.id === newRequest.id ?
                request = newRequest : request)
        },

        DELETE_REQUEST(state, deletedRequest){
            state.requests = state.requests
                .filter(request => request.id !== deletedRequest.id)
        }
    },

    state: {
        requests: '',
    },

    getters: {
        getRequests: (state) => state.requests,
    },

}