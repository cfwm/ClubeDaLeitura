<template>
    <v-container>
        <v-card elevation="15" width="250%">
            <v-card-title class="d-flex justify-center">
                <p>Informações de Cadastro</p>
            </v-card-title>
            <v-card-text class="d-flex align-center flex-column">
                <v-row>Nome de Usuário: <b>{{ currentUser.username }}</b></v-row>
                <v-row>Nome Completo: <b>{{ currentUser.completeName }}</b></v-row>
                <v-row>CPF: <b>{{ currentUser.cpf }}</b></v-row>
                <v-row>E-mail: <b>{{ currentUser.email }}</b></v-row>
                <v-row>Telefone: <b>{{ currentUser.phone }}</b></v-row>
            </v-card-text>
            <v-card-actions class="d-flex flex-column">
            <v-row class="mb-4">
                <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="#363636"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >Editar Informações de Cadastro
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
                                        color="#363636"
                                        label="Nome de Usuário"
                                        v-model="currentUser.username"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        color="#363636"
                                        label="Nome Completo"
                                        v-model="currentUser.completeName"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        color="#363636"
                                        label="CPF"
                                        v-model="currentUser.cpf"
                                        ></v-text-field>
                                    </v-row>

                                    <v-row 
                                        cols="12"
                                    >
                                        <v-text-field
                                        color="#363636"
                                        label="Email"
                                        v-model="currentUser.email"
                                        type="email"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row
                                        cols="12"
                                    >
                                        <v-text-field
                                        color="#363636"
                                        label="Telefone"
                                        v-model="currentUser.phone"
                                        ></v-text-field>
                                    </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-col class="d-flex justify-center">
                                <v-btn
                                    elevation="2"
                                    color="purple"
                                    style="color:white"
                                    @click="dialog = false"
                                >Cancelar</v-btn>
                            </v-col>
                            <v-col class="d-flex justify-center">
                                <v-btn
                                    elevation="2"
                                    color="green"
                                    style="color:white"
                                    @click="editUser"
                                >Salvar</v-btn>
                            </v-col>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-row>
                <v-row>
                    <v-btn 
                        color="#363636"
                        class="white--text ml-2"
                        @click="openDialogchangePasswordVerifier"
                    >Alterar Senha</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>

        <template>
            <v-dialog
                v-if="dialogchangePasswordVerifier"
                v-model="dialogchangePasswordVerifier"
                max-width="50%"
                persistent
                :retain-focus="false"
            >
                <v-card>
                    <v-card-title class="d-flex justify-center">
                        <span>Confirmação de segurança</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <span>Digite sua senha atual e confirme para prosseguir com a alteração de senha.</span>
                        </v-row>
                        <v-row>
                            <v-text-field
                                color="#363636"
                                label="Senha Atual"
                                v-model.trim="oldPassword"
                            ></v-text-field>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="purple"
                                style="color:white"
                                @click="closeDialogchangePasswordVerifier"
                            >Cancelar</v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="green"
                                style="color:white"                            
                                @click="openDialogchangePassword"
                            >Confirmar</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

        <template>
            <v-dialog
                v-if="dialogchangePassword"
                v-model="dialogchangePassword"
                max-width="50%"
                persistent
                :retain-focus="false"
            >
                <v-card>
                    <v-card-title class="d-flex justify-center">
                        <span>Alteração de Senha</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                        <span>Digite sua nova senha:</span>
                        </v-row>
                        <v-row>
                            <v-text-field
                                color="#363636"
                                label="Nova Senha"
                                v-model.trim="newPassword"
                            ></v-text-field>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="purple"
                                style="color:white"
                                @click="closeDialogchangePassword"
                            >Cancelar</v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="green"
                                style="color:white"                            
                                @click="changePassword"
                            >Salvar</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-container>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import ls from 'local-storage'

    export default {
        data() {
            return {
                dialog: false,
                dialogchangePassword: false,
                dialogchangePasswordVerifier: false,
                newPassword:'',
                oldPassword:'',
                currentUser: '',
                
            }
        },

        async created() {
            await this.setUsers()
            this.getCurrentUser()
        },

        computed: {
            ...mapGetters({
                users: 'users/getUsers',
            }),
        },

        methods: {
            ...mapActions({
                setUsers: 'users/setUsers',
                saveUser: 'users/saveUser'
            }),

            getCurrentUser() {
                let userLS = ls.get('currentUser')
                this.currentUser = this.users
                    .find(user => user.username === userLS.username)
            },

            async editUser(){
                try {
                    await this.saveUser(this.currentUser)
                    console.log('ret ***saveUser***', this.currentUser)
                } catch (fail) {
                    console.log(fail)
                }
                await this.setUsers()
                this.dialog = false
                
            },
            
            
            changePassword(){
                // let dynamicUser = this.users
                //     .filter(user => user.username === this.currentUser.username)
                // let filteredCurrentUser = await this.users
                //     .filter((user) => {return user.username === 'maria'})
                // let dynamicUser = filteredCurrentUser.pop()
                // console.log(dynamicUser)
                this.closeDialogchangePassword()
            },

            async openDialogchangePassword(){
                // let ret
                // console.log(this.currentUser.id)
                // await this.$http('users/1')
                // .then(res => {
                //     console.log(res)
                // })
                //     .catch(err => {
                //         console.log(err)
                //     })


                
                // let filteredCurrentUser = await ret
                //     .filter((user) => {return user.username === 'maria'})
                //let dynamicUser = filteredCurrentUser.pop()
     
                //console.log('ret users', this.users)




                this.dialogchangePassword = true
            },

            closeDialogchangePassword(){
                this.newPassword = ''
                this.dialogchangePassword = false
                this.closeDialogchangePasswordVerifier()
            },

            openDialogchangePasswordVerifier(){
                this.dialogchangePasswordVerifier = true
            },
                       
            closeDialogchangePasswordVerifier(){
                this.oldPassword = ''
                this.dialogchangePasswordVerifier = false
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