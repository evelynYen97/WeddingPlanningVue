<script setup>
import {ref, computed, watch, reactive} from 'vue'
import ShopView from './ShopView.vue';

const API_URL =   'https://localhost:7048/api/Cars'
const loadImgURL =  'https://localhost:7162/Car1/'

const cars = ref([]) //宣告放在名為cars的陣列中
const selectedCategory = ref('all'); // 存放目前選中的分類
const searchKeyword = ref('') // 儲存搜尋欄的關鍵字
const currentPage = ref(1) // 當前頁面
const pageSize = ref(10) // 每頁顯示的商品數量
const carsQuantity = reactive({}); // 每台禮車的數量，拆掉彼此影響的參數依據

//讀取API資料
const  loadCars = async() => {
  const response = await fetch(API_URL)
  const datas = await response.json()
  console.log(datas)
  cars.value = datas

// 預設每台禮車的數量為 1
datas.forEach((car) => {
  carsQuantity[car.carId] = 1;
  });
}

//關鍵字搜尋：根據選擇的分類或是名稱挑選資料
const filteredCarryMount = computed(() => {
  // 根據幾人座式分類
  let filtered = selectedCategory.value === 'all'
    ? cars.value
    : cars.value.filter(car => car.passengerCapacity === parseInt(selectedCategory.value))

  // 根據名稱分類
  if (searchKeyword.value.trim() !== '') {
    filtered = filtered.filter(car =>
      car.carName.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }

  return filtered
})

// 設計分頁的功能
// 計算分頁後顯示的商品
const paginatedCar = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredCarryMount.value.slice(start, end)
})

// 計算總頁數
const totalPages = computed(() => 
  Math.ceil(filteredCarryMount.value.length / pageSize.value)
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
function increaseQuantity(carId) {
  carsQuantity[carId]++;
}

function decreaseQuantity(carId) {
  if (carsQuantity[carId] > 1) {
    carsQuantity[carId]--;
  }else{
    alert('每件數量不能低於1。')
  }
}

loadCars()

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
              <h3>禮車列表</h3>
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
                    :class="{ active: selectedCategory === '2' }"
                    @click.prevent="selectedCategory = '2'">
                    二人座
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '4' }"
                    @click.prevent="selectedCategory = '4'">
                    四人座
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '5' }"
                    @click.prevent="selectedCategory = '5'">
                    五人座
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '7' }"
                    @click.prevent="selectedCategory = '7'">
                    七人座
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
                  placeholder="輸入車輛名稱進行搜尋..." 
                />
              </div>
            </div>
           

            <!-- Tabs Content -->
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" 
                   id="nav-all" 
                   role="tabpanel" 
                   aria-labelledby="nav-all-tab">

                <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 
                            row-cols-lg-4 row-cols-xl-5">
                  
                  <!-- Product Item -->
                  <div class="col" v-for="car in paginatedCar" >
                    <div class="product-item">
                      <figure>
                        <RouterLink :to="{ name: 'carItem', params: { id: car.carId } }">
                          <img :src="`${loadImgURL}${car.carImg}`" class="tab-image"/>
                        </RouterLink>
                      </figure>
                      <h3>
                        <RouterLink :to="{ name: 'carItem', params: { id: car.carId } }">
                          {{ car.carName }}
                        </RouterLink></h3>
                      <span class="flavor">{{ car.carDetail }}</span><br>
                      <span class="qty">{{ car.passengerCapacity }}人座</span>
                      <span class="price">{{ car.rentalPerDay }}</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
                          <span class="input-group-btn">
                            <button type="button" 
                                    class="quantity-left-minus btn btn-danger btn-number" 
                                    @click="decreaseQuantity(car.carId)"
                                    >
                            -
                            </button>
                          </span>
                          <input type="text" 
                                 id="quantity" 
                                 name="quantity" 
                                 class="form-control input-number" 
                                 :value="carsQuantity[car.carId]"  />
                          <span class="input-group-btn">
                            <button type="button" 
                                    class="quantity-right-plus btn btn-success btn-number" 
                                    @click="increaseQuantity(car.carId)">
                            +
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
@import '../assets/css/shop.css'; /* 引用 CSS 文件 */
</style>
