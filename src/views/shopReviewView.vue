<script setup>
    import SampleComponent from '@/components/SampleComponent.vue';
import CircleButtonComponent from '@/share_components/CircleButtonComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
//URL
const BaseUrl=import.meta.env.VITE_API_BASEURL;
const APIUrl=`${BaseUrl}/ShopReviews`;

//取得當前會員編號
function getMemberID() {
    const cookies = document.cookie.split('; ');
    let memberID=0;
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === 'memberID') {
            memberID = value;
            break;
        }
    }
    return memberID;
}
const memberId = getMemberID();

//評論數據
const reviews=ref([
    { id: 1, merchantName: '會員 1', text: '這家商家的服務非常好，工作人員熱情友好。', rating: 5 },
    { id: 2, merchantName: '會員 2', text: '產品質量優良，值得推薦。', rating: 4 },
    { id: 3, merchantName: '會員 3', text: '價格實惠，服務態度一流。', rating: 5 },
    { id: 4, merchantName: '會員 3', text: '價格實惠，服務態度一流。', rating: 5 },
    { id: 5, merchantName: '會員 3', text: '價格實惠，服務態度一流。', rating: 5 },
    { id: 6, merchantName: '會員 3', text: '價格實惠，服務態度一流。', rating: 4 },
  ])
//顯示内容改變
const showInfo=ref(true);
const changeShowInfo=(review)=>{
    if(review<=0){
      showInfo.value=false;
    }
    else{
      showInfo.value=true;
    }
}

//取得商家資訊
const route=useRoute();
const shopId=route.params.id;
const shopInfo=ref({});
const loadShopInfo=async()=>{
  const response=await fetch(`${APIUrl}/ShopReviewsShopInfo/${shopId}`);
  if(response.ok){
    shopInfo.value=await response.json();
    changeShowInfo(shopInfo.value.reviewCount);
  }
}
loadShopInfo();
//轉換評價顯示内容的方法
const changeRateInfo=(rate)=>{
  return rate===0?'暫無評價': `⭐${rate}`
};
//評論是否有幫助
// const helpful=ref(false);
// const helpfulChange=()=>{
//     if(helpful.value===false){
//         helpful.value=true;
//     }
//     else{
//         helpful.value=false;
//     }
// }


</script>

