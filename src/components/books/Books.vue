<template>
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
                      v-model="editedBook.name"
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
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card> 
            <v-card-title class="headline">Você quer mesmo excluir {{ books.title }} da sua estante?</v-card-title>
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

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <p></p>
        <p><b>Descrição: </b>{{ item.overview }}</p>
        <p><b>Idioma: </b>{{ item.language }}</p>
        <p><b>Páginas: </b>{{ item.pages }}</p>
      </td>
    </template>

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
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      books: [],
      editedIndex: -1,
      editedBook: {
        title: '',
        author: '',
        category: '',
        publisher: '',
        edition: '',
        overview:'',
        language: '',
        pages:'',
      },
      defaultItem: {
        title: '',
        author: '',
        category: '',
        publisher: '',
        edition: '',
        overview:'',
        language: '',
        pages:'',
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

    beforeCreated () {
      //this.initialize()
      this.getBooks()
    },

    methods: {
      // initialize () {
      //   this.books = [
      //     {
      //       title: 'Título do livro 01',
      //       author: 'Autor 01',
      //       category: 'Ficção científica',
      //       publisher: 'Boitempo',
      //       edition: 1,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Português',
      //       pages: 184,
      //     },
      //     {
      //       title: 'Título do livro 02',
      //       author: 'Autor 02',
      //       category: 'Sociologia',
      //       publisher: 'Companhia das Letras',
      //       edition: 1,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Português',
      //       pages: 524,
      //     },
      //     {
      //       title: 'Título do livro 03',
      //       author: 'Autor  03',
      //       category: 'Antropologia',
      //       publisher: 'Martin Claret',
      //       edition: 2,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Português',
      //       pages: 359,
      //     },
      //     {
      //       title: 'Título do livro 04',
      //       author: 'Autor  04',
      //       category: 'Ciência Política',
      //       publisher: 'Cosac Naify',
      //       edition: 2,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Inglês',
      //       pages: 158,
      //     },
      //     {
      //       title: 'Título do livro 05',
      //       author: 'Autor 05',
      //       category: 'Teoria de Sistemas',
      //       publisher: 'Cosac Naify',
      //       edition: 3,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Inglês',
      //       pages: 684,
      //     },
      //     {
      //       title: 'Título do livro 06',
      //       author: 'Autor 06',
      //       category: "Probabilidade",
      //       publisher: 'Martin Claret',
      //       edition: 3,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Espanhol',
      //       pages: 408,
      //     },
      //     {
      //       title: 'Título do livro 07',
      //       author: 'Autor 07',
      //       category: 'Algoritmos',
      //       publisher: 'Companhia das Letras',
      //       edition: 4,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Espanhol',
      //       pages: 197,
      //     },
      //     {
      //       title: 'Título do livro 08',
      //       author: 'Autor 08',
      //       category: 'Banco de Dados',
      //       publisher: 'Boitempo',
      //       edition: 10,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Português',
      //       pages: 298,
      //     },
      //     {
      //       title: 'Título do livro 09',
      //       author: 'Autor 09',
      //       category: 'Programação Web',
      //       publisher: 'Boitempo',
      //       edition: 5,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Português',
      //       pages: 350,
      //     },
      //     {
      //       title: 'Título do livro 10',
      //       author: 'Autor 10',
      //       category: 'Literatura',
      //       publisher: 'Companhia das Letras',
      //       edition: 7,
      //       overview:'Esta é uma breve descrição do LIVRO XXXXX.',
      //       language: 'Inglês',
      //       pages: 209,
      //     },
      //   ]
      // },

      editBook (book) {
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
          this.editedBook = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedBook = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.books[this.editedIndex], this.editedBook)
      //   } else {
      //     this.books.push(this.editedBook)
      //   }
      //   this.close()
      // },
      async save () {
        
        try{
          const metodo = this.id ? 'patch' : 'post'
          const finalUrl = this.id ? `/${this.id}.json` : '.json'
          // if (this.editedIndex > -1) {
          //  Object.assign(this.books[this.editedIndex], this.editedBook)
          // } else {
          //   this.books.push(this.editedBook)
          // }
          await this.$http[metodo](`/books${finalUrl}`, this.editedBook)
          //this.cleanInputs()
          this.close()
        }catch(e){
          console.log(e)
        }
      },

      async getBooks() {
        await this.$http('books.json').then(resp => {
          this.books = resp.data
        })
      },
      
      cleanInputs(){
        this.title = ''
        this.author = ''
        this.category = ''
        this.publisher = ''
        this.edition = ''
        this.overview = ''
        this.language = ''
        this.pages = ''
      },
    },

    

  }

  // title: '',
  // author: '',
  // category: '',
  // publisher: '',
  // edition: '',
  // overview:'',
  // language: '',
  // pages:'',

</script>

<style>

</style>
