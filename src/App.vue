<script setup>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    import 'jquery/dist/jquery.min.js'
import CircleButtonComponent from './components/CircleButtonComponent.vue';
</script>

<template>
    <RouterLink to="/budgetplan">圖表</RouterLink>
    <RouterView></RouterView>
    <CircleButtonComponent></CircleButtonComponent>
</template>

<style scoped>

</style>
