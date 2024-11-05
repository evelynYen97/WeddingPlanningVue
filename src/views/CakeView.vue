<script setup>
import { ref, computed, watch, reactive } from 'vue'
import ShopView from './ShopView.vue';
import Cookies from 'js-cookie';
import { stringify } from 'postcss';

const API_URL = 'https://localhost:7048/api/Cakes'

const cakes = ref([]) // 存放 API 資料
const selectedCategory = ref('all') // 儲存選擇的商品分類
const searchKeyword = ref('') // 儲存搜尋欄的關鍵字
const currentPage = ref(1) // 當前頁面
const pageSize = ref(10) // 每頁顯示的商品數量
const cakesQuantity = reactive({}); // 每個喜餅的數量，拆掉彼此影響的參數依據

// 讀取 API 資料
const loadcakes = async () => {
  const response = await fetch(API_URL)
  const datas = await response.json()
  cakes.value = datas

// 預設每個喜餅的數量為 1
datas.forEach((cake) => {
  cakesQuantity[cake.cakeID] = 1;
  });
}



// 根據選擇的分類或名稱進行篩選
const filteredCakes = computed(() => {
  let filtered = selectedCategory.value === 'all'
    ? cakes.value
    : cakes.value.filter(cake => cake.cakeStyles === selectedCategory.value)

  if (searchKeyword.value.trim() !== '') {
    filtered = filtered.filter(cake =>
      cake.cakeName.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }

  return filtered
})

// 設計分頁的功能
// 計算分頁後顯示的商品
const paginatedCakes = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredCakes.value.slice(start, end)
})

// 計算總頁數
const totalPages = computed(() => 
  Math.ceil(filteredCakes.value.length / pageSize.value)
)

// 切換頁面
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 監聽搜尋欄的變化，重設回去為第一頁(重置的概念)
watch(searchKeyword, () => {
  currentPage.value = 1
})

// 監聽初步篩選的變化，重設回去為第一頁(重置的概念)
watch(selectedCategory, () =>{
  currentPage.value = 1
})

// 增減數量函式
function increaseQuantity(cakeID) {
  cakesQuantity[cakeID]++;
}

function decreaseQuantity(cakeID) {
  if (cakesQuantity[cakeID] > 1) {
    cakesQuantity[cakeID]--;
  }else{
    alert('每件不能低於1。')
  }
}

//將喜餅加入預算規畫表
async function addToBudget(cake) {
  const memberId = Cookies.get('memberID'); // 取得會員 ID

  if (!memberId) {
    alert('您尚未登入，請先登入');
    return;
  }

  const budgetItem = {
    memberId: memberId,
    budgetItemDetail: cake.cakeName,              // 喜餅名稱
    budgetItemPrice: cake.cakePrice,              // 喜餅單價
    budgetItemAmount: cakesQuantity[cake.cakeID], // 喜餅數量
    budgetItemSubtotal: cake.cakePrice * cakesQuantity[cake.cakeID], // 喜餅總價
    budgetItemSort: '喜餅'                        // 固定值 "喜餅"
  };

  try {
    const response = await fetch( 'https://localhost:7048/api/MemberBudgetItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(budgetItem)
    });

    if (!response.ok) {
      throw new Error('無法加入預算表');
    }
    alert('成功加入預算表！');
  } catch (error) {
    console.error('加入預算表時發生錯誤：', error);
    alert('加入預算表失敗');
  }
}

loadcakes()


</script>


