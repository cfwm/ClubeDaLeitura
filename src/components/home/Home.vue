<template>
    <v-container class="d-flex flex-column align-center">
        <h1 class="">Clube da Leitura</h1>
        <h3>Bem vindo ao Clube da Leitura!</h3>
        <p>
            Este espaço é destinado a maiores informações sobre o Clube da Leitura. 
        </p> 
        <router-view name="Menu"/>
    </v-container>
</template>

<script>

export default {
    name: 'Home',
}
</script>

<style>

</style>