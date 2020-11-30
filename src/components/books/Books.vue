<template>
  <v-container>
    <v-card elevation="15" width="250%">
      <!-- Tabela listagem de livros -->
      <v-data-table
        :headers="headers"
        :items="books"
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
            <!-- <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider> -->
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
                        @click="addBook()"
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
                <v-card-actions>
                  <v-spacer></v-spacer>
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
                <v-spacer></v-spacer>
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
            @click="editBook(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteBook(item)"
          >
            mdi-delete
          </v-icon>
        </template>

        <!-- Tabela de listagem de livros / linha expandida -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <p></p>
            <p class="ml-15 pl-15"><b>Descrição: </b>{{ item.overview }}</p>
            <p class="ml-15 pl-15"><b>Idioma: </b>{{ item.language }}</p>
            <p class="ml-15 pl-15"><b>Páginas: </b>{{ item.pages }}</p>
          </td>
        </template>

        <!-- Tabela de listagem de livros / sem livros cadastrados -->
        <template v-slot:no-data>
          <!-- <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn> -->
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
          sortable: false,
          value: 'title',
        },
        { text: 'Autor(a)', value: 'author' },
        { text: 'Categoria', value: 'category' },
        { text: 'Editora', value: 'publisher' },
        { text: 'Edição', value: 'edition' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      //books: [],
      editedBookIndex: -1,
      editedBook: {
        //availability: '',
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
        //availability: '',
        author: '',
        category: '',
        edition: '',
        language: '',
        overview:'',
        pages:'',
        publisher: '',
        title: ''
      },
      //isNewBook: false,
    }),

    async created() {
      await this.getBooks()
      console.log('created books', await this.books)
      //console.log('created book id 1',await this.bookById(1))
      console.log('books.length', this.books.length)

    }, 

    computed: {
      formTitle () {
        return this.editedBookIndex === -1 ? 'Novo Livro' : 'Editar Livro'
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
        getBooks: 'books/getBooks',
        saveBook: 'books/saveBook'  
      }),


      editBook (book) {
        this.editedBookIndex = this.books.indexOf(book)
        this.editedBook = Object.assign({}, book)
        this.dialog = true
      },

      async addBook() {
        try {
          if (this.editedBookIndex > -1) {
           //Object.assign(this.books[this.editedBookIndex], this.editedBook)
          } else {
            //this.editedBook.id = this.books.length++
            await this.saveBook(this.editedBook)
            console.log('ret editedBook', this.editedBook)
            //this.books.push(this.editedBook)
          }
        }catch (fail) {
          console.log(fail)
        }
        await this.getBooks()
        this.dialog = false
      }, 
      
      // async getBooks() {
      //   try {
      //     this.books = []
      //     await this.$http.get('books')
      //       .then(res => { this.books = res.data })
      //   } catch(fail) {
      //     console.error(fail)
      //   }
      // },
      
      

      // async saveBook () {
      //   try{
      //     const metodo = this.isNewBook === true ? 'post' : 'patch'
      //     const finalUrl = this.isNewBook === true ? `/${this.books.length}` : `/${this.editedBookIndex}` 
      //     await this.$http[metodo](`/books${finalUrl}`, this.editedBook)
      //     this.isNewBook = false
      //     //await this.$http[metodo](`/books`, this.books)
      //   }catch(fail){
      //     console.log(fail)
      //   }
      // },

      // addBook() {
      //   const newBook = {
      //     title = this.title,
      //     author = this.author,
      //     category = this.category,
      //     publisher = this.publisher,
      //     edition = this.edition,
      //     overview = this.overview,
      //     language = this.language,
      //     pages = this.pages
      //   }
      // },

      // editBook (book) {
      //   console.log('ret books', this.books)
      //   console.log('ret book', book)
      //   this.editedBookIndex = this.books.indexOf(book)
      //   this.editedBook = Object.assign({}, book)
      //   this.dialog = true
      // },
      
      deleteBook (book) {
        this.editedBookIndex = this.books.indexOf(book)
        this.editedBook = Object.assign({}, book)
        this.dialogDelete = true
      },

      async deleteBookConfirm () {
        this.books.splice(this.editedBookIndex, 1)
        await this.saveBook()
        this.closeDelete()
      },
      
      closeDelete () {
        this.dialog = !this.dialog
        this.dialogDelete = false
        this.editedBook = Object.assign({}, this.defaultBook)
        this.editedBookIndex = -1
      },

      close () {
        this.dialog = false
        this.editedBook = Object.assign({}, this.defaultBook)
        this.editedBookIndex = -1
      },
      
    },

  }
</script>

<style>

</style>
