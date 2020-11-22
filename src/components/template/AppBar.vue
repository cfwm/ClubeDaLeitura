<template>
  <v-container>
    <v-app-bar app>
      <v-col></v-col>
      <v-col class="d-flex justify-center">
        <v-toolbar-title>Clube da Leitura</v-toolbar-title>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn 
          icon
          @click="logout"
        ><v-icon>mdi-export</v-icon>
        </v-btn>
      </v-col>
    </v-app-bar>
  </v-container>
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