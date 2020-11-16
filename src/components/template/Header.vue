<template>
    <header class="header">
        <a class="toggle">
            <i></i>
        </a>
        <h1 class="title">
            {{ title }}
        </h1>
        <v-btn
            @click="'logout'"
        >Logout
        </v-btn>
    </header>    
</template>

<script>
export default {
    //name: 'Header',
    props: {
        title: String,
        hideToggle: Boolean
    },
    computed: {
        icon() {
            return "fa-angle-left"
        }
    },
    methods: {
        logout() {
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background:linear-gradient(to right, #1e469a, #49a7c1);


        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>