<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import CircleButtonComponent from '@/share_components/CircleButtonComponent.vue';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter  } from 'vue-router';
import { VAlert} from 'vuetify/components';
import VueEasyLightbox from 'vue-easy-lightbox';
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

//搜尋條件
const currentPage=ref(1);
const searchTerms = ref({
    shopID:shopId,
    "keyword": "",
    "sortBy": "all",
    page: currentPage.value,
})

//取得評論
const formatScheduleTime = (GetTime) => {
        return GetTime.replace('T', ' ').split('.')[0];
    };
const reviewsAndImgs=ref([]);
const reviews=ref([]);
const totalPage=ref(0);
const loadReviewData=async()=>{
  const response=await fetch(`${APIUrl}/reviewAndImgs`,{
    method:'POST',
    body:JSON.stringify(searchTerms.value),
    headers:{'Content-type':'application/json'}
  })
  const data=await response.json();
  reviewsAndImgs.value=data.reviews;
  reviewsAndImgs.value.length==0? noData.value=true:noData.value=false;
  console.log(noData.value)
  totalPage.value=data.totalPages>10?10:data.totalPages;
  reviews.value=reviewsAndImgs.value.map(item=>item.reviewDTO);
}
loadReviewData();

//轉換是否曾經購買過的方法
const OrderOrNot=(orderOrNot)=>{
  return orderOrNot===true?"是":"否";
}

//刪除評論
//要刪除的Id
const deleteItem=ref({
        "reviewId": 0,
        "reviewDetail": "",
    });

//顯示刪除資料内容提示
const whichItemToDelete=async(itemID, detail)=>{
        deleteItem.value.reviewId=itemID,
        deleteItem.value.reviewDetail=detail
    }

const deleteReview=async(review)=>{
    const response=await fetch(`https://localhost:7162/api/ShopReviewsAPI/DeleteShopReviewAndImg/${review}`,{
      method:'DELETE',
    });
    if(response.ok){
            alertShow.value=true;
            alertType.value='success';
            alertMessage.value='刪除成功';
            setTimeout(() => {
          location.reload();
        }, 2000);
    }else{
            alertShow.value=true;
            alertType.value='danger';
            alertMessage.value='刪除失敗，請再次嘗試';
    }
}

//給評論前判斷是否為會員
const router = useRouter();
const ToReview = () => {
  if(memberId>1){
    router.push({ name: 'writeReview', params: { id: shopId.value } });
  }
  else{
    alertShow.value=true;
    alertType.value='warning';
    alertMessage.value='請登入以進行評價';
  }
};

 //alert
 const alertShow = ref(false);
    const alertType = ref('success'); // 或 'error', 'warning', 'info'
    const alertMessage=ref('請登入以獲得完整服務。')


//返回圖片限制5張
const visibleImages = (images) => {
  if(images.length>5){
    return images.slice(0, 5); // 否则只返回前5张
  }else{
    return images;
  }
};

//燈箱效果
const visibleRef = ref(false)
const indexRef = ref(0)
const imgsRef = ref([])

const onShow = () => {
  visibleRef.value = true
}

const showMultiple = (reviewImages) => {
  imgsRef.value =  reviewImages.map(image => `https://localhost:7162/reviewImg/${image.imageName}`);
  indexRef.value =6 // 圖片顯示順序
  onShow()
}

const  openLightbox=(index, reviewImages)=>{
  imgsRef.value = reviewImages.map(image => `https://localhost:7162/reviewImg/${image.imageName}`);
      indexRef.value = index;
      onShow()
    }


const onHide = () => {
  visibleRef.value = false
}
//
const noData=ref(false);
//分類搜尋
const changeSort=(sortType)=>{
  searchTerms.value.page=1;
    searchTerms.value.sortBy=sortType;
    loadReviewData();
}

//分頁
const updatePage = (page) => {
      currentPage.value = page;
      searchTerms.value.page = page; 
       loadReviewData();
    };

