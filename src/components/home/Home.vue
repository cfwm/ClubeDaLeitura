<template>
    <v-container>
        <v-card elevation="15" width="250%">
            <v-card-title class="d-flex justify-center">
                <h3>Bem vindo ao Clube da Leitura!</h3>
            </v-card-title>
            <v-card-text>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>
                        É uma enorme satisfação tê-lo conosco! 
                        Esperamos que desfrute ao máximo dos recursos oferecidos pelo Clube do Livro. 
                        Abaixo estão descritas as principais funcionalidades do sistema e onde se encontram.
                    </p>
                </v-row>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>
                        O menu do lado esquerdo da tela dá acesso as funcionalidades do sistema 
                        e no canto superior direito está localizado o botão para a realização do logout.
                    </p> 
                </v-row>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>Na página "Buscar livros" estão listados todos os livros cadastrados no sistema e
                    disponíveis para empréstimo. Este é o lugar para pedir livro emprestado.</p> 
                </v-row>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>
                        Em "Solicitações" há um painel que permite o acompanhamento e gerenciamento
                        de todos seus pedidos de empréstimo de livro.
                    </p> 
                </v-row>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>
                        No item "Meus dados" estão listadas as informações de cadastro do usuário e está presente um botão para a alteração dessas informações.
                    </p> 
                </v-row>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>
                        E em "Meus livros" ficam todos os livros, e suas respetivas informações, cadastrados pelo usuário. 
                        É aqui onde estão disponíveis os recursos para cadastro e edição de livros.
                    </p> 
                </v-row>
                <v-row class="d-flex justify-start ml-5 mr-5">
                    <p>
                        Quando uma solicitação de empréstimo é aceita, o dono do livro que será emprestado tem acesso aos informações de contato do usuário solicitante
                        para que possa contatá-lo e, assim, combinarem alguma forma de entrega do livro. 
                    </p> 
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default {
    name: 'Home',
}
</script>

<style>

</style>