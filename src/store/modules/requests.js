export default {
    namesoaced: true,
    state: {
        requests: [
            {  
                id:"1", 
                book:"Título do livro 06",
                userRequester:"maria",
                status:"1"
            },             
            { 
                id:"2", 
                book:"Título do livro 04",
                userRequester:"maria",
                status:"0"
            }, 
            {  
                id:"3", 
                book:"Título do livro 07",
                userRequester:"zezinho",
                status:"2"
            },  
            {
                id:"4", 
                book:"Título do livro 09",
                userRequester:"helena",
                status:"1"
            },  
            {   
                id:"5", 
                book:"Título do livro 05",
                userRequester:"zezinho",
                status:"0"
            },  
            {  
                id:"6", 
                book:"Título do livro 02",
                userRequester:"helena",
                status:"2"
            }
        ],
    }, 
    
    getters: {
        getRequests: (state) => state.requests
    },

    mutations: {
        GET_REQUESTS: (state, requests) => state.requests = requests,
    },
    
}