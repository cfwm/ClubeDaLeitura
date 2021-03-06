<template>
  <v-container>
    <v-card elevation="15" width="250%">
      <!-- Tabela listagem de livros -->
      <v-data-table
        :headers="headers"
        :items="userBooks"
        sort-by="title"
        class="elevation-1"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="title"
        show-expand
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Meus Livros</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="50%"
              persistent
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#363636"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Adicionar Livro
                </v-btn>
              </template>

              <!-- Formulário de criação/edição de livro -->
              <v-card 
                elevation="15"
                width="99%"
              >
                <v-card-title class="d-flex justify-center">
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.title"
                        label="Título"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.author"
                        label="Autor"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.category"
                        label="Categoria"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.publisher"
                        label="Editora"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.edition"
                        label="Edição"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.overview"
                        label="Resumo"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.language"
                        label="Idioma"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        color="#363636"
                        v-model="editedBook.pages"
                        label="Páginas"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>
                <!-- Botões do formulário de criação/edição de livro -->
                <v-card-actions>
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn
                        elevation="2"
                        color="purple"
                        style="color:white"
                        @click="close"
                      >
                        Cancelar
                      </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn
                        elevation="2"
                        color="green"
                        style="color:white"
                        @click="addEditBook()"
                      >
                        Salvar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Janela de confirmação de exclusão de livros -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card> 
                <v-card-title 
                  class="headline"
                >Você quer mesmo excluir "{{editedBook.title}}"  da sua estante?
                </v-card-title>
                <v-card-actions class="d-flex justify-center">
                  <v-btn 
                    elevation="2"
                    color="purple"
                    style="color:white"  
                    @click="closeDelete"
                    >Cancel
                  </v-btn>
                  <v-btn 
                    elevation="2"
                    color="red"
                    style="color:white"  
                    @click="deleteBookConfirm"
                  >Excluir
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Botões de edição/exclusão de livro -->
        <template v-slot:item.actions="{ item }">    
          <v-icon
            small
            class="mr-2"
            @click="openEditBook(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="openDialogDeleteBook(item)"
          >
            mdi-delete
          </v-icon>
        </template>

        <!-- Tabela de listagem de livros / linha expandida -->
        <template v-slot:expanded-item="{ headers, item }">
          <td 
            :colspan="headers.length"
            style="background-color: #363636; color:white;"  
          >
            <p></p>
            <p class="ml-5"><b>Descrição: </b>{{ item.overview }}</p>
            <p class="ml-5"><b>Idioma: </b>{{ item.language }}</p>
            <p class="ml-5"><b>Páginas: </b>{{ item.pages }}</p>
            <p class="ml-5"><b>Está emprestado: </b>{{ item.isAvailable ? 'Não' : 'Sim' }}</p>
          </td>
        </template>

        <!-- Tabela de listagem de livros / sem livros cadastrados -->
        <template v-slot:no-data>
          <v-container>
            <v-row >
              Você não possui livros cadastrados.
            </v-row>
          </v-container>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ls from 'local-storage'

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'Título',
          align: 'start',
          value: 'title',
        },
        { text: 'Autor(a)', value: 'author' },
        { text: 'Categoria', value: 'category' },
        { text: 'Editora', value: 'publisher' },
        { text: 'Edição', value: 'edition' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],

      userBooks:[],

      editedBook: {
        id: '',
        ownerId: '',
        author: '',
        category: '',
        edition: '',
        isAvailable: '',
        language: '',
        overview: '',
        pages: '',
        publisher: '',
        title: ''
      },

      defaultBook: {
        id: '',
        ownerId: '',
        author: '',
        category: '',
        edition: '',
        isAvailable: '',
        language: '',
        overview: '',
        pages: '',
        publisher: '',
        title: ''
      },
    }),

    async beforeMount() {
      await this.setBooks()
      this.setUserBooks()
    }, 

    computed: {
      formTitle () {
        return this.editedBook.id > 0 ? 'Editar Livro' : 'Cadastrar Livro'
      },

      ...mapGetters({
        books: 'books/getBooks',
        bookById: 'books/getBookById',       

      }),

    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },


    methods: {
      ...mapActions({
        setBooks: 'books/setBooks',
        saveBook: 'books/saveBook',
        editBook: 'books/editBook',
        deleteBook: 'books/deleteBook',
      }),

      setUserBooks(){
        let userLS = ls.get('currentUser')
        this.userBooks = this.books
          .filter(book => book.ownerId === userLS.id)
      },

      openEditBook (book) {
        this.editedBook = book
        this.dialog = true
      },

      async addEditBook() {
        if(this.editedBook.id){
          try {
            await this.editBook(this.editedBook)
          }catch (fail) {
            console.log(fail)
          }
        } else {
            try {
              let userLS = ls.get('currentUser')
              this.editedBook.ownerId = userLS.id
              await this.saveBook(this.editedBook)
            }catch (fail) {
              console.log(fail)
            }
        }
        this.setUserBooks()
        this.dialog = false
      }, 
      
      openDialogDeleteBook (book) {
        this.editedBook = book
        this.dialogDelete = true
      },

      async deleteBookConfirm () {
        try{
          await this.deleteBook(this.editedBook)
        } catch(fail){
          console.log(fail)
        }
        this.setUserBooks()
        this.closeDelete()
      },
      
      closeDelete () {
        this.dialog = !this.dialog
        this.dialogDelete = false
        this.editedBook = this.defaultBook
      },

      close () {
        this.dialog = false
        this.editedBook = this.defaultBook
      },
      
    },

  }
</script>

<style>

</style>
