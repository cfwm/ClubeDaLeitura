<template>
  <v-card>
    <v-navigation-drawer app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      
      <!-- <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
                Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar> -->
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
      
      <v-list dense class="pt-0" >
        <v-list-item v-for="item in itemsMenu" :key="item.title">
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
                {title: 'Sobre', icon: 'mdi-view-dashboard'},
                {title: 'Meus dados', icon: 'mdi-card-account-details'},
                {title: 'Meus livros', icon: 'mdi-bookshelf'},
                {title: 'Clube da leitura', icon: "mdi-arrange-bring-to-front"}
            ],
            mini: true,
            drawer: true,
        }
  }
}
</script>

<style>

</style>