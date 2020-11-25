<template>
    <v-container>
        <v-card elevation="15" width="250%">
            <v-card-title class="d-flex justify-center">
                <p>{{ currentUser.username }}</p>
            </v-card-title>
            <v-card-text class="d-flex align-center flex-column">
                <v-row>Nome de Usuário: <b>{{ currentUser.username }}</b></v-row>
                <v-row>Nome Completo: <b>{{ currentUser.completeName }}</b></v-row>
                <v-row>CPF: <b>{{ currentUser.cpf }}</b></v-row>
                <v-row>E-mail: <b>{{ currentUser.email }}</b></v-row>
                <v-row>Telefone: <b>{{ currentUser.phone }}</b></v-row>
                <v-row>Senha: <b>{{ currentUser.password }}</b></v-row>
            </v-card-text>
            <v-card-actions>
            <v-row justify="center">
                <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                        Editar Informações de Cadastro
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="d-flex justify-center">
                            <span class="headline">Informações de Cadastro</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        label="Nome de Usuário"
                                        v-model="user.username"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        label="Nome Completo"
                                        v-model="user.completeName"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        label="CPF"
                                        v-model="user.cpf"
                                        ></v-text-field>
                                    </v-row>

                                    <v-row 
                                        cols="12"
                                    >
                                        <v-text-field
                                        label="Email"
                                        v-model="user.email"
                                        type="email"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        label="Telefone"
                                        v-model="user.phone"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        label="Senha"
                                        v-model="user.password"
                                        type="password"
                                        ></v-text-field>
                                    </v-row>
                            </v-container>
                        <!-- <small>*indicates required field</small> -->
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog = false"
                            >
                                Cancelar
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog = false"
                            >
                                Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-card-actions>
    </v-card>
    </v-container>
</template>

<script>
    export default {
        computed: {
            getCurrentUser() {
                return this.$store.users.getters.getCurrentUser
            }
        },

  


        // data () {
        //     return {
        //         dialog: false,
        //         user: {
        //             completeName: 'Carlos Moreira',
        //             username: 'carlos',
        //             cpf: 98745632105,
        //             email: 'carlos@email.com',
        //             phone: 5548999887766,
        //             password: 'a1b2c3d4',
        //         },
        //         editedUser: {
        //             completeName: '',
        //             username: '',
        //             cpf: '',
        //             email: '',
        //             phone: '',
        //             password:''
        //         },
        //         defaultUser: {
        //             completeName: '',
        //             username: '',
        //             cpf: '',
        //             email: '',
        //             phone: '',
        //             password:''
        //         },
        //     }
        // },

        // async created() {
        //     await this.getUsers()
        // },

        // methods: {
        //      //Usuários
        //     async getUsers() {
        //         try {
        //         this.users = []
        //         await this.$http.get('users')
        //             .then(res => { this.users = res.data })
        //         } catch(fail) {
        //         console.error(fail)
        //         }
        //     },
        // }
    }
</script>

<style>

</style>