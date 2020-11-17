<template>
    <v-container class="d-flex flex-column">
        <v-row 
            class="d-flex justify-center mb-5"
        >
            <h1>Solicitações</h1>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col class="">
                <v-row class="d-flex justify-center">
                    <h2>Feitas</h2>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card class="d-flex justify-center">
                            <v-card-title>
                                Abertas
                            </v-card-title>
                            <!-- TODO: v-list items -->
                            <v-card-text>
                                <v-expansion-panels 
                                    popout
                                >
                                    <v-expansion-panel
                                        v-for="(request, index) in  requests"
                                        :key="index"
                                    >
                                    </v-expansion-panel>
                                    <v-expansion-panel-header>
                                        {{request.book}}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-header>
                                        {{request.user}}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        TESTE TESTE TESTE TESTE TESTE TESTETESTETESTETESTETESTETESTE v  vTESTE TESTEv TESTE vTESTE TESTETESTETESTETESTETESTETESTE   vTESTE TESTE TESTE v
                                    </v-expansion-panel-content>
                                </v-expansion-panels>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card class="d-flex justify-center">
                            <v-card-title>
                                Concluídas
                            </v-card-title>
                            <!-- TODO: v-list items -->
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="">
                <v-row class="d-flex justify-center">
                    <h2>Recebidas</h2>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card class="d-flex justify-center">
                            <v-card-title>
                                Abertas
                            </v-card-title>
                            <!-- TODO: v-list items -->
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card class="d-flex justify-center">
                            <v-card-title>
                                Concluídas
                            </v-card-title>
                            <!-- TODO: v-list items -->
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>    
</template>

<script>
export default {
    /*
    -> solicitações/histórico de solicitações;
    -> solicitações/gerenciamento de solicitações feitas e recebidas;

    fazer export para ReadingClub.vue
    */
   data() {
       return {

           //Livros
           books: [],
           solicitedBook: {
                availability: '',
                author: '',
                category: '',
                edition: '',
                language: '',
                overview:'',
                pages:'',
                publisher: '',
                title: ''
            },
            defaultBook: {
                availability: '',
                author: '',
                category: '',
                edition: '',
                language: '',
                overview:'',
                pages:'',
                publisher: '',
                title: ''
            },

            //Usuários
            users: [],
            requesterUser: {
                completeName: '',
                username: '',
                cpf: '',
                email: '',
                phone: '',
                password:''
            },
            defaultUser: {
                completeName: '',
                username: '',
                cpf: '',
                email: '',
                phone: '',
                password:''
            },
            
            //Solicitações
            requests: [],
            selectedRequest: {
                id:'',
                book:'',
                user:'',
                status:'',
            },
            defaultRequest: {
                id:'',
                book:'',
                user:'',
                status:'',
            }
       }
   },

//    async beforeCreate() {
//        await this.getBooks()
//        await this.getUsers()
//        await this.getRequests()
//    },

   methods: {
       //Livros
        async getBooks() {
            try {
            this.books = []
            await this.$http.get('books')
                .then(res => { this.books = res.data })
            } catch(fail) {
            console.error(fail)
            }
        },

        //Usuários
        async getUsers() {
            try {
            this.users = []
            await this.$http.get('users')
                .then(res => { this.users = res.data })
            } catch(fail) {
            console.error(fail)
            }
        },

        //Solicitações
        async getRequests() {
            try {
            this.requests = []
            await this.$http.get('requests')
                .then(res => { this.requests = res.data })
            } catch(fail) {
            console.error(fail)
            }
        },

        

   }
}
</script>

<style>

</style>