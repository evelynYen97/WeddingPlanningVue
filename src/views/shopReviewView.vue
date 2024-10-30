<script setup>
    import { ref } from 'vue';
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

//評論是否有幫助
const helpful=ref(false);
const helpfulChange=()=>{
    if(helpful.value===false){
        helpful.value=true;
    }
    else{
        helpful.value=false;
    }
}

</script>

<template>
    <div>
        <div class="container">
            <!-- .row>.col-12.col-md-12.bg-success>.col-md-2+.col-md-10>h3+label+label -->
            <div class="row">
                <div class="col-12 col-md-12 d-flex align-items-center p-3 mb-3" id="shopNameCard">
                    <div class="col-2 col-md-2"><img src="@/assets/logo.svg" alt="" id="shopLogoImg"></div>
                    <div class="col-7 col-md-7 ">
                        <h3>商家名稱</h3>
                        <label class="d-block "><i class="bi bi-geo-fill"></i>服務地點:</label>
                        <label for="">⭐4.9 (1000)</label>
                    </div>
                    <div class="col-3 col-md-3 ">
                        <h6>聯絡人：xxx</h6>
                        <h6 class="lh-base">聯絡電話：0908555555</h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-12 tabs-header d-flex justify-content-between border-bottom my-5" >
                    <h3>婚友評價</h3>
                    <div class="search col-md-3 mb-3">
                    <input type="text" class="search__input" placeholder="搜尋評論">
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
                    <div class="col-12 col-md-12">
                        <v-btn class="m-2">最新評論</v-btn>
                        <v-btn>熱門評論</v-btn>
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
                    <!-- <button id="btnEditReview" v-if="review.id===memberID"><i class="bi bi-pencil-square fs-5"></i></button> 待修改啓用會員可編輯自己的資料-->   
                    <button id="btnEditReview"><i class="bi bi-pencil-square fs-5"></i></button>
                    <div id="orderLike">
                        <small>該評論有幫助：
                            <button v-if="!helpful" class="fs-5" @click="helpfulChange"><i class="bi bi-hand-thumbs-up"></i></button>
                            <button v-else="helpful" class="fs-5"><i class="bi bi-hand-thumbs-up-fill" @click="helpfulChange"></i></button></small>
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


</style>