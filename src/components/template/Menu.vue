<template>
  <v-card>
    <v-navigation-drawer 
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      dark
      hide-overlay
    >
      <v-list-item class="px-2">
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon v-if="mini">mdi-chevron-down</v-icon>
          <v-icon v-if="!mini">mdi-chevron-left</v-icon>
        </v-btn>
        <v-list-item-title
          v-if="mini === false"
          class="ml-7"
        >
          {{ currentUser.username }}
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>     
      
      <v-list dense class="pt-0" nav>
        <v-list-item v-for="item in itemsMenu" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>     
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import ls from 'local-storage'

export default {
  name: 'Menu',
  data() {
    return {
      itemsMenu: [   
        {title: 'Sobre', icon: 'mdi-view-dashboard', link: '/home'},
        {title: 'Buscar livros', icon: 'mdi-cloud-search-outline', link: '/buscar-livros'},
        {title: 'Solicitações', icon: 'mdi-bell', link: '/solicitacoes'},
        {title: 'Meus dados', icon: 'mdi-card-account-details', link: '/meus-dados'},
        {title: 'Meus livros', icon: 'mdi-bookshelf', link: '/meus-livros'}
      ],
      mini: false,
      drawer: true,
      currentUser: {
        completeName:'',
        cpf:'',
        email:'',
        id:'',
        phone:'',
        username:''
      },
    }
  },

  async created() {
      this.getCurrentUser()
    },


  methods: {
    getCurrentUser() {
      this.currentUser = ls.get('currentUser')
    },
  }
}
</script>

<style>
  
</style>

