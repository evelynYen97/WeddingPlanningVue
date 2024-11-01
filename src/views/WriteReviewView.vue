<script setup>
    import SampleComponent from '@/components/SampleComponent.vue';
import CircleButtonComponent from '@/share_components/CircleButtonComponent.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
  }
}
loadShopInfo();
//轉換評價顯示内容的方法
const changeRateInfo=(rate)=>{
  return rate===0?'暫無評價': `⭐${rate}`
};

//宣告回傳評論資料
const backReview=ref({
  "shopReviewId": 0,
    "memberId": memberId,
    "shopId":parseInt(shopId, 10),
    "rating":1,
    "comment":"",
    "orderYet":false
})
 watch(backReview, (newValue) => {
       console.log('backReview changed:', newValue);
     }, { deep: true }); 

//檔案上傳
const fileUpload = ref(null);
const files = ref([]);
const handleFileUpload = (event) => {
  files.value = Array.from(event.target.files);
};
const router = useRouter();
const onSubmit=async()=>{
  const formData = new FormData();
  files.value.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('shopReviewId', backReview.value.shopReviewId);
  formData.append('shopId', backReview.value.shopId);
  formData.append('memberId', backReview.value.memberId);
  formData.append('rating', backReview.value.rating);
  formData.append('comment', backReview.value.comment);
  formData.append('orderYet', backReview.value.orderYet);
 
  const response=await fetch(`${APIUrl}/ShopReviewsAndImgs`,{
        method: 'POST',
        body: formData,
    });
    if(!response.ok){
      alert("新增評價失敗");
    }
    else{
      alert("新增評價成功");
      setTimeout(() => {
      router.push(`/shopReview/${shopId}`);
    }, 1000);
    }
}
    
    
    

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
            <div class="row" id="reviewSection">
                <div class="col-12 col-md-12 tabs-header d-flex justify-content-between border-bottom my-5" >
                    <h3>寫下你的評價</h3>
                </div>
              </div>
              <div class="row mb-3">
                    <div class="col-12 col-md-12">
                       <form @submit.prevent="onSubmit" name="newReviewForm">
                        <v-textarea
                          v-model="backReview.comment"
                          label="評價(500字内)"
                           counter="500"
                           maxlength="500"
                          outlined variant="solo"
                          rows="8" placeholder="歡迎留下您寶貴的評價，幫助同樣前往幸福路上的新人們~"
                          name="Comment"></v-textarea>
                          <br>
                          <br>
                          <h6>給商家打個分吧~</h6>
                          <v-rating
                            hover
                            :length="5"
                            :size="37"
                            v-model="backReview.rating"
                            color="teal"
                            active-color="teal"
                             name="Rating"
                          />
                          <br>
                          <br>
                          <h6>是否曾經在婚禮訂購過商家商品？</h6>
                          <v-radio-group name="OrderYet" v-model="backReview.orderYet">
                             <v-radio label="訂購過" value="true"></v-radio>
                              <v-radio label="曾體驗過，未在婚禮訂購" value="false"></v-radio>
                            </v-radio-group>
                          <br>
                          <h6>上傳一些照片(可選)</h6>
                          <br>
                          <input type="file" multiple @change="handleFileUpload" accept="image/*" class="form-control" id="inputGroupFile04">
                          <div id="submitBtn">
                            <v-btn
                               :loading="loading"
                                class="mt-2"
                               text="送出評價"
                                type="submit"
                               block
                               base-color="#F6E2E7"
                               height="50px"
                             ></v-btn>
                          </div>
                       </form>
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

#submitBtn{
  width: 200px;
  position: relative;
  left: 30vw;
  margin-top: 50px;
}

@media (max-width: 430px) {
  #submitBtn {
    left: 25vw;
  }
}

#reviewSection{
  margin-top: 50px;
}
</style>