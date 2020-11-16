<template>
    <v-app-bar app class="d-flex justify-center">
       <v-col class="">
         <v-toolbar-title>Clube da Leitura </v-toolbar-title>
       </v-col>
       <!-- <span class="font-weight-light">Catálogo de livros e gerenciador de empréstimos</span> -->
      <v-col>
        <v-btn
        icon
        @click="logout"
      >
         <v-icon
         >{{ logoutIcon }}
       </v-icon>
      </v-btn>
      </v-col>
    </v-app-bar>
</template>

<script>


export default {
  name: 'AppBar',
  props: {validatingToken: [Boolean]},
  data() {
    return {
      logoutIcon: 'mdi-logout-variant',
    }
  },
  methods: {
    logout() {
      //localStorage.removeItem(userKey)
      this.validatingToken = false
      this.$emit('validatingTokenChange', this.validatingToken)
      this.$router.push({name: 'login'})
    }
  }

}
</script>

<style>

</style>