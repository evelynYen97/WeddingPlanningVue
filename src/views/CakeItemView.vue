<script setup>
import SampleComponent from '@/components/SampleComponent.vue';

import { ref } from 'vue';
import { useRoute } from 'vue-router'; 

const route = useRoute();
const cakeID = route.params.id; 
const cake = ref([]);  //用於儲存喜餅詳細資料

const initializeFunction = async () => {
  try {
    const response = await fetch(`https://localhost:7048/api/Cakes/${cakeID}`);
    cake.value = await response.json();
    console.log(cake.value);
  } 
  catch (error) {
    console.error('載入失敗:', error);
  }
};

initializeFunction();

</script>

<template>
    <div>
      <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>

        <section id="latest-blog" class="py-5">
    <div class="container-fluid">
      <div>
        <div class="section-header d-flex align-items-center justify-content-between my-5">
          <div class="btn-wrap align-right">
          </div>
        </div>
      </div>

          <nav style="--bs-breadcrumb-divider: '>>';" aria-label="breadcrumb">
            <ol class="breadcrumb ">
              <li class="breadcrumb-item "><RouterLink :to="{name:'cake'}">喜餅列表</RouterLink></li>
              <li class="breadcrumb-item active" aria-current="page">{{ cake.cakeName }}</li>
            </ol>
          </nav>

      <div class="row">
        <div class="col-lg-6 col-md-12" >
          <article class="post-item card border-0 shadow-sm p-3">
            <div class="image-holder zoom-effect">
              <a href="#">
                <img :src="`https://localhost:7162/cakesImg/${cake.cakeImg}`" alt="post" class="card-img-top">
              </a> 
            </div>
            <div class="card-body">
              <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
              </div>
            </div>
          </article>
        </div>
        
        <div class="col-lg-6 col-md-12" >
          <article class="post-item card border-0 shadow-sm p-3">
            <div class="image-holder zoom-effect">
            </div>
            <div class="card-body">
              <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
              </div>
              <div class="post-header">
                <h2 class="post-title">
                  <a href="#" class="text-decoration-none">名稱：{{ cake.cakeName }}</a>
                </h2>
                <br>
                <br>
                <div class="post-header">
                <h5>{{ cake.cakeDescription }}</h5>
                </div>
                <br>
                <br>
                <br>
                <h3>內容物：</h3>
                <h4>{{ cake.cakeContent }}</h4>
                <br>
                <h3>過敏原資訊：</h3>
                <h4>{{ cake.allergenInfo }}</h4>      
                <br>         
              </div>
            

            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

    </div>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css'; /* 引用 CSS 文件 */

</style>