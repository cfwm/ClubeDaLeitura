<template>
    <v-container 
        class="d-flex flex-column"
        >
        <v-row class="justify-center">
            <h1>Clube da Leitura</h1>
        </v-row>
        <v-spacer></v-spacer>
        <v-row class="justify-center d-flex">
            <v-col>
                <v-card class="d-flex flex-column justify-center mt-10">
                    <v-card-title class="d-flex justify-center">
                        <h2>Sobre</h2>
                    </v-card-title>
                    <v-card-text class="d-flex justify-center flex-column">
                        <v-row class="justify-center"><h3>Bem vindo ao Clube a Leitura!</h3></v-row>
                        <v-row class="justify-center mt-5 ml-5 mr-5">
                            Este é espaço dedicado ao compartilhamento de conhecimento, 
                            que busca a aproximação das pessoas através da leitura, e também oferece 
                            um sistema de registro e empréstimos de livros, para que você nunca mais 
                            esqueça da pessoa que está com sue livro.
                        </v-row> 
                        <v-row class="justify-center mt-5 ml-5 mr-5">
                            O Clube da Leitura é um site de uso gratuito e sem patrocínios, 
                            elaborado como requisito para a Situação de Aprendizagem do curso técnico
                            em Desenvolvimento de Sistemas do SENAI-SC CTAI e mantido através de doações.
                            Para mais informações sobre como colaborar, entre em contato com clube.da.leitura@email.com.
                        </v-row> 
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card 
                    class="d-flex flex-column justify-center mt-10"
                >
                    <v-card-title class="d-flex justify-center">
                        <h2>Login</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Nome de Usuário ou E-mail"
                                    color="green"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Senha"
                                    color="green"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="showPassword ? 'text' : 'password'"
                                    counter
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center flex-column">
                        <v-row>
                            <v-col>
                                <v-btn
                                    elevation="10"
                                    width="200px"
                                    color="#363636"
                                    class="white--text"
                                    @click="login"
                                >Entrar</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn
                                    elevation="5"
                                    @click="openDialogAddNewUser"
                                >Novo Cadastro</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn
                                    elevation="5"
                                    @click="passwordRecovery"
                                >Recuperar Senha</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <template >
            <v-dialog
                v-if="dialogAddNewUser"
                v-model="dialogAddNewUser" 
                max-width="50%"
                persistent
                :retain-focus="false"
            >
                <v-card>
                    <v-card-title class="d-flex justify-center">
                        <span>Cadastro de Usuário</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row
                            cols="12"
                        >
                            <v-text-field
                            color="#363636"
                            label="Nome de Usuário"
                            v-model="newUser.username"
                            ></v-text-field>
                        </v-row>
                        <v-row
                            cols="12"
                        >
                            <v-text-field
                            color="#363636"
                            label="Nome Completo"
                            v-model="newUser.completeName"
                            ></v-text-field>
                        </v-row>
                        <v-row
                            cols="12"
                        >
                            <v-text-field
                            color="#363636"
                            label="CPF"
                            v-model="newUser.cpf"
                            ></v-text-field>
                        </v-row>

                        <v-row 
                            cols="12"
                        >
                            <v-text-field
                            color="#363636"
                            label="Email"
                            v-model="newUser.email"
                            type="email"
                            ></v-text-field>
                        </v-row>
                        <v-row
                            cols="12"
                        >
                            <v-text-field
                            color="#363636"
                            label="Telefone"
                            v-model="newUser.phone"
                            ></v-text-field>
                        </v-row>
                        <v-row
                            cols="12"
                        >
                            <v-text-field
                            color="#363636"
                            label="Senha"
                            v-model="newUser.password"
                            type="password"
                            ></v-text-field>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <!-- **** 
                            Para participar do Clube da Leitura você deve concordar com os Termos de Uso descritos abaixo.
                            
                            Termos de Uso:
                            1) XXXXX XXXXX XXXXX XXXXXX XXXXXXXXXXX XXXXXXX XXXXXX.

                            2) XXXXX XXXXX XXXXX XXXXXX XXXXXXXXXXX XXXXXXX XXXXXX.

                            3) XXXXX XXXXX XXXXX XXXXXX XXXXXXXXXXX XXXXXXX XXXXXX.

                            4) XXXXX XXXXX XXXXX XXXXXX XXXXXXXXXXX XXXXXXX XXXXXX.

                            5) XXXXX XXXXX XXXXX XXXXXX XXXXXXXXXXX XXXXXXX XXXXXX.

                            6) XXXXX XXXXX XXXXX XXXXXX XXXXXXXXXXX XXXXXXX XXXXXX.
                            Colocar um checkbox com os termos de uso que ao ser confirmado libera o botão salvar (addNewUser)
                         **** -->
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="purple"
                                style="color:white"
                                @click="closeDialogAddNewUser"
                            >Cancelar</v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="green"
                                style="color:white"                            
                                @click="addNewUser"
                            >Salvar</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-container>    
</template>

<script>
export default {
    name: 'Login',
    props: { validatingToken: [Boolean]},
    data() {
        return {
            dialogAddNewUser: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'A senha deve ter no mínimo 4 caracteres',
                emailMatch: () => (`O e-mail ou senha informados estão incorretos.`),
            },
            showPassword: false,
            //Usuários - Users
            users: [],
            currentUser: {
                completeName: '',
                userName: '',
                cpf: '',
                email: '',
                phone: '',
                passwaord: '',
            },

            newUser: {
                completeName: '',
                userName: '',
                cpf: '',
                email: '',
                phone: '',
                passwaord: '',
            },
            defaultUser: {
                completeName: '',
                userName: '',
                cpf: '',
                email: '',
                phone: '',
                passwaord: '',
            },
        }
    },

    watch: {
        dialogAddNewUser(val){
            val || this.closeDialogAddNewUser()
        }
    },

    methods: {
        login() {
            //localStorage.removeItem(userKey)
            this.validatingToken = true
            this.$emit('validatingTokenChange', this.validatingToken)
            this.$router.push({name: 'home'})
        },

        addNewUser() {
            window.alert('Cadastro de novo usuário')
            this.closeDialogAddNewUser()
        },

        openDialogAddNewUser(){
            this.dialogAddNewUser = true
        },

        closeDialogAddNewUser() {
            this.newUser = Object.assign({}, this.defaultUser)
            this.dialogAddNewUser = false
        },

        passwordRecovery() {
            window.alert('Recuperação de Senha')
        },      

    }
}
</script>

<style>

</style>