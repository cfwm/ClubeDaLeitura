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
        :items="books"
        item-key="title"
        :search="search"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">    
          <v-icon
            small
            class="mr-2"
            @click="seeBook(item)"
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
                <span>Livro Selecionado</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="d-flex justify-start">
                    <p><b>Título: </b>{{selectedBook.title}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Autor(a): </b>{{selectedBook.author}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Resumo: </b>{{selectedBook.overview}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Categoria: </b>{{selectedBook.category}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Editora: </b>{{selectedBook.publisher}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Edição: </b>{{selectedBook.edition}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Idioma: </b>{{selectedBook.language}}</p>
                  </v-row>
                  <v-row class="d-flex justify-start">
                    <p><b>Páginas: </b>{{selectedBook.pages}}</p>
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
                      @click="sendRequest()"
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
                <v-container>

                </v-container>
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
                    >Solicitar
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
        
        selectedBookIndex: -1,
        selectedBook: {
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
          author: '',
          category: '',
          edition: '',
          language: '',
          overview:'',
          pages:'',
          publisher: '',
          title: ''
        },
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

    async created() {
      await this.getBooks()
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
        getBooks: 'books/getBooks',
        getLoans: 'loans/getLoans',
        getRequests: 'requests/getRequests',
        getUsers: 'users/getUsers',
        }),

      seeBook(book) {
        this.selectedBookIndex = this.books.indexOf(book)
        this.selectedBook = Object.assign({}, book)
        this.dialogSeeBook = true
      },

      openDialogSendRequest() {
        this.dialogSendRequest = true
      },

      closeDialogSeeBook() {
        this.selectedBook = Object.assign({}, this.defaultBook)
        this.selectedBookIndex = -1
        this.dialogSeeBook = false
      },

      closeDialogSendRequest() {
        this.dialogSendRequest = false
      }
    },

    
  }
</script>

<style>

</style>