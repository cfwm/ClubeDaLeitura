<template>
    <v-app>
      <AppBar />
      <Menu />
      <Content />
      <Footer />
    </v-app>
</template>

<script>
import AppBar from '@/components/template/AppBar.vue'
import Menu from '@/components/template/Menu.vue'
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'
export default {
  components: {
    AppBar, Menu, Content, Footer  
  }
}
</script>

<style>

</style>
