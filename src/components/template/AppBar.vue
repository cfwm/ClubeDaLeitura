<template>
  <v-container>
    <v-app-bar app>
      <v-col></v-col>
      <v-col class="d-flex justify-center">
        <v-toolbar-title><h2>Clube da Leitura</h2></v-toolbar-title>
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
import ls from 'local-storage'

export default {
  name: 'AppBar',
  props: {validatingToken: [Boolean]},
  data() {
    return {
      logoutIcon: 'mdi-logout-variant',
    }
  },

  watch: {
    validatingToken() {
          this.validatingToken=!this.validatingToken
      }
  },

  methods: {
    logout() {
      ls.remove('currentUser')
      this.validatingToken = false
      this.$emit('validatingTokenChange', this.validatingToken)
      this.$router.push({name: 'login'})
    }
  }

}
</script>

<style>

</style>