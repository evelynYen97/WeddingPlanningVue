<script setup>
import { ref, computed, watch } from 'vue';
import ShopView from './ShopView.vue';

const API_URL = 'https://localhost:7048/api/Shops'; 
const loadImgURL = 'https://localhost:7162/ShopLogo/'

const allShops = ref([]); // 存放所有商家資料
const selectedCategory = ref('all'); // 存放目前選中的分類
const searchKeyword = ref('') // 儲存搜尋欄的關鍵字
const currentPage = ref(1) // 當前頁面
const pageSize = ref(10) // 每頁顯示的商家數量

// 從 API 讀取所有商家資料
const loadAllShop = async () => {
  const response = await fetch(API_URL);
  const datas = await response.json();
  console.log(datas);
  allShops.value = datas;
};

// 根據選擇的分類(四大分類)或名稱進行篩選
const filteredShops = computed(() => {
  let filtered = selectedCategory.value === 'all'
    ? allShops.value
    : allShops.value.filter(shop => shop.shopSort === selectedCategory.value)

  if (searchKeyword.value.trim() !== '') {
    filtered = filtered.filter(shop =>
      shop.shopName.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }

  return filtered
})


// 設計分頁的功能
// 計算分頁後顯示的商品
const paginatedShop = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredShops.value.slice(start, end)
})


// 計算總頁數
const totalPages = computed(() => 
  Math.ceil(filteredShops.value.length / pageSize.value)
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

loadAllShop();
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
              <h3>所有商家列表</h3>
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === 'all' }"
                    @click.prevent="selectedCategory = 'all'">
                    全部商家
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '喜餅' }"
                    @click.prevent="selectedCategory = '喜餅'">
                    喜餅
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '場地' }"
                    @click.prevent="selectedCategory = '場地'">
                    場地
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '婚宴' }"
                    @click.prevent="selectedCategory = '婚宴'">
                    婚宴
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '婚禮車' }"
                    @click.prevent="selectedCategory = '婚禮車'">
                    禮車
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
                  placeholder="輸入商家名稱進行搜尋..." 
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
              <div 
                class="tab-pane fade show active" 
                id="nav-all" 
                role="tabpanel" 
                aria-labelledby="nav-all-tab">

                <div 
                  class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 
                             row-cols-lg-4 row-cols-xl-5">
                  <!-- Product Item -->
                  <div class="col" v-for="shop in paginatedShop" :key="shop.id">
                    <div class="product-item">
                      <figure>
                        <RouterLink :to="{ name: 'shopdetail', params: { id: shop.shopId } }">
                          <img 
                            :src="`${loadImgURL}${shop.shopLogo}`"
                            class="tab-image" 
                          />
                        </RouterLink>
                      </figure>
                      <h3>{{ shop.shopName }}</h3>
                      <span class="flavor">{{ shop.shopSort }}</span><br>
                    </div>
                  </div>
                  <!-- /Product Item -->
                </div> <!-- /product-grid -->
              </div> <!-- /tab-pane -->
            </div> <!-- /tab-content -->
          </div> <!-- /product-tabs -->
        </div> <!-- /col-md-12 -->
      </div> <!-- /row -->
    </div> <!-- /container-fluid -->
  </section>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css'; /* 引用 CSS 文件 */

</style>
