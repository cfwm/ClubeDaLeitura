<template>
    <v-app>
      <Toolbar />
      <Menu />
      <Footer />
    </v-app>
</template>

<script>
import Toolbar from '@/components/template/Toolbar.vue'
import Menu from '@/components/template/Menu.vue'
import Footer from '@/components/template/Footer.vue'
export default {
  components: {
    Toolbar, Menu, Footer  
  }
}
</script>

<style>

</style>
