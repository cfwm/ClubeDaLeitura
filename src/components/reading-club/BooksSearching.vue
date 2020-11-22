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
        :sort-by="['author', 'category']"
        :sort-desc="[false, true]"  
        multi-sort
      >
        <template v-slot:item.actions="{ item }">    
          <v-icon
            small
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="seeBook(item)"
          >
            mdi-magnify-plus-outline 
          </v-icon>
          <v-icon
            small
            @click="sendSolicitation(item)"
          >
            mdi-bell-plus
          </v-icon>
        </template>

          <!-- Arrumar esse modal -->
          <v-dialog
            v-model="dialogSeeBook" max-width="500px"
          >
            <template v-slot:activator="{  }">
              <v-card>
                <v-row>
                  <p>{{selectedBook.title}}</p>
                </v-row>
                <v-row>
                  <p>{{selectedBook.author}}</p>
                </v-row>
                <v-row>
                  <p>{{selectedBook.overview}}</p>
                </v-row>
                <v-row>
                  <p>{{selectedBook.category}}</p>
                </v-row>
                <v-row>
                  <p>{{selectedBook.publisher}}</p>
                </v-row>
                <v-row>
                  <p>{{selectedBook.edition}}</p>
                </v-row>             
                <v-row>
                  <p>{{selectedBook.language}}</p>
                </v-row>
                <v-row>
                  <p>{{selectedBook.pages}}</p>
                </v-row>
                <v-card-actions>
                  <v-btn
                    elevation="2"
                    color="purple"
                    style="color:white"
                    @click="closeDialogSeeBook()"
                  >
                  </v-btn>
                  <v-btn
                    elevation="2"
                    color="green"
                    style="color:white"
                    @click="sendSolicitation()"
                  >
                  </v-btn>
                </v-card-actions>
              </v-card>

            </template>
        
          </v-dialog>
        
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
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
        
        calories: '',
        books: [],
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
      }
    },

    mounted() {
      this.getBooks()
    },
    
    methods: {
      async getBooks() {
        try {
          this.books = []
          await this.$http.get('books')
            .then(res => { this.books = res.data })
        } catch(fail) {
          console.error(fail)
        }
      },

      seeBook(book) {
        console.log('VER LIVRO', this.selectedBook)
        this.selectedBookIndex = this.books.indexOf(book)
        this.selectedBook = Object.assign({}, book)
        this.dialogSeeBook = true
      },

      closeDialogSeeBook() {
        this.selectedBook = Object.assign({}, this.defaultBook)
        this.selectedBookIndex = -1
        this.dialogSeeBook = false
      }
    },

    
  }
</script>

<style>

</style>