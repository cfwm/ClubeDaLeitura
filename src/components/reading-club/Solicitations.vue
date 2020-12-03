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
                                :color="isRequester === true ? '#363636' : 'null'"
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
                                :color="isRequester === false ? '#363636' : 'null'"
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
                                    @click="setStatus(0)"
                                    :color="status === 0 ? '#363636' : 'null'"
                                    :style="status === 0 ? 'color:white;' : 'color:black;'"
                                >Aguardando</v-btn
                            ><v-btn 
                                    height="100%" 
                                    width="20%"
                                    class="d-flex justify-center"
                                    @click="setStatus(1)"
                                    :color="status === 1 ? '#363636' : 'null'"
                                    :style="status === 1 ? 'color:white;' : 'color:black;'"
                                >{{requests.length === 0 ? 'Aceita' : 'Aceitas'}}</v-btn
                            ><v-btn
                                    height="100%" 
                                    width="20%" 
                                    class="d-flex justify-center"
                                    @click="setStatus(2)"
                                    :color="status === 2 ? '#363636' : 'null'"
                                    :style="status === 2 ? 'color:white;' : 'color:black;'"
                                >{{ requests.length === 0 ? 'Concluída' : 'Concluídas' }}</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-data-table
                :headers="headers"
                :items="displeyedRequest"
                sort-by="userRequesterId"
            >
             <template v-slot:item.actions="{ item }">    
                <v-icon
                    small
                    @click="seeRequest(item)"
                >
                    mdi-eye
                </v-icon>
                <v-icon
                    v-if="isRequester === false && status === 0"
                    small
                    @click="negateRequest(item)"
                >
                    mdi-window-close
                </v-icon>
                <v-icon
                    v-if="isRequester === false && status === 0"
                    small
                    @click="acceptRequest(item)"
                >
                    mdi-check
                </v-icon>
                <v-icon
                    v-if="isRequester === false && status === 1"
                    small
                    @click="finishRequest(item)"
                >
                    mdi-check
                </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <template>
            <v-dialog
                v-if="dialogSeeRequest"
                v-model="dialogSeeRequest"
                max-width="90%"
                persistent
                :retain-focus="false"
            >
                <v-card>
                    <v-card-title class="d-flex justify-center">
                        <span>VIsualização de solicitação de empréstimo</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-row class="d-flex justify-center">
                                    <h3>Informações do livro</h3>
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Título: <b>{{requestBook.title}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Autor(a): <b>{{requestBook.author}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Resumo: <b>{{requestBook.overview}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Idioma: <b>{{requestBook.language}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Editora: <b>{{requestBook.publisher}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Edição: <b>{{requestBook.edition}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Páginas: <b>{{requestBook.pages}}</b></span> 
                                </v-row>
                            </v-col>
                            <v-col>
                                <v-row class="d-flex justify-center">
                                    <h3>Informações do solicitante</h3>
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Username: <b>{{requestUser.username}}</b></span> 
                                </v-row>
                                <v-row class="d-flex justify-center">
                                    <span>Nome: <b>{{requestUser.completeName}}</b></span> 
                                </v-row>
                                <v-row 
                                    class="d-flex justify-center"
                                    v-if="isRequester === false && status === 1"
                                >
                                    <span>E-mail: <b>{{requestUser.email}}</b></span> 
                                </v-row>
                                <v-row 
                                    class="d-flex justify-center"
                                    v-if="isRequester === false && status === 1"
                                >
                                    <span>Telefone: <b>{{requestUser.phone}}</b></span> 
                                </v-row>
                                <v-spacer v-if="currentRequest.status !== 0"></v-spacer>
                                <v-row 
                                    v-if="currentRequest.status !== 0"
                                    class="d-flex justify-center"
                                >
                                    <h3>Informações do empréstimo</h3>
                                </v-row>
                                <v-row 
                                    v-if="currentRequest.status !== 0"
                                    class="d-flex justify-center"
                                >
                                    <span>Data de solicitação: <b>{{selectedLoan.dateBorrow}}</b></span> 
                                </v-row>
                                <v-row 
                                    v-if="currentRequest.status === 2"
                                    class="d-flex justify-center"
                                >
                                    <span>Data de devolução: <b>{{selectedLoan.dateDevolution}}</b></span> 
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-col class="d-flex justify-center">
                            <v-btn
                                elevation="2"
                                color="#363636"
                                style="color:white"
                                @click="closeDialogSeeRequest"
                            >Fechar</v-btn>
                        </v-col>
                        <v-col 
                            class="d-flex justify-center"
                            v-if="isRequester === false && status === 0"    
                        >
                            <v-btn
                                elevation="2"
                                color="purple"
                                style="color:white"                            
                                @click="negateRequestFromDialog"
                            >Recusar</v-btn>
                        </v-col>
                        <v-col 
                            class="d-flex justify-center"
                            v-if="isRequester === false && status === 0"    
                        >
                            <v-btn
                                elevation="2"
                                color="green"
                                style="color:white"                            
                                @click="acceptRequestFromDialog"
                            >Aceitar</v-btn>
                        </v-col>
                        <v-col 
                            class="d-flex justify-center"
                            v-if="isRequester === false && status === 1"    
                        >
                            <v-btn
                                elevation="2"
                                color="green"
                                style="color:white"                            
                                @click="finishRequestFromDialog"
                            >Concluir</v-btn>
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
            headers: [
                {
                    text: 'Solicitante',
                    align: 'start',
                    sortable: false,
                    value: 'userRequesterUsername',
                },
                { text: 'Livro', align: 'start', value: 'bookTitle' },
                { text: 'Ações', align: 'center', value: 'actions', sortable: false },
            ],
            displeyedRequest: [],
            isRequester: true,
            status: 0,
            currentUser: {
                completeName:'',
                cpf:'',
                email:'',
                id:'',
                phone:'',
                username:''
            },
            dialogSeeRequest: false,
            //Livros
            requestBook: {
                author: '',
                category: '',
                edition: '',
                id:'',
                language: '',
                loanId:'',
                overview:'',
                ownerId:'',
                pages:'',
                publisher: '',
                title: ''
            },
            defaultBook: {
                author: '',
                category: '',
                edition: '',
                id:'',
                language: '',
                loanId:'',
                overview:'',
                ownerId:'',
                pages:'',
                publisher: '',
                title: ''
            },

            //Usuários
            requestUser: {
                completeName: '',
                cpf: '',
                email: '',
                id:'',
                phone: '',
                username: '',
            },
            defaultUser: {
                completeName: '',
                cpf: '',
                email: '',
                id:'',
                phone: '',
                username: '',
            },
                
            //Solicitações
            currentRequest: {
                id:'',
                bookId:'',
                bookTitle:'',
                userRequesterId:'',
                userRequesterUsername:'',
                status:'',
            },
            defaultRequest: {
                id:'',
                bookId:'',
                bookTitle:'',
                userRequesterId:'',
                userRequesterUsername:'',
                status:'',
            },

            //Empréstimos - Loans
            selectedLoan: {
                id:'',
                requestId:'',
                dateBorrow:'',
                dateDevolution:'',
            },
            defaultLoan: {
                id:'',
                requestId:'',
                dateBorrow:'',
                dateDevolution:'',
            }
        }
    },

    async created() {
        await this.setBooks()
        await this.setRequests()
        await this.setUsers()
        await this.setLoans()
        this.getCurrentUser()
        this.showTable()
    },

    computed: {
        ...mapGetters({
            books: 'books/getBooks',
            loans: 'loans/getLoans',
            requests: 'requests/getRequests',
            users: 'users/getUsers',
        })
    },

   methods: {
        ...mapActions({
            editBook: 'books/editBook',
            setBooks: 'books/setBooks',
            editLoan: 'loans/editLoan',
            saveLoan: 'loans/saveLoan',
            setLoans: 'loans/setLoans',
            editRequest: 'requests/editRequest',
            deleteRequest: 'requests/deleteRequest',
            setRequests: 'requests/setRequests',
            setUsers: 'users/setUsers',
        }),

        getCurrentUser() {
            this.currentUser = ls.get('currentUser')
        },

        setIsRequester(val) {
            this.isRequester = val
            this.showTable()
        },

        setStatus(val) {
            this.status = val
            this.showTable()
        },

        showTable() {
            this.displeyedRequest = []
            if(this.isRequester === true){
                this.displeyedRequest = this.requests
                    .filter(request => request.userRequesterId === this.currentUser.id 
                    && request.status === this.status)
            } else if(this.isRequester === false){
                this.displeyedRequest = this.requests
                    .filter(request => request.userRequesterId !== this.currentUser.id
                    && request.status === this.status)
            }  
        },

        async reloadTable() {
            await this.setBooks()
            await this.setRequests()
            await this.setUsers()
            await this.setLoans()
            this.showTable()
        },

        curday(sp){
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1;
            let yyyy = today.getFullYear();

            if(dd<10) dd='0'+dd;
            if(mm<10) mm='0'+mm;
            return (dd+sp+mm+sp+yyyy);
        },

        seeRequest(request) {
            this.requestUser = this.users
                .find(user => user.id === request.userRequesterId)
            this.requestBook = this.books
                .find(book => book.id === request.bookId)
            this.currentRequest = request
            this.dialogSeeRequest = true
            if(request.status !== 0){
                this.selectedLoan = this.loans
                    .find(loan => loan.requestId === request.id)
            }
        },

        async finishRequestFromDialog(){
            this.requestUser = this.users
                .find(user => user.id === this.currentRequest.userRequesterId)
            this.requestBook = this.books
                .find(book => book.id === this.currentRequest.bookId)
            await this.updateLoanFinish()
            await this.updateRequestStatusTwo()
            await this.updateBookAvailabilityToTrue()
            this.closeDialogSeeRequest()
            await this.reloadTable()
        },

        async finishRequest(request){
            this.requestUser = this.users
                .find(user => user.id === request.userRequesterId)
            this.requestBook = this.books
                .find(book => book.id === request.bookId)
            this.currentRequest = request
            await this.updateLoanFinish()
            await this.updateRequestStatusTwo()
            await this.updateBookAvailabilityToTrue()
            this.closeDialogSeeRequest()
            await this.reloadTable()
        },



        async acceptRequestFromDialog() {
            this.selectedLoan = {
                requestId: this.currentRequest.id,
                dateBorrow: this.curday('-'),
                dateDevolution: ''
            }
            await this.updateLoanAccept()
            await this.updateRequestStatusOne()
            await this.updateBookAvailabilityToFalse()
            this.closeDialogSeeRequest()
            await this.reloadTable()
        },
        
        async acceptRequest(request) {
            this.selectedLoan = {
                requestId: request.id,
                dateBorrow: this.curday('-'),
                dateDevolution: ''
            }
            this.currentRequest = request
            this.requestBook = this.books
                .find(book => book.id === this.currentRequest.bookId)
            await this.updateLoanAccept()
            await this.updateRequestStatusOne()
            await this.updateBookAvailabilityToFalse()
            this.closeDialogSeeRequest()
            await this.reloadTable()
        },



        async negateRequest(request) {
            request.status = 2
            this.currentRequest = request
            try {
                await this.deleteRequest(this.currentRequest)
            } catch (fail) {
                console.error(fail)
            }
            this.closeDialogSeeRequest()
            await this.reloadTable()
        },

        async negateRequestFromDialog() {
            this.currentRequest.status = 2
            try {
                await this.deleteRequest(this.currentRequest)
            } catch (fail) {
                console.error(fail)
            }
            this.closeDialogSeeRequest()
            await this.reloadTable()
        },



        async updateBookAvailabilityToFalse() {
            this.requestBook.isAvailable = false
            try {
                await this.editBook(this.requestBook)
            } catch (fail) {
                console.error(fail)
            }
        },

        async updateBookAvailabilityToTrue() {
            this.requestBook.isAvailable = true
            try {
                await this.editBook(this.requestBook)
            } catch (fail) {
                console.error(fail)
            }
        },
        
        async updateLoanAccept() {
            try {
                await this.saveLoan(this.selectedLoan)
            }catch(fail) {
                console.error(fail)
            }
        },

        async updateLoanFinish() {
            this.selectedLoan.dateDevolution = this.curday('-')
            try {
                await this.saveLoan(this.selectedLoan)
            }catch(fail) {
                console.error(fail)
            }
        },
        
        async updateRequestStatusOne() {
            this.currentRequest.status = 1
            try {
                await this.editRequest(this.currentRequest)
            } catch(fail) {
                console.error(fail)
            }
        },

        async updateRequestStatusTwo() {
            this.currentRequest.status = 2
            try {
                await this.editRequest(this.currentRequest)
            } catch(fail) {
                console.error(fail)
            }
        },

        closeDialogSeeRequest() {
            this.dialogSeeRequest = false
            this.requestUser = this.defaultUser
            this.requestBook = this.defaultBook
        },
   }
}
</script>

<style>

</style>


