<template>
    <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid class="d-flex justify-center align-center">
            <div>
                <!-- <About v-if="display === 'About'"/>
                <Books v-if="display === 'Books'"/> -->
                <!-- <ReadingClub v-else-if="display === 'ReadingClub'"/> -->
                <!-- <User v-else-if="display === 'User'"/> -->
            </div>
        <!-- If using vue-router -->
        <router-view></router-view> 
    </v-container>
    </v-main>   
</template>

<script>
// import About from '@/components/system/About.vue'
// import Books from '@/components/books/Books.vue'
// import User from '@/components/user/User.vue'

export default {
    // components: {
    //     About, Books, User
    // },
    // data() {
    //     return {
    //         display: 'Books',
    //     }
    // }
    
}
</script>

<style>
    
</style>