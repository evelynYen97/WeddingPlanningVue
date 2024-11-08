<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import ShopReviewComponent from '@/components/shopReviewComponent.vue';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Cookies from 'js-cookie';

const route = useRoute();
const shopId = route.params.id;
const shop = ref({});
const cakes = ref([]);
const cars = ref([]);
const dishes = ref([]);
const showVenueButton = ref(false);
const ItemQuantity = reactive({}); // 每個商品的數量，拆掉彼此影響的參數依據
const dataURL = `https://localhost:7048/api/Shops/${shopId}/data`; // 設立取得資料的 URL

// 初始化函數，依序取得商店和各分類產品資料
const initializeFunction = async () => {
  try {
    // 取得商店資料
    const shopResponse = await fetch(`https://localhost:7048/api/Shops/${shopId}`);
    shop.value = await shopResponse.json();
    console.log('商店資料:', shop.value);

    // 取得產品資料
    await fetchShopData();
  } catch (error) {
    console.error('載入失敗:', error);
  }
};

// 取得 shopId 並發送請求到後端 API
const fetchShopData = async () => {
  try {
    const response = await fetch(dataURL);
    const data = await response.json();

    cakes.value = data.cakes;
    cars.value = data.cars;
    dishes.value = data.dishes;
    console.log('取得的商店資料:', data);

    // 初始化每個商品的數量
    cakes.value.forEach((cake) => { ItemQuantity[cake.cakeId] = 1; });
    dishes.value.forEach((dish) => { ItemQuantity[dish.dishesId] = 1; });
    cars.value.forEach((car) => { ItemQuantity[car.carId] = 1; });

    // 檢查是否喜餅、汽車、菜餚皆無資訊，才顯示按鈕
    if(cakes.value.length === 0 && cars.value.length === 0 && dishes.value.length === 0){
      showVenueButton.value = true;
    }
  } catch (error) {
    console.error('載入產品資料失敗:', error);
  }
};

// 增加數量函式
function increaseQuantity(id) {
  if (ItemQuantity[id] !== undefined) {
    ItemQuantity[id]++;
  }
}

// 減少數量函式
function decreaseQuantity(id) {
  if (ItemQuantity[id] > 1) {
    ItemQuantity[id]--;
  } else {
    alert('每件不能低於1。');
  }
}


// 空白budgetItem準備填入
const budgetItem = reactive({
  memberId: '',
  budgetItemDetail: '',
  budgetItemPrice: 0,
  budgetItemAmount: 0,
  budgetItemSubtotal: 0,
  budgetItemSort: ''
});

