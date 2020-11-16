<template>
    <v-app id="app">
      <div v-if="validatingToken === false">
        <Login
          :validatingToken="validatingToken"
          @validatingTokenChange="validatingToken = $event"
        />
      </div>
      <div v-else>
        <AppBar 
          :validatingToken="validatingToken"
          @validatingTokenChange="validatingToken = $event"
        />
        <Content />
        <Menu />
        <Footer />
      </div>      
</v-app>
</template>

<script>
import Login from '@/components/login/Login'
import AppBar from '@/components/template/AppBar'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import Menu from '@/components/template/Menu'

export default {
  name: 'App',
  components: {
      Login, AppBar, Content, Footer, Menu
  },
  // computed: {
  //   template() {
      
  //   }
  // },
  data() {
    return {
      validatingToken: false
      //validatingToken deve fazer a validação de usuário e armazenar a resposta em userKey no localStorage
    }
  }
}
</script>

<style>
/* * {
    font-family: "Roboto", sans-serif;
  } */
</style>
