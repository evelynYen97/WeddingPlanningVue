<script setup>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    import 'jquery/dist/jquery.min.js'
import ClickButtonAComponent from './components/ClickButtonAComponent.vue';
</script>

<template>
    <RouterLink to="/budgetplan">圖表</RouterLink>
    <RouterView></RouterView>
    <ClickButtonAComponent></ClickButtonAComponent>
</template>

<style scoped>

</style>