<template>
  <ShopView></ShopView>
  <section class="py-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="bootstrap-tabs product-tabs">

            <!-- Tabs Header -->
            <div class="tabs-header d-flex justify-content-between border-bottom my-5">
              <h3>喜餅列表</h3>
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a href="#" class="nav-link text-uppercase fs-6" 
                     :class="{ active: selectedCategory === 'all' }"
                     @click.prevent="selectedCategory = 'all'">
                    全部商家
                  </a>
                  <a href="#" class="nav-link text-uppercase fs-6"
                     :class="{ active: selectedCategory === '中式' }"
                     @click.prevent="selectedCategory = '中式'">
                    中式
                  </a>
                  <a href="#" class="nav-link text-uppercase fs-6"
                     :class="{ active: selectedCategory === '西式' }"
                     @click.prevent="selectedCategory = '西式'">
                    西式
                  </a>
                  <a href="#" class="nav-link text-uppercase fs-6"
                     :class="{ active: selectedCategory === '中西式' }"
                     @click.prevent="selectedCategory = '中西式'">
                    中西式
                  </a>
                </div>
              </nav>
            </div>

            <!-- 搜尋欄位 -->
            <div class="row">
              <div class="col-md-3 search-sidebar">
                <input 
                  type="text" 
                  v-model="searchKeyword" 
                  class="form-control search-input" 
                  placeholder="輸入喜餅名稱進行搜尋..." 
                />
              </div>
              <div class="col-6">
                <!-- 分頁控制 -->
                  <nav aria-label="Page navigation" class="mt-4">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">上一頁</a>
                    </li>
                    <li 
                      class="page-item" 
                      v-for="page in totalPages" 
                      :key="page" 
                      :class="{ active: page === currentPage }"
                    >
                      <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">下一頁</a>
                    </li>
                  </ul>
                </nav>
                <!-- 分頁控制結束 -->

              </div>
            </div>

            

            <!-- Tabs Content -->
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                  
                  <!-- Product Item -->
                  <div class="col" v-for="cake in paginatedCakes" :key="cake.cakeID">
                    <div class="product-item">
                      <figure>
                        <RouterLink :to="{ name: 'Cakeitem', params: { id: cake.cakeID } }">
                          <img :src="cake.cakeImg" class="tab-image" alt="Cake Image" />                        
                        </RouterLink>
                      </figure>
                      <h3>
                        <RouterLink :to="{ name: 'Cakeitem', params: { id: cake.cakeID } }">
                          {{ cake.cakeName }}
                        </RouterLink>
                      </h3>                   
                      <span class="flavor">{{ cake.cakeStyles }}</span><br>
                      <span class="qty">一盒</span>
                      <span class="price">{{ cake.cakePrice }}</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
                          <span class="input-group-btn">
                            <button type="button" class="quantity-left-minus btn btn-danger btn-number"   @click="decreaseQuantity(cake.cakeID)">
                              -
                            </button>
                          </span>
                          <input type="text" id="quantity" name="quantity" class="form-control input-number" :value="cakesQuantity[cake.cakeID]" />
                          <span class="input-group-btn">
                            <button type="button" class="quantity-right-plus btn btn-success btn-number" @click="increaseQuantity(cake.cakeID)">
                              +                     
                            </button>
                          </span>
                        </div>
                        <a href="#" class="nav-link" @click.prevent="addToBudget(cake)">
                          加入預算規劃表 
                        </a>                      
                      </div>
                    </div>
                  </div>
                  <!-- /Product Item -->

                </div> <!-- /product-grid -->
                <!-- 分頁控制 -->
                  <nav aria-label="Page navigation" class="mt-4">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">上一頁</a>
                    </li>
                    <li 
                      class="page-item" 
                      v-for="page in totalPages" 
                      :key="page" 
                      :class="{ active: page === currentPage }"
                    >
                      <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">下一頁</a>
                    </li>
                  </ul>
                </nav>
                <!-- 分頁控制結束 -->

              


              </div> <!-- /tab-pane -->
            </div> <!-- /tab-content -->
          </div> <!-- /product-tabs -->
        </div> <!-- /col-md-12 -->
      </div> <!-- /row -->
    </div> <!-- /container-fluid -->
  </section>
</template>


<style lang="css" scoped>
@import '../assets/css/shop.css';


</style>
