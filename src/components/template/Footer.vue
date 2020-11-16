<template>
    <v-footer class="pa-3 footer" app>
        <v-spacer></v-spacer>
        <div>Clube da Leitura &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>

<script>


export default {
    name:'Footer'
}
</script>

<style>
    .footer {
        background-color :#c3c3;
        color: #333;

        
    }
</style>