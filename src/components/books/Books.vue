<template>
  <v-container>
      <!-- Tabela listagem de livros -->
  <v-data-table
    :headers="headers"
    :items="books"
    sort-by="title"
    class="elevation-1"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="title"

  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Meus Livros</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Novo Livro
            </v-btn>
          </template>

           <!-- Formulário de criação/edição de livro -->
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.title"
                      label="Título"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.author"
                      label="Autor"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.category"
                      label="Categoria"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.publisher"
                      label="Editora"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.edition"
                      label="Edição"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.overview"
                      label="Resumo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.language"
                      label="Idioma"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBook.pages"
                      label="Páginas"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            
            <!-- Botões do formulário de criação/edição de livro -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="addBook"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Janela de confirmação de exclusão de livros -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card> 
            <v-card-title class="headline">Você quer mesmo excluir  da sua estante?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteBookConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- Botões de edição/exclusão de livro -->
    <template v-slot:item.actions="{ book }">    
      <v-icon
        small
        class="mr-2"
        @click="editBook(book)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteBook(book)"
      >
        mdi-delete
      </v-icon>
    </template>

    <!-- Tabela de listagem de livros / linha expandida -->
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <p></p>
        <p><b>Descrição: </b>{{ item.overview }}</p>
        <p><b>Idioma: </b>{{ item.language }}</p>
        <p><b>Páginas: </b>{{ item.pages }}</p>
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
  </v-container>
</template>

<script>
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
      books: [],
      editedIndex: -1,
      editedBook: {
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
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Livro' : 'Editar Livro'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created() {
      this.getBooks()
    },

    methods: {
      
      editBook (book) {
        console.log('ret book', book)
        this.editedIndex = this.books.indexOf(book)
        this.editedBook = Object.assign({}, book)
        this.dialog = true
      },

      deleteBook (book) {
        this.editedIndex = this.books.indexOf(book)
        this.editedBook = Object.assign({}, book)
        this.dialogDelete = true
      },

      deleteBookConfirm () {
        this.books.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedBook = Object.assign({}, this.defaultBook)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedBook = Object.assign({}, this.defaultBook)
          this.editedIndex = -1
        })
      },

      // saveBook () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.books[this.editedIndex], this.editedBook)
      //   } else {
      //     this.books.push(this.editedBook)
      //   }
      //   this.close()
      // },
      async addBook() {
        try {
          if (this.editedIndex > -1) {
           Object.assign(this.books[this.editedIndex], this.editedBook)
          } else {
            console.log(typeof this.editedBook)
            this.books.push(this.editedBook)
          }
          await this.saveBook()
        }catch (fail) {
          console.log(fail)
        }
      }, 

      async saveBook () {
        try{
          console.log('ret editedIndex', this.editedIndex)
          const metodo = this.editedIndex === -1 ? 'post' : 'patch'
          const finalUrl = this.editedIndex === -1 ? `/${this.books.length + 1}` : `/${this.editedIndex}` 
          await this.$http[metodo](`/books${finalUrl}`, this.editedBook)
          this.cleanInputs()
          this.close()
        }catch(e){
          console.log(e)
        }
      },

      async getBooks() {
        await this.$http('books')
        .then(res => { this.books = res.data })
        console.log(this.books)
      },
      
      cleanInputs(){
        this.editedBook = this.defaultBook
      },
    },

  }
</script>

<style>

</style>
