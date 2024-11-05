<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const shopId = route.params.id;
const shop = ref([]);
const cakes = ref([]);
const cars = ref([]);
const dishes = ref([]);
const showVenueButton = ref(false);
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

// 取得產品資料並檢查是否喜餅、汽車、桌菜皆無資訊
const fetchShopData = async () => {
  try {
    const response = await fetch(dataURL);
    const data = await response.json();

    cakes.value = data.cakes;
    cars.value = data.cars;
    dishes.value = data.dishes;

    console.log('取得的產品資料:', data);

    // 檢查是否喜餅、汽車、菜餚皆無資訊，才顯示按鈕
    if(cakes.value.length === 0 && cars.value.length === 0 && dishes.value.length === 0){
      showVenueButton.value = true;
    }
  } catch (error) {
    console.error('載入產品資料失敗:', error);
  }
};

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
                <h3>內容物：</h3>
                <h3>過敏原資訊：</h3>
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
                    <button type="button" class="quantity-left-minus btn btn-danger btn-number" @click="decreaseQuantity(cake.cakeID)">-</button>
                    <input type="text" id="quantity" name="quantity" class="form-control input-number"/>
                    <button type="button" class="quantity-right-plus btn btn-success btn-number" @click="increaseQuantity(cake.cakeID)">+</button>
                  </div>
                  <a href="#" class="nav-link">加入預算規劃表 <iconify-icon icon="uil:shopping-cart" /></a>
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
  </div>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css';

/* 按鈕樣式 */
.venueButton {
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 10px 20px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* 陰影效果 */
  transition: background-color 0.3s, color 0.3s; /* 過渡效果 */
  text-decoration: none; /* 移除文字下方的直線 */
}

.venueButton:hover {
  background-color: black;
  color: white;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3); /* 加強陰影效果 */
}
</style>
