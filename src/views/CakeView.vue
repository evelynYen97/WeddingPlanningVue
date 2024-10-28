<script setup>
import { ref, computed, watch } from 'vue'
import ShopView from './ShopView.vue';

const API_URL = 'https://localhost:7048/api/Cakes'

const cakes = ref([]) // 存放 API 資料
const selectedCategory = ref('all') // 儲存選擇的商品分類
const searchKeyword = ref('') // 儲存搜尋欄的關鍵字
const currentPage = ref(1) // 當前頁面
const pageSize = ref(10) // 每頁顯示的商品數量

// 讀取 API 資料
const loadcakes = async () => {
  const response = await fetch(API_URL)
  const datas = await response.json()
  cakes.value = datas
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
                  placeholder="輸入商品名稱進行搜尋..." 
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
                            <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                              <svg width="16" height="16">
                                <use xlink:href="#minus"></use>
                              </svg>
                            </button>
                          </span>
                          <input type="text" id="quantity" name="quantity" class="form-control input-number" value="1" />
                          <span class="input-group-btn">
                            <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                              <svg width="16" height="16">
                                <use xlink:href="#plus"></use>
                              </svg>
                            </button>
                          </span>
                        </div>
                        <a href="#" class="nav-link">
                          加入預算規劃表 <iconify-icon icon="uil:shopping-cart" />
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
