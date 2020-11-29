<template>
    <v-container 
        class="d-flex flex-column"
        ><v-card 
            elevation="15" 
            width="250%"
            ><v-card-title 
                class="d-flex justify-center"
                ><p>Solicitações do Clube da Leitura</p>
            </v-card-title>
            <!-- <v-icon
                small
                @click="dialog = false"
            >
                mdi-delete
            </v-icon>
            <v-icon
                small
                @click="dialog = false"
            >
                mdi-pencil
            </v-icon> -->
            <v-row>
                <v-col>
                    <v-row 
                        class="d-flex justify-center" 
                        no-gutters
                        ><v-col
                            height="100%" 
                            width="100%"
                            class="d-flex justify-end mb-3"
                            ><v-btn
                                height="150%" 
                                width="30%"
                                @click="setIsRequester(true)"
                                :color="isRequester === true ? 'green' : 'null'"
                                :style="isRequester === true ? 'color:white;' : 'color:black;'"
                            >Feitas</v-btn>
                        </v-col>
                        <v-col
                            height="100%" 
                            width="100%"
                            class="d-flex justify-start mb-3"
                        >
                            <v-btn
                               height="150%" 
                                width="30%"
                                @click="setIsRequester(false)"
                                :color="isRequester === false ? 'green' : 'null'"
                                :style="isRequester === false ? 'color:white;' : 'color:black;'" 
                            >Recebidas</v-btn>
                        </v-col>
                    </v-row>

                    <v-row
                        no-gutters 
                        ><v-col
                            class="d-flex justify-center align-center"
                            
                            ><v-btn 
                                    height="100%" 
                                    width="20%"
                                    class="d-flex justify-center"
                                    @click="setStatus('0')"
                                    :color="status === '0' ? 'purple' : 'null'"
                                    :style="status === '0' ? 'color:white;' : 'color:black;'"
                                >Aguardando</v-btn
                            ><v-btn 
                                    height="100%" 
                                    width="20%"
                                    class="d-flex justify-center"
                                    @click="setStatus('1')"
                                    :color="status === '1' ? 'purple' : 'null'"
                                    :style="status === '1' ? 'color:white;' : 'color:black;'"
                                >{{requests.length === 0 ? 'Aceita' : 'Aceitas'}}</v-btn
                            ><v-btn
                                    height="100%" 
                                    width="20%" 
                                    class="d-flex justify-center"
                                    @click="setStatus('2')"
                                    :color="status === '2' ? 'purple' : 'null'"
                                    :style="status === '2' ? 'color:white;' : 'color:black;'"
                                >{{ requests.length === 0 ? 'Concluída' : 'Concluídas' }}</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-data-table
                :headers="headers"
                :items="displeyedRequest"
                sort-by="userRequester"
            >
             <template v-slot:item.actions="{ item }">    
                <v-icon
                    small
                    class="mr-2"
                    @click="editBook(item)"
                >
                    mdi-eye
                </v-icon>
                
                <!-- "v-icon" abaixo só aparece se o status for igual a 
                "AGUARDANDO" (v-if="item.status === 0") e ao ser clicado 
                abre modal/expande linha para mudança de status-->
                <v-icon
                    small
                    @click="deleteBook(item)"
                >
                    mdi-alert
                </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>    
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    /*
    -> solicitações/histórico de solicitações;
    -> solicitações/gerenciamento de solicitações feitas e recebidas;

    fazer export para ReadingClub.vue
    */
    data() {
        return {
            headers: 
                [
                    {
                        text: 'Solicitante',
                        align: 'start',
                        sortable: false,
                        value: 'userRequester',
                    },
                    { text: 'Livro', align: 'start', value: 'book' },
                    { text: 'Ações', align: 'center', value: 'actions', sortable: false },
                ],
        }
    },

    async created() {
        await this.getBooks()
        console.log('ret books', this.books)
        await this.getRequests()
        console.log('ret requests', this.requests)
        await this.getUsers()
        console.log('ret users', this.users)
        await this.getLoans()
        console.log('ret loans', this.loans)
        //await this.sepereRequests()
        this.showTable()
       
    },

    computed: {
        displeyedRequest: function() {
            return this.requests.forEach( item => item
                .filter(request => request.userRequester === this.isRequester 
                && request.status === this.status))
        },
        
        ...mapGetters({
            books: 'books/getBooks',
            loans: 'loans/getLoans',
            requests: 'requests/getRequests',
            users: 'users/getUsers',
        })
    },

   methods: {

        ...mapActions({
            getBooks: 'books/getBooks',
            getLoans: 'loans/getLoans',
            getRequests: 'requests/getRequests',
            getUsers: 'users/getUsers',
        }),

        setIsRequester(val) {
            this.isRequester = val
            this.showTable()
        },

        setStatus(val) {
            this.status = val
            this.showTable()
        },

        showTable() {
            if(this.isRequester === true){
                this.displeyedRequest = []
                this.displeyedRequest = this.requests
                    .filter(request => request.userRequester === 'maria' 
                    && request.status === this.status)
                console.log('ret displeyedRequest', this.displeyedRequest)
            } else if(this.isRequester === false){
                this.displeyedRequest = []
                this.displeyedRequest = this.requests
                    .filter(request => request.userRequester !== 'maria' 
                    && request.status === this.status)
                console.log('ret displeyedRequest', this.displeyedRequest)
            } 
            
        },

       //Livros


        // async sepereRequests() {
            
            
        // },
    

   }
}
      // sentRequests0: function() {
        //     return this.requests
        //         .filter(item => item.userRequester === true)
        //         .filter(el => el.status === '0')
        // },

        // sentRequests1: function() {
        //     return this.requests
        //         .filter(item => item.userRequester === true)
        //         .filter(el => el.status === '1')
        // },

        // sentRequests2: function() {
        //     return this.requests
        //         .filter(item => item.userRequester === true)
        //         .filter(el => el.status === '2')
        // },
        
        // receivedRequests0: function() {
        //     return this.requests
        //         .filter(item => item.userRequester !== false)
        //         .filter(el => el.status === '0')
        // },

        // receivedRequests1: function() {
        //     return this.requests
        //         .filter(item => item.userRequester !== false)
        //         .filter(el => el.status === '1')
        // },

        // receivedRequests2: function() {
        //     return this.requests
        //         .filter(item => item.userRequester !== false)
        //         .filter(el => el.status === '2')
        // }

    //},


                //Livros - Books
            //    books: [],
            //    solicitedBook: {
            //         availability: '',
            //         author: '',
            //         category: '',
            //         edition: '',
            //         language: '',
            //         overview:'',
            //         pages:'',
            //         publisher: '',
            //         title: ''
            //     },
            //     defaultBook: {
            //         availability: '',
            //         author: '',
            //         category: '',
            //         edition: '',
            //         language: '',
            //         overview:'',
            //         pages:'',
            //         publisher: '',
            //         title: ''
            //     },

                //Usuários - Users
                // users: [],
                // requesterUser: {
                //     completeName: '',
                //     username: '',
                //     cpf: '',
                //     email: '',
                //     phone: '',
                //     password:''
                // },
                // defaultUser: {
                //     completeName: '',
                //     username: '',
                //     cpf: '',
                //     email: '',
                //     phone: '',
                //     password:''
                // },
                
                //Solicitações - Requests
                // requests: [],
                
                // displeyedRequest: [],
                // isRequester: true,
                // status: '0',
                // selectedRequest: {
                //     id:'',
                //     book:'',
                //     userRequester:'',
                //     status:'',
                // },
                // defaultRequest: {
                //     id:'',
                //     book:'',
                //     userRequester:'',
                //     status:'',
                // },

                // //Empréstimos - Loans
                // loans: [],
                // selectedLoan: {
                //     id:'',
                //     requestId:'',
                //     dateBorrow:'',
                //     dateDevolution:'',
                // },
                // defaultLoan: {
                //     id:'',
                //     requestId:'',
                //     dateBorrow:'',
                //     dateDevolution:'',
                // }
</script>

<style>

</style>


