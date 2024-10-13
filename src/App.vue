<script setup>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    import 'jquery/dist/jquery.min.js'
import BudgetPlanView from './views/BudgetPlanView.vue';
</script>

<template>
    <!-- <BudgetPlanView></BudgetPlanView> -->
    <RouterLink to="/budgetplan">圖表</RouterLink>
    <RouterView></RouterView>
</template>

<style scoped>

</style>
