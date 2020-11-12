<template>
    <v-app dark>
      <AppBar />
      <Menu />
      <Content />
      <Footer />
      <Login />
      
    </v-app>
</template>

<script>
import AppBar from '@/components/template/AppBar.vue'
import Menu from '@/components/template/Menu.vue'
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'
import Login from '@/components/admin/Login'

export default {
  components: {
    AppBar, Menu, Content, Footer, Login  
  }
}
</script>

<style>

</style>
