<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
    import 'bootstrap-icons/font/bootstrap-icons.min.css'

import 'jquery/dist/jquery.min.js'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import HeaderComponent from './components/HeaderComponent.vue'
import SampleComponent from './components/SampleComponent.vue'
import FooterComponent from './components/FooterComponent.vue'


    


</script>

<template>
    <BudgetPlanView></BudgetPlanView>
    <RouterView></RouterView>
    <BudgetChartComponent></BudgetChartComponent>
    <div id="footerTop"></div>
    <FooterComponent></FooterComponent>

</template>










<style scoped>
#footerTop{
    height: 200px;
}
</style>
