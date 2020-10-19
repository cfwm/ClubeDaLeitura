<template>
    <v-navigation-drawer app>
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                  Clube da Leitura - logo
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense class="pt-0">
          <v-list-item v-for="iten in itensMenu" :key="iten.title">
            <v-list-item-icon>
              <v-icon>{{ iten.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ iten.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
    data() {
        return {
            itensMenu: [
                {title: 'Início', icon: 'mdi-view-dashboard'},
                {title: 'Sobre', icon: 'mdi-forum'},
                {title: 'Meus dados', icon: 'mdi:card-account-details'},
                {title: 'Meus livros', icon: 'mdi-bookshelf'},
                {title: 'Clube da leitura'}
            ],
        }
  }
}
</script>

<style>

</style>