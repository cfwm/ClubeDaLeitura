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
                        <p>Sobre</p>
                    </v-card-title>
                    <v-card-text class="d-flex justify-center flex-column">
                        <v-row class="justify-center">Bem vindo ao clube a Leitura! </v-row>
                        <v-row class="justify-center mt-5">O que é o Clube da Leitura? 
                            TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO
                            TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO
                            TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO
                        </v-row> 
                        <v-row class="justify-center mt-5">Como funciona? 
                            TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO
                            TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO
                            TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO TEXTOTEXTO
                        </v-row> 
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card 
                    class="d-flex flex-column justify-center mt-10"
                >
                    <v-card-title class="d-flex justify-center">
                        <p>Login</p>
                    </v-card-title>
                    <v-card-text>
                        <row>
                            <v-col>
                                <v-text-field
                                    label="Nome de Usuário ou E-mail"
                                    color="green"
                                ></v-text-field>
                            </v-col>
                        </row>
                        <row>
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
                        </row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center flex-column">
                        <v-row>
                            <v-col>
                                <v-btn
                                    elevation="2"
                                    width="200px"
                                    color="green"
                                    class="white--text"
                                    @click="login"
                                >Entrar</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn
                                    elevation="2"
                                    @click="newRegister"
                                >Novo Cadastro</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn
                                    elevation="2"
                                    @click="passwordRecovery"
                                >Recuperar Senha</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

    </v-container>    
</template>

<script>
export default {
    name: 'Login',
    props: { validatingToken: [Boolean]},
    data() {
        return {
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'A senha deve ter no mínimo 4 caracteres',
                emailMatch: () => (`O e-mail ou senha informados estão incorretos.`),
            },
            showPassword: false,
            user: {
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
            }
        }
    },

    methods: {
        login() {
            //localStorage.removeItem(userKey)
            this.validatingToken = true
            this.$emit('validatingTokenChange', this.validatingToken)
            this.$router.push({name: 'home'})
        },

        newRegister() {
            window.alert('Novo Cadastro')
        },

        passwordRecovery() {
            window.alert('Recuperação de Senha')
        },

    }
}
</script>

<style>

</style>