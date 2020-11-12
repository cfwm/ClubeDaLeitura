<template>
    <v-container>
            <v-card
        elevation="15"
        class="d-flex flex-column justify-center align-center"
    >
        <v-card-title>{{ user.username }}</v-card-title>
        <v-card-text >
            <v-row>Nome de Usuário: <b>{{ user.username }}</b></v-row>
            <v-row>Nome Completo: <b>{{ user.completeName }}</b></v-row>
            <v-row>CPF: <b>{{ user.cpf }}</b></v-row>
            <v-row>E-mail: <b>{{ user.email }}</b></v-row>
            <v-row>Telefone: <b>{{ user.phone }}</b></v-row>
            <v-row>Senha: <b>{{ user.password }}</b></v-row>
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
                        <v-col>
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
                        </v-col>
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
        data () {
            return {
                dialog: false,
                user: {
                    completeName: 'Carlos Moreira',
                    username: 'carlos',
                    cpf: 98745632105,
                    email: 'carlos@email.com',
                    phone: 5548999887766,
                    password: 'a1b2c3d4',
                },
                editedUser: {
                    completeName: '',
                    username: '',
                    cpf: '',
                    email: '',
                    phone: '',
                    password:''
                },
                defaultItem: {
                    completeName: '',
                    username: '',
                    cpf: '',
                    email: '',
                    phone: '',
                    password:''
                },
            }
        },
    }
</script>

<style>

</style>