<script setup>
import Carousel from 'primevue/carousel';
import { ref,computed } from 'vue';
import ClickButtonCComponent from '@/share_components/ClickButtonCComponent.vue';
    const props=defineProps({
      shopId:Number
    });
    const shopId=props.shopId;
    //取得會員ID
    function getMemberID() {
    const cookies = document.cookie.split('; ');
    let memberID = '0'; // 默认值

    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === 'memberID') {
            memberID = value;
            break;
        }
    }
    return memberID;
  }
  const memberId=getMemberID();

  //URL
  const BaseUrl = import.meta.env.VITE_API_BASEURL;
  const APIUrl=`${BaseUrl}/ShopReviews`;

  //輪播斷點
  const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);


    //取得評論資料
    const reviews=ref([]);

    const loadReviews=async()=>{
      const response= await fetch(`${APIUrl}/ShopReviewsByShop/${shopId}`);
      if(response.ok){
        const data=await response.json();
        reviews.value=data;
       if(reviews.value.length<=0){
          showInfo.value=false;
       }else{
        showInfo.value=true;
       }
       console.log(showInfo.value)
      }
    }
    loadReviews();

    //顯示内容改變
    const showInfo=ref(true);

    //調整時間顯示格式的方法
    const formatScheduleTime = (GetTime) => {
        return GetTime.replace('T', ' ').split('.')[0];
    };
    //調整顯示文字長度
    const desc100 = (review) => {
    return review.length <= 90 ? review : review.substring(0, 90) + '...';
};

</script>

<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-12 tabs-header d-flex justify-content-between border-bottom my-5">
              <h3>婚友評價</h3>
              <RouterLink :to="{ name: 'writeReview', params: { id: shopId }} " style="text-decoration: none;">
              <v-btn class="mb-3"><i class="bi bi-chat-right-text"></i>&nbsp; 給評價</v-btn>
            </RouterLink>
            </div>
            <div class="row" v-if="showInfo==true">
              <Carousel :value="reviews" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
       <template #item="{data}">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4" style="height:350px;">
            <div class="mb-3">
                <div class="relative mx-auto">
                  <h5>{{ data.memberName }}</h5>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl lh-lg">{{ desc100(data.review) }}</div>
                <br>
                <div id="rateAndDateContain">
                  <div><small class="text-muted">曾在婚禮訂購過：{{ data.orderOrNot==true?'是':'否' }}</small></div>
                  <div><small class="text-muted">評價：{{ '⭐'.repeat(data.rate) + '✰'.repeat(5 - data.rate) }}</small></div>
                  <div class=""><small class="text-muted">評價日期：{{ formatScheduleTime(data.createdTime) }}</small></div>
                </div>
            </div>
        </div>
    </template>
</Carousel>
            </div>
            <div class="row" v-else>
              <h5>暫無評價，歡迎寫下你的評價~</h5>
            </div>
               <div class="col-12 col-md-12" style="position:relative; left: -100px;">
                <RouterLink :to="{ name: 'shopReview', params: { id: shopId }} " style="text-decoration: none;">
                  <ClickButtonCComponent>查看完整評價→</ClickButtonCComponent>
                </RouterLink>
               </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
  #rateAndDateContain{
    position: absolute;
    bottom:20px;
    width: 100%;
  }
</style>