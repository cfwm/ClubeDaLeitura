<template>
  <v-card>
    <v-navigation-drawer 
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      dark
    >
      <v-list-item class="px-2">
        <!-- <v-list-item-avatar>
          <v-img src=""></v-img>
        </v-list-item-avatar>
         <v-list-item-title>{{ user.username }}</v-list-item-title> -->

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon v-if="mini">mdi-chevron-down</v-icon>
          <v-icon v-if="!mini">mdi-chevron-left</v-icon>
        </v-btn>
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

export default {
    data() {
        return {
            itemsMenu: [
                {title: 'Sobre', icon: 'mdi-view-dashboard', link: '/sobre'},
                {title: 'Meus dados', icon: 'mdi-card-account-details', link: '/usuario'},
                {title: 'Meus livros', icon: 'mdi-bookshelf', link: '/livros'},
                {title: 'Clube da leitura', icon: 'mdi-arrange-bring-to-front', link: '/clube-da-leitura'}
            ],
            mini: true,
            drawer: true,
        }
  }
}
</script>

<style>

</style>