<script setup>
import SampleComponent from '@/components/SampleComponent.vue';

//import FooterComponent from '@/components/FooterComponent.vue';
//import HeaderComponent from '@/components/HeaderComponent.vue';
//import SampleComponent from '@/components/SampleComponent.vue';

    
</script>

<template>
    <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
    
    <div class="container">
      
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <h2 class="mt-5">種類類表</h2>
            </div>
          </div>
        </div>    
  
        <div>
          <div class="category-carousel d-flex flex-wrap justify-content-around">
            <div class="col-sm-6  col-lg-3 mb-4">
              <RouterLink class="nav-link category-item text-center" :to="{name:'cake'}">
                <img src="../assets/images/icon-vegetables-broccoli.png" 
                     alt="Category Thumbnail" class="category-img img-fluid">
                <h3 class="category-title">婚宴會場</h3>
              </RouterLink>
            </div>
  
            <div class="col-sm-6  col-lg-3 mb-4">
              <RouterLink class="nav-link category-item text-center" :to="{name:'dish'}">
                <img src="../assets/images/icon-vegetables-broccoli.png" 
                     alt="Category Thumbnail" class="category-img img-fluid">
                <h3 class="category-title">婚宴菜餚</h3>
              </RouterLink>
            </div>
  
            <div class="col-sm-6  col-lg-3 mb-4">
              <RouterLink class="nav-link category-item text-center" :to="{name:'car'}">
                <img src="../assets/images/icon-vegetables-broccoli.png" 
                     alt="Category Thumbnail" class="category-img img-fluid">
                <h3 class="category-title">婚宴禮車</h3>
              </RouterLink>
            </div>
  
            <div class="col-sm-6  col-lg-3 mb-4">
              <RouterLink class="nav-link category-item text-center" :to="{name:'cake'}">
                <img src="../assets/images/icon-vegetables-broccoli.png" 
                     alt="Category Thumbnail" class="category-img img-fluid">
                <h3 class="category-title">送禮喜餅</h3>
              </RouterLink>
            </div>
          </div>
        </div>
      
    </div>
  
  </template>

<style lang="css" scoped>
@import '../assets/css/shop.css'; /*引用css文件*/

</style>
  