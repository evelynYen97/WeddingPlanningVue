<script setup>
import { ref, computed, watch, reactive } from 'vue';
import ShopView from './ShopView.vue';
import Cookies from 'js-cookie';

const API_URL = 'https://localhost:7048/api/Dishes';
const loadImgURL = 'https://localhost:7162/Dish1/';

const dishes = ref([]); // 存放菜餚資料
const selectedCategory = ref('all'); // 儲存選中的分類
const searchKeyword = ref(''); // 儲存搜尋欄的關鍵字
const currentPage = ref(1) // 當前頁面
const pageSize = ref(10) // 每頁顯示的商品數量
const dishesQuantity = ref({}); // 每個桌菜(每桌)的數量，拆掉彼此影響的參數依據

// 讀取 API 資料
const loadDishes = async () => {
  const response = await fetch(API_URL);
  const datas = await response.json();
  console.log(datas);
  dishes.value = datas;

//預設每張桌菜的數量為 1
datas.forEach((dish) => {
  dishesQuantity.value[dish.dishesId] = 1;
  });
};



// 根據價格與搜尋關鍵字進行分類的計算屬性
const filteredDishes = computed(() => {
  // 根據價格分類
  let categoryFiltered = dishes.value;
  switch (selectedCategory.value) {
    case 'below-10000':
      categoryFiltered = categoryFiltered.filter(dish => dish.pricePerTable <= 10000);
      break;
    case '10001-20000':
      categoryFiltered = categoryFiltered.filter(dish => dish.pricePerTable > 10000 && dish.pricePerTable <= 20000);
      break;
    case 'above-20000':
      categoryFiltered = categoryFiltered.filter(dish => dish.pricePerTable > 20000);
      break;
    default:
      break; // 顯示全部
  }

  // 根據搜尋關鍵字進行篩選
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    return categoryFiltered.filter(dish =>
      dish.dishesName.toLowerCase().includes(keyword) ||
      dish.dishesDescription.toLowerCase().includes(keyword)
    );
  }

  return categoryFiltered;
});

// 設計分頁的功能
// 計算分頁後顯示的商品
const paginateddish = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredDishes.value.slice(start, end)
})

// 計算總頁數
const totalPages = computed(() => 
  Math.ceil(filteredDishes.value.length / pageSize.value)
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
function increaseQuantity(dishesId) {
  dishesQuantity.value[dishesId]++;
}

function decreaseQuantity(dishesId) {
  if (dishesQuantity.value[dishesId] > 1) {
    dishesQuantity.value[dishesId]--;
  }else{
    alert('每件不能低於1。')
  }
}

//將桌菜加入預算規畫表
async function addToBudget(dish) {
  const memberId = Cookies.get('memberID'); // 取得會員 ID

  if (!memberId) {
    alert('您尚未登入，請先登入');
    return;
  }

  const budgetItem = {
    memberId: memberId,
    budgetItemDetail: dish.dishesName,                                      // 桌菜名稱
    budgetItemPrice: dish.pricePerTable,                                    // 桌菜單價
    budgetItemAmount: dishesQuantity.value[dish.dishesId],                        // 桌菜桌數
    budgetItemSubtotal: dish.pricePerTable * dishesQuantity.value[dish.dishesId], // 辦桌總價
    budgetItemSort: '桌菜'                                                  // 固定值 "桌菜"
  };
  console.log(budgetItem)
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



loadDishes();
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
                <h3>桌菜列表</h3>
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a href="#" 
                       class="nav-link text-uppercase fs-6" 
                       :class="{ active: selectedCategory === 'all' }"
                       @click.prevent="selectedCategory = 'all'">
                      全部種類
                    </a>
                    <a href="#" 
                       class="nav-link text-uppercase fs-6" 
                       :class="{ active: selectedCategory === 'below-10000' }"
                       @click.prevent="selectedCategory = 'below-10000'">
                      10,000(含)圓以下
                    </a>
                    <a href="#" 
                       class="nav-link text-uppercase fs-6" 
                       :class="{ active: selectedCategory === '10001-20000' }"
                       @click.prevent="selectedCategory = '10001-20000'">
                      10,001~20,000圓
                    </a>
                    <a href="#" 
                       class="nav-link text-uppercase fs-6" 
                       :class="{ active: selectedCategory === 'above-20000' }"
                       @click.prevent="selectedCategory = 'above-20000'">
                      20,001(含)以上
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
                  placeholder="輸入桌菜名稱進行搜尋..." 
                />
              </div>
            </div>

              <!-- Tabs Content -->
              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-all" role="tabpanel">
  
                  <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    <div class="col" v-for="dish in paginateddish" :key="dish.dishesId">
                      <div class="product-item">
                        <figure>
                          <RouterLink :to="{ name: 'dishItem', params: { id: dish.dishesId } }">
                            <img :src="`${loadImgURL}${dish.dishesImg}`" class="tab-image" />
                          </RouterLink>
                        </figure>
                        <h3>
                          <RouterLink :to="{ name: 'dishItem', params: { id: dish.dishesId } }">
                            {{ dish.dishesName }}
                          </RouterLink>
                        </h3>
                        <span class="flavor">{{ dish.dishesSort }}</span><br>
                        <span class="qty">{{ dish.dishesDescription }}</span>
                        <span class="price">{{ dish.pricePerTable }}</span>
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="input-group product-qty">
                            <span class="input-group-btn">
                              <button type="button" class="quantity-left-minus btn btn-danger btn-number" 
                              @click="decreaseQuantity(dish.dishesId)">
                                -
                              </button>
                            </span>
                            <input type="text" id="quantity" name="quantity" class="form-control input-number" v-model="dishesQuantity[dish.dishesId]" />
                            <span class="input-group-btn">
                              <button type="button" class="quantity-right-plus btn btn-success btn-number"
                              @click="increaseQuantity(dish.dishesId)">
                                +
                              </button>
                            </span>
                          </div>
                          <a href="#" class="nav-link" @click.prevent="addToBudget(dish)">
                            加入預算規劃表 <iconify-icon icon="uil:shopping-cart" />
                          </a>
                        </div>
                      </div>
                    </div>
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