<template>
    <div>
      <header>
        <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
    </header>
    <RouterLink :to="{ name: 'shopdetail', params: { id: shopId }} " style="text-decoration: none;">
         <CircleButtonComponent id="backButton">回到商家 &nbsp;&nbsp;&nbsp; back to shop</CircleButtonComponent>
  </RouterLink>
        <div class="container mt-5">
            <!-- .row>.col-12.col-md-12.bg-success>.col-md-2+.col-md-10>h3+label+label -->
            <div class="row">
                <div class="col-12 col-md-12 d-flex align-items-center p-3 mb-3" id="shopNameCard">
                    <div class="col-2 col-md-2"><img :src="`https://localhost:7162/ShopLogo/${shopInfo.logoName}`" alt="shopLogo" id="shopLogoImg" class="rounded"></div>
                    <div class="col-7 col-md-7 ">
                        <h3>{{shopInfo.shopName}}</h3>
                        <label class="d-block "><i class="bi bi-geo-fill"></i>服務地點:{{shopInfo.serviceSpot}}</label>
                        <label for="">{{ changeRateInfo(shopInfo.rate) }} ({{ shopInfo.reviewCount }})</label>
                    </div>
                    <div class="col-3 col-md-3 ">
                        <h6>聯絡人：{{ shopInfo.contactPerson }}</h6>
                        <h6 class="lh-base">聯絡電話：{{ shopInfo.contactNumber }}</h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-12 tabs-header d-flex justify-content-between border-bottom my-5">
                    <h3>婚友評價</h3>
                    <div class="search  col-12 col-md-3 mb-3" v-show="showInfo===true">
                    <input type="text" class="search__input" placeholder="搜尋評論" >
                    <button class="search__button">
                     <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                     <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                 </svg>
                 </button>
                </div>
              </div>
              <div class="row mb-3">
                    <div class="col-12 col-md-12" v-if="showInfo===true">
                        <v-btn class="m-2">全部評價</v-btn>
                        <v-btn class="m-2">5⭐</v-btn>
                        <v-btn class="m-2">4⭐</v-btn>
                        <v-btn class="m-2">3⭐</v-btn>
                        <v-btn class="m-2">2⭐</v-btn>
                        <v-btn class="m-2">1⭐</v-btn>
                        <v-btn class="m-2">附照片</v-btn>
                        <RouterLink :to="{ name: 'writeReview', params: { id: shopId }} " style="text-decoration: none;"><v-btn class="m-2" id="giveReviewBtn"><i class="bi bi-chat-right-text"></i>&nbsp;給評價</v-btn></RouterLink>
                    </div>
                    <div class="col-12 col-md-12" v-else>
                        <RouterLink :to="{ name: 'writeReview', params: { id: shopId }} " style="text-decoration: none;"><v-btn class="m-2" id="giveReviewBtn"><i class="bi bi-chat-right-text"></i>&nbsp;給評價</v-btn></RouterLink>
                    </div>
                </div>
             <div class="row">
              <div class="col-12 col-md-12 mb-3" v-for="review in reviews" :key="review.id" v-if="showInfo===true">
                <div class="card">
                  <div class="card-body p-3">
                    <h5 class="card-title">{{ review.merchantName }}</h5>
                    <p class="card-text">{{ review.text }}</p>
                    <div id="imgsContain"><img src="@/assets/images/weddingPlanImg/wed1.jpg" alt="" id="reviewImg"></div>
                    <p class="card-text"><small class="text-muted">評價：{{ '⭐'.repeat(review.rating) + '✰'.repeat(5 - review.rating) }}</small></p>
                    <!-- <button id="btnEditReview" v-if="review.id===memberID"><i class="bi bi-pencil-square fs-5"></i></button> 待修改啓用會員可編輯自己的資料-->   
                    <button id="btnEditReview"><i class="bi bi-pencil-square fs-5"></i></button>
                    <div id="orderLike">
                        <!-- <small>該評論有幫助：
                            <button v-if="!helpful" class="fs-5" @click="helpfulChange"><i class="bi bi-hand-thumbs-up"></i></button>
                            <button v-else="helpful" class="fs-5"><i class="bi bi-hand-thumbs-up-fill" @click="helpfulChange"></i></button></small> -->
                        <div><small>是否已訂購該店家商品：否</small></div>
                    </div> 
                  </div>
                </div>
             </div>
             <div class="text-center my-4" v-show="showInfo===true">
                    <v-pagination :length="10"></v-pagination>
               </div>
               <div class="col-12 col-md-12 mb-3" v-if="showInfo===false">暫無評價，歡迎寫下你對{{shopInfo.shopName}}的評價~</div>
         </div>
            <!-- row end↑ -->
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    #reviewImg{
        height:auto;
        width: 100px;
        padding: 5px;
    }
    #imgsContain{
        display: flex;
        height: 100px;
        align-items: center;
    }
    #btnEditReview{
        position: absolute;
        top: 20px;
        right: 20px ;
    }
    #shopNameCard{
        background-color: #EAEDED;
        border-radius: 10px;
    }
    #shopLogoImg{
        width: 100px;
        height: 100px;
        margin: 5px;
    }
    #orderLike{
        position: absolute;
        top: 100px;
        right: 20px ;
    }
    /* 搜尋框 */
    /* From Uiverse.io by joe-watson-sbf */ 
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.search__input {
  font-family: inherit;
  font-size: inherit;
  background-color: #f4f2f2;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 14em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
}

.search__input:hover, .search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
  background-color: #f0eeee;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: #ccc;
}

.search__input:focus + .search__button {
  background-color: #f0eeee;
}

.search__button {
  border: none;
  background-color: #f4f2f2;
  margin-top: .1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #b4b4b4;
}

#backButton{
  font-size: 25px;
  position: relative;
  top: 20px;
  left: 85%;
}

#giveReviewBtn{
  position: absolute; 
  right: 15px;
}
</style>