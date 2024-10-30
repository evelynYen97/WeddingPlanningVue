<script setup>
import { ref } from 'vue';

    const reviews=ref([
        { id: 1, merchantName: '商家名稱 1', text: '這家商家的服務非常好，工作人員熱情友好。', rating: 5 },
        { id: 2, merchantName: '商家名稱 2', text: '產品質量優良，值得推薦。', rating: 4 },
        { id: 3, merchantName: '商家名稱 3', text: '價格實惠，服務態度一流。', rating: 5 },
        { id: 4, merchantName: '商家名稱 3', text: '價格實惠，服務態度一流。', rating: 5 },
        { id: 5, merchantName: '商家名稱 3', text: '價格實惠，服務態度一流。', rating: 5 },
        { id: 6, merchantName: '商家名稱 3', text: '價格實惠，服務態度一流。', rating: 4 },
      ])
</script>

<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-12 tabs-header d-flex justify-content-between border-bottom my-5">
              <h3>婚友評價</h3>
            </div>
            <div class="row">
                <div class="col-12 col-md-4"></div>
              <div class="col-md-8" v-for="review in reviews" :key="review.id">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{{ review.merchantName }}</h5>
                    <p class="card-text">{{ review.text }}</p>
                    <p class="card-text"><img src="@/assets/images/weddingPlanImg/wed1.jpg" alt=""></p>
                    <p class="card-text"><small class="text-muted">評價：{{ '⭐'.repeat(review.rating) + '✰'.repeat(5 - review.rating) }}</small></p>
                  </div>
                </div>
            </div>
         </div>
               <div class="text-center my-4">
                 <button class="btn btn-primary">查看更多評價</button>
               </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>