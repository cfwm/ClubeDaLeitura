<template>
  <v-container>
    <v-card elevation="15" width="250%">
      <v-card-title>
        <p>Livros Diposníveis</p>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            class="mx-4"
            color="purple"
          ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="booksToSearch"
        item-key="title"
        :search="search"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">    
          <v-icon
            small
            class="mr-2"
            @click="openDialogSeeBook(item)"
          >
            mdi-magnify-plus-outline 
          </v-icon>
          <v-icon
            small
            @click="openDialogSendRequest(item)"
          >
            mdi-bell-plus
          </v-icon>
          <v-dialog
            v-if="dialogSeeBook"
            v-model="dialogSeeBook" 
            max-width="50%"
            persistent
            :retain-focus="false"
          >
            <v-card width="99%">
              <v-card-title class="d-flex justify-center">
                <h2>Livro Selecionado</h2>
              </v-card-title>
              <v-card-text>
                <v-container>
                    <v-row class="d-flex justify-center">
                      <h3>Informações do livro</h3>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Título: </b>{{selectedBook.title}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Autor(a): </b>{{selectedBook.author}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Resumo: </b>{{selectedBook.overview}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Categoria: </b>{{selectedBook.category}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Editora: </b>{{selectedBook.publisher}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Edição: </b>{{selectedBook.edition}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Idioma: </b>{{selectedBook.language}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Páginas: </b>{{selectedBook.pages}}</p>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-row class="d-flex justify-center">
                      <h3>Informações do dono do livro</h3>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Nome: </b>{{bookUserOwner.completeName}}</p>
                    </v-row>
                    <v-row class="d-flex justify-center">
                      <p><b>Username: </b>{{bookUserOwner.username}}</p>
                    </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-btn
                      elevation="2"
                      color="purple"
                      style="color:white"
                      @click="closeDialogSeeBook()"
                    >Fechar
                    </v-btn>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-btn
                      elevation="2"
                      color="green"
                      style="color:white"
                      @click="dialogSendRequest = true"
                    >Solicitar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>        
          </v-dialog>
          
          <v-dialog
            v-if="dialogSendRequest"
            v-model="dialogSendRequest"
            max-width="50%"
            persistent
            :retain-focus="false"
          >
            <v-card>
              <v-card-title class="d-flex justify-center">
                <span>Solicitação de Empréstimo</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <span>Você deseja confirma a solicitação de empréstimo do livro 
                    <b>{{selectedBook.title}}</b> pertencente ao usuário <b>{{bookUserOwner.username}}</b>?</span>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-btn
                      elevation="2"
                      color="purple"
                      style="color:white"
                      @click="closeDialogSendRequest()"
                    >Fechar
                    </v-btn>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-btn
                      elevation="2"
                      color="green"
                      style="color:white"
                      @click="sendRequest()"
                    >Confirmar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ls from 'local-storage'
  
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Título',
            align: 'start',
            sortable: true,
            value: 'title'
          },  
          { text: 'Autor(a)', value: 'author' },
          { text: 'Categoria', value: 'category' },
          { text: 'Editora', value: 'publisher' },
          { text: 'Edição', value: 'edition' },
          { text: 'Ações', value: 'actions', sortable: false },
        ],

        dialogSeeBook: false,
        dialogSendRequest: false,

        booksToSearch:[],
        
        selectedBook: null,

        bookUserOwner: null,
      }
    },
    
    watch: {
      dialogSeeBook(val) {
        val || this.closeDialogSeeBook()
      },

      dialogSendRequest(val) {
        val || this.closeDialogSendRequest()
      }
    },

    async beforeMount() {
      await this.setBooks()
      this.setBooksToSearch()
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
        setBooks: 'books/setBooks',
        setLoans: 'loans/setLoans',
        setRequests: 'requests/setRequests',
        setUsers: 'users/setUsers',
        }),

      sendRequest(){
        //enviar request com bookId (selectedBook.id) e userRequesterId (bookUserOwner.id)
      },

      setBooksToSearch() {
        let userLS = ls.get('currentUser')
        this.booksToSearch = this.books
          .filter(book => book.ownerId !== userLS.id)
      },

      openDialogSeeBook(book) {
        this.selectedBook = book
        this.bookUserOwner = this.users
          .find(user => user.id === this.selectedBook.ownerId)
        this.dialogSeeBook = true
      },

      closeDialogSeeBook() {
        this.selectedBook = null
        this.bookUserOwner = null
        this.dialogSeeBook = false
      },

      async openDialogSendRequest(book) {
        if(!this.dialogSeeBook){
          if(this.selectedBook === null) this.selectedBook = book
          this.bookUserOwner = this.users
            .find(user => user.id === this.selectedBook.ownerId)
        }
        this.dialogSendRequest = true
      },

      closeDialogSendRequest() {
        if(!this.dialogSeeBook) {
          this.selectedBook = null
          this.bookUserOwner = null
        }
        this.dialogSendRequest = false
      }
    },

    
  }
</script>

<style>

</style>