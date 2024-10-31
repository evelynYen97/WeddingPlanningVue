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

//取得商家資訊
const route=useRoute();
const shopId=route.params.id;
const shopInfo=ref({});
const loadShopInfo=async()=>{
  const response=await fetch(`${APIUrl}/ShopReviewsShopInfo/${shopId}`);
  if(response.ok){
    shopInfo.value=await response.json();
    console.log(shopInfo.value.shopName)
  }
}
loadShopInfo();
//轉換評價顯示内容的方法
const changeRateInfo=(rate)=>{
  return rate===0?'暫無評價': `⭐${rate}`
};


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
            <div class="row">
                <div class="col-12 col-md-12 d-flex align-items-center p-3 mb-3" id="shopNameCard">
                    <div class="col-2 col-md-2"><img :src="`https://localhost:7162/ShopLogo/${shopInfo.logoName}`" alt="" id="shopLogoImg"></div>
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
                <div class="col-12 col-md-12 tabs-header d-flex justify-content-between border-bottom my-5" >
                    <h3>寫下你對{{shopInfo.shopName}}的評價</h3>
                </div>
              </div>
              <div class="row mb-3">
                    <div class="col-12 col-md-12">
                        <v-btn class="m-2">全部評價</v-btn>
                        <v-btn class="m-2">5⭐</v-btn>
                        <v-btn class="m-2">4⭐</v-btn>
                        <v-btn class="m-2">3⭐</v-btn>
                        <v-btn class="m-2">2⭐</v-btn>
                        <v-btn class="m-2">1⭐</v-btn>
                        <v-btn class="m-2">附照片</v-btn>
                        <v-btn class="m-2" id="giveReviewBtn"><i class="bi bi-chat-right-text"></i>&nbsp;給評價</v-btn>
                    </div>
                </div>
             <div class="row">
              <div class="col-12 col-md-12 mb-3" v-for="review in reviews" :key="review.id">
                <div class="card">
                  <div class="card-body p-3">
                    <h5 class="card-title">{{ review.merchantName }}</h5>
                    <p class="card-text">{{ review.text }}</p>
                    <div id="imgsContain"><img src="@/assets/images/weddingPlanImg/wed1.jpg" alt="" id="reviewImg"></div>
                    <p class="card-text"><small class="text-muted">評價：{{ '⭐'.repeat(review.rating) + '✰'.repeat(5 - review.rating) }}</small></p> 
                    <button id="btnEditReview"><i class="bi bi-pencil-square fs-5"></i></button>
                    <div id="orderLike">
                        <div><small>是否已訂購該店家商品：否</small></div>
                    </div> 
                  </div>
                </div>
             </div>
             <div class="text-center my-4">
                    <v-pagination :length="10"></v-pagination>
               </div>
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