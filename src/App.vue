<script setup>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    import 'jquery/dist/jquery.min.js'
import BudgetChartComponent from './components/BudgetChartComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
    <RouterView></RouterView>
    <BudgetChartComponent></BudgetChartComponent>
    <FooterComponent></FooterComponent>
</template>

<style scoped>

</style>