//關鍵字搜尋
const searchKeyword=ref('');
const updateKeyword=()=>{
  searchTerms.value.page=1;
  searchTerms.value.keyword=searchKeyword.value;
  loadReviewData();
  searchTerms.value.keyword="";
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
  <v-alert
      v-model="alertShow"
      :type="alertType"
      border="start"
      close-label="Close Alert"
      :title="alertMessage"
      variant="tonal"
      closable
      class="alert-center"
      dismissable
    >
      點擊提示框右上角可關閉此提示
    </v-alert>

    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">評價刪除確認</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否確認刪除您的這則評價？
      </div>
      <div class="m-3"><p>{{ deleteItem.reviewDetail }}</p></div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary text-light" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger text-light" @click="deleteReview(deleteItem.reviewId)" data-bs-dismiss="modal">確認刪除</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal end -->
 <!-- lightbox  -->
 <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  <!-- lightbox end  -->

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
                    <input type="text" class="search__input" placeholder="搜尋評論" v-model="searchKeyword">
                    <button class="search__button" @click="updateKeyword">
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
                        <v-btn class="m-2" @click="changeSort('all')">全部評價</v-btn>
                        <v-btn class="m-2" @click="changeSort('five')">5⭐</v-btn>
                        <v-btn class="m-2" @click="changeSort('four')">4⭐</v-btn>
                        <v-btn class="m-2" @click="changeSort('three')">3⭐</v-btn>
                        <v-btn class="m-2" @click="changeSort('two')">2⭐</v-btn>
                        <v-btn class="m-2" @click="changeSort('one')">1⭐</v-btn>
                        <v-btn class="m-2" @click="changeSort('photo')">附照片</v-btn>
                        <v-btn class="m-2" id="giveReviewBtn" @click="ToReview"><i class="bi bi-chat-right-text"></i>&nbsp;給評價</v-btn>
                    </div>
                    <div class="col-12 col-md-12" v-else>
                        <v-btn class="m-2" id="giveReviewBtn" @click="ToReview"><i class="bi bi-chat-right-text"></i>&nbsp;給評價</v-btn>
                    </div>
                </div>
             <div class="row">
              <div class="col-12 col-md-12 mb-3" v-for="review in reviewsAndImgs" :key="review.shopReviewId" v-if="showInfo===true">
                <div class="card">
                  <div class="card-body p-3">
                    <h5 class="card-title">會員：{{ review.reviewDTO.memberName}}</h5>
                    <p class="card-text">{{ review.reviewDTO.review }}</p>
                    <div id="imgsContain">
                      <img v-for="(image, imageIndex) in visibleImages(review.images)" 
                      :key="image.reviewImageId" :src="`https://localhost:7162/reviewImg/${image.imageName}`" alt="評價照片" id="reviewImg" @click="openLightbox(imageIndex, review.images)">
                      <span > <button v-if="review.images.length > 5" id="moreImages" class="fw-bold fs-5" @click="showMultiple(review.images)">+{{ review.images.length - 5 }} </button></span>
                    </div>

                      
                    <p class="card-text"><small class="text-muted">評價：{{ '⭐'.repeat(review.reviewDTO.rate) + '✰'.repeat(5 - review.reviewDTO.rate) }}</small></p>
                    <p class="card-text"><small>評價時間：{{formatScheduleTime(review.reviewDTO.createdTime)}}</small></p>
                    <button id="btnDeleteReview"  v-show="review.reviewDTO.memberId==memberId" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="whichItemToDelete(review.reviewDTO.shopReviewId,review.reviewDTO.review)"><i class="bi bi-trash"></i></button>
                    <div id="orderLike">
                        <div><small>是否已訂購該店家商品：{{ OrderOrNot(review.reviewDTO.orderOrNot) }}</small></div>
                    </div> 
                  </div>
                </div>
             </div>
             <div class="col-12 col-md-12 mb-3" v-if="showInfo===false">暫無評價，歡迎寫下你對{{shopInfo.shopName}}的評價~</div>
               <div class="col-12 col-md-12 mb-3" v-if="noData===true&& showInfo===true">查無評價</div>
             <div class="text-center my-4" v-show="showInfo===true">
                    <v-pagination :length="totalPage" v-model="currentPage"
                    @update:modelValue="updatePage"></v-pagination>
               </div>
               
         </div>
            <!-- row end↑ -->
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    #reviewImg{
        height:100px;
        width: 100px;
        padding: 5px;
        object-fit: contain;
        background-color: #EAEDED;
        border-radius: 10px;
        margin-right: 10px;
    }
    #imgsContain{
        display: flex;
        height: 100px;
        align-items: center;
    }
    #btnDeleteReview{
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

.alert-center {
        position: fixed;
         top: 90%;
         left: 90%;
         transform: translate(-50%, -50%);
         z-index: 1000; /* 确保在最上层 */
         height: 100px;
         width: 300px;
         font-size:12px
        }

#moreImages{
  margin: 15px;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background-color:#EAEDED;
}
</style>