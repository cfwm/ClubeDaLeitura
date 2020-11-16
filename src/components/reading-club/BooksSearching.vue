<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="books"
      item-key="title"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      
      <template v-slot:top>
        
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>

       <template v-slot:item.actions="{ item }">    
        <v-dialog
        v-model="dialogSeeBook" max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-icon
          small
          class="mr-2"
          v-bind="attrs"
          v-on="on"
          @click="seeBook(item)"
        >
          mdi-magnify-plus-outline 
        </v-icon>
        </template>
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
        </v-dialog>
        <v-icon
          small
          @click="sendSolicitation(item)"
        >
          mdi-bell-plus
        </v-icon>
      </template>

      
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialogSeeBook: false,
        search: '',
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
    computed: {
      headers () {
        return [
          {
            text: 'Título',
            align: 'start',
            sortable: false,
            value: 'title',
            filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            },
          },  
          { text: 'Autor(a)', value: 'author' },
          { text: 'Categoria', value: 'category' },
          { text: 'Editora', value: 'publisher' },
          { text: 'Edição', value: 'edition' },
          { text: 'Ações', value: 'actions', sortable: false },
        ]
      },
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

      filterOnlyCapsText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toUpperCase().toLocaleUpperCase().indexOf(search) !== -1
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