//將各自的項目加入預算規畫表 
async function addToBudget(item) {
  const memberId = Cookies.get('memberID'); // 取得會員 ID

  if (!memberId) {
    alert('您尚未登入，請先登入');
    return;
  }

  // 根據品項類型設定預算項目
  if (item.cakeId) {
    // 當品項是喜餅時
    budgetItem.memberId = memberId;
    budgetItem.budgetItemDetail = item.cakeName;
    budgetItem.budgetItemPrice = item.cakePrice;
    budgetItem.budgetItemAmount = ItemQuantity[item.cakeId];
    budgetItem.budgetItemSubtotal = item.cakePrice * ItemQuantity[item.cakeId];
    budgetItem.budgetItemSort = '喜餅糕點';
  } else if (item.dishesId) {
    // 當品項是桌菜時
    budgetItem.memberId = memberId;
    budgetItem.budgetItemDetail = item.dishesName;
    budgetItem.budgetItemPrice = item.pricePerTable;
    budgetItem.budgetItemAmount = ItemQuantity[item.dishesId];
    budgetItem.budgetItemSubtotal = item.pricePerTable * ItemQuantity[item.dishesId];
    budgetItem.budgetItemSort = '桌菜';
  } else if (item.carId) {
    // 當品項是禮車時
    budgetItem.memberId = memberId;
    budgetItem.budgetItemDetail = item.carName;
    budgetItem.budgetItemPrice = item.rentalPerDay;
    budgetItem.budgetItemAmount = ItemQuantity[item.carId];
    budgetItem.budgetItemSubtotal = item.rentalPerDay * ItemQuantity[item.carId];
    budgetItem.budgetItemSort = '禮車';
  }

  // 發送 API 請求
  try {
    const response = await fetch('https://localhost:7048/api/MemberBudgetItems', {
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

// 在元件掛載時執行初始化函數
initializeFunction();

</script>

<template>
  <div>
    <SampleComponent>
      <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat; background-size: cover;"></div>
    </SampleComponent>

    <section id="latest-blog" class="py-5">
      
      <div class="container-fluid">
        <nav style="--bs-breadcrumb-divider: '>>';" aria-label="breadcrumb">
            <ol class="breadcrumb ">
              <li class="breadcrumb-item "><RouterLink :to="{name:'allShop'}">商家列表</RouterLink></li>
              <li class="breadcrumb-item active" aria-current="page">{{ shop.shopName }}</li>
            </ol>
          </nav>

        <!-- 廠商資訊 -->
        <div class="row">
          <div class="col-lg-6 col-md-12">
            
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="image-holder zoom-effect">
                <a href="#">
                  <img :src="`https://localhost:7162/ShopLogo/${shop.shopLogo}`" alt="post" class="card-img-top">
                </a>
              </div>
            </article>
          </div>
          <div class="col-lg-6 col-md-12">
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="card-body">
                <h2 class="post-title">
                  <a href="#" class="text-decoration-none">商家名稱：{{ shop.shopName }}</a>
                </h2>
                <br>
                <h5>服務內容：{{shop.shopSort}}</h5>
                <br>
                <h5>聯絡人：{{shop.contactPerson}}</h5>
                <br>
                <h5>連絡電話：{{ shop.contactPhone }}</h5>
                <br>
                <h5>付款方式：{{ shop.payment }}</h5>
                <br>
              </div>
            </article>
          </div>
        </div>

        <!-- 產品列表 -->
        <div class="tabs-header d-flex justify-content-between border-bottom my-5">
          <h3>品牌產品列表</h3>
        </div>

        <div class="tab-content mt-5" id="nav-tabContent">
          <!-- 喜餅列表 -->
          <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <div class="col" v-for="cake in cakes" :key="cake.cakeID">
              <div class="product-item">
                <figure>
                  <RouterLink :to="{ name: 'Cakeitem', params: { id: cake.cakeId } }">
                    <img :src="`https://localhost:7162/cakesImg/${cake.cakeImg}`" class="tab-image" alt="Cake Image" />
                  </RouterLink>
                </figure>
                <h3>
                  <RouterLink :to="{ name: 'Cakeitem', params: { id: cake.cakeId } }">
                    {{ cake.cakeName }}
                  </RouterLink>
                </h3>
                <span class="flavor">{{ cake.cakeStyles }}</span><br>
                <span class="qty">一盒</span>
                <span class="price">{{ cake.cakePrice }}</span>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="input-group product-qty">
                    <button type="button" class="quantity-left-minus btn btn-danger btn-number" @click="decreaseQuantity(cake.cakeId)">-</button>
                    <input type="text" name="quantity" id="quantity" class="form-control input-number" 
                    :value="ItemQuantity[cake.cakeId]" />
                    <button type="button" class="quantity-right-plus btn btn-success btn-number" @click="increaseQuantity(cake.cakeId)">+</button>
                  </div>
                  <a href="#" class="nav-link"@click.prevent="addToBudget(cake)">加入預算規劃表 <iconify-icon icon="uil:shopping-cart" /></a>
                </div>
              </div>
            </div>
          </div>

          <!-- 桌菜列表 -->
          <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <div class="col" v-for="dish in dishes" :key="dish.dishesId">
              <div class="product-item">
                <figure>
                  <RouterLink :to="{ name: 'dishItem', params: { id: dish.dishesId } }">
                    <img :src="`https://localhost:7162/Dish1/${dish.dishesImg}`" class="tab-image" />
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
                    <button type="button" class="quantity-left-minus btn btn-danger btn-number" @click="decreaseQuantity(dish.dishesId)">-</button>
                    <input type="text" name="quantity" id="quantity" class="form-control input-number" 
                    v-model="ItemQuantity[dish.dishesId]" />
                    <button type="button" class="quantity-right-plus btn btn-success btn-number" @click="increaseQuantity(dish.dishesId)">+</button>
                  </div>
                  <a href="#" class="nav-link"@click.prevent="addToBudget(dish)">加入預算規劃表 <iconify-icon icon="uil:shopping-cart" /></a>
                </div>

              </div>
            </div>
          </div>

          <!-- 禮車列表 -->
          <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <div class="col" v-for="car in cars" :key="car.carId">
              <div class="product-item">
                <figure>
                  <RouterLink :to="{ name: 'carItem', params: { id: car.carId } }">
                    <img :src="`https://localhost:7162/Car1/${car.carImg}`" class="tab-image"/>
                  </RouterLink>
                </figure>
                <h3>
                  <RouterLink :to="{ name: 'carItem', params: { id: car.carId } }">
                    {{ car.carName }}
                  </RouterLink>
                </h3>
                <span class="flavor">{{ car.carDetail }}</span><br>
                <span class="qty">{{ car.passengerCapacity }}人座</span>
                <span class="price">{{ car.rentalPerDay }}</span>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="input-group product-qty">
                    <button type="button" class="quantity-left-minus btn btn-danger btn-number" @click="decreaseQuantity(car.carId)">-</button>
                    <input type="text" name="quantity" id="quantity" class="form-control input-number" 
                    v-model="ItemQuantity[car.carId]" />
                    <button type="button" class="quantity-right-plus btn btn-success btn-number" @click="increaseQuantity(car.carId)">+</button>
                  </div>
                  <a href="#" class="nav-link"@click.prevent="addToBudget(car)">加入預算規劃表 <iconify-icon icon="uil:shopping-cart" /></a>
                </div>

              </div>
            </div>
          </div>

          
              <!-- 場地預訂按鈕 -->
              <div class="row">
                <div v-if="showVenueButton" class="venue-button d-flex flex-column justify-content-center align-items-center my-4">
                  <h2 class="text-center mb-5">欲了解場地以及可預訂時間等資訊，請前往場地預定畫面。</h2>
                  <RouterLink :to="{ name: 'venue' }" class="venueButton">
                  前往場地預訂
                  </RouterLink>
                </div>
              </div>
        </div>
      </div>
    </section>
    <ShopReviewComponent :shopId="shopId"></ShopReviewComponent>
  </div>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css';

</style>
