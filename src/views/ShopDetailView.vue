<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import ShopReviewComponent from '@/components/shopReviewComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const shopId = route.params.id;
const shop = ref([]);
const dataURL = `https://localhost:7048/api/Shops/${shopId}/data` //設立取得資料的URL

const cakes = ref([]);
const cars = ref([]);
const dishes = ref([]);


// 初始化函數，依序取得商店和各分類產品資料
const initializeFunction = async () => {
  try {
    // 取得商店資料
    const shopResponse = await fetch(`https://localhost:7048/api/Shops/${shopId}`);
    shop.value = await shopResponse.json();
    console.log('商店資料:', shop.value);

  }
  catch (error) {
    console.error('載入失敗:', error);
  }
};

// 取得 shopId 並發送請求到後端 API
const fetchShopData = async (shopId) => {
  //GET請求，將shopId加入到URL中
  const response = await fetch(dataURL);

  const data = await response.json();

  cakes.value = data.cakes;
  cars.value = data.cars;
  dishes.value = data.dishes;

  console.log('取得的商店資料:', data);

};

// 在元件掛載時執行
initializeFunction();
fetchShopData();

</script>
<template>
  <div>
    <SampleComponent>
      <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;">
      </div>
    </SampleComponent>

    <section id="latest-blog" class="py-5">
      <div class="container-fluid">
        <div>
          <div class="section-header d-flex align-items-center justify-content-between my-5">
            <div class="btn-wrap align-right">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="image-holder zoom-effect">
                <a href="#">
                  <img :src="`https://localhost:7162/ShopLogo/${shop.shopLogo}`" alt="post" class="card-img-top">
                </a>
              </div>
              <div class="card-body">
                <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                </div>
              </div>
            </article>
          </div>
          <div class="col-lg-6 col-md-12">
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="image-holder zoom-effect">
              </div>
              <div class="card-body">
                <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                </div>
                <div class="post-header">
                  <h2 class="post-title">
                    <a href="#" class="text-decoration-none">商家名稱：{{ shop.shopName }}</a>
                  </h2>
                  <br>
                  <br>
                  <div class="post-header">
                    <h5></h5>
                  </div>
                  <br>
                  <br>
                  <br>
                  <h3>內容物：</h3>
                  <h4></h4>
                  <br>
                  <h3>過敏原資訊：</h3>
                  <h4></h4>
                  <br>
                </div>
              </div>
            </article>
          </div>
        </div> <!--上面介紹欄結束，下面放各自旗下產品-->
        <div class="tabs-header d-flex justify-content-between border-bottom my-5">
          <h3>品牌產品列表</h3>
        </div>
        <!-- Tabs Content -->
        <div class="tab-content mt-5" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
            <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

              <!-- cake Item -->
              <div class="col" v-for="cake in cakes" :key="cake.cakeID">
                <div class="product-item">
                  <figure>
                    <RouterLink :to="{ name: 'Cakeitem', params: { id: cake.cakeId } }">
                      <img :src="`https://localhost:7162/cakesImg/${cake.cakeImg}`" class="tab-image"
                        alt="Cake Image" />
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
                      <span class="input-group-btn">
                        <button type="button" class="quantity-left-minus btn btn-danger btn-number"
                          @click="decreaseQuantity(cake.cakeID)">
                          -
                        </button>
                      </span>
                      <input type="text" id="quantity" name="quantity" class="form-control input-number" />
                      <span class="input-group-btn">
                        <button type="button" class="quantity-right-plus btn btn-success btn-number"
                          @click="increaseQuantity(cake.cakeID)">
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
              <!-- /cake Item -->
            </div> <!-- /product-grid -->
          </div> <!-- /tab-pane -->

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
                    <span class="input-group-btn">
                      <button type="button" class="quantity-left-minus btn btn-danger btn-number"
                        @click="decreaseQuantity(dish.dishesId)">
                        -
                      </button>
                    </span>
                    <input type="text" id="quantity" name="quantity" class="form-control input-number" />
                    <span class="input-group-btn">
                      <button type="button" class="quantity-right-plus btn btn-success btn-number"
                        @click="increaseQuantity(dish.dishesId)">
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
          </div> <!-- /product-grid -->
          <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 
                            row-cols-lg-4 row-cols-xl-5">

            <!-- Product Item -->
            <div class="col" v-for="car in cars">
              <div class="product-item">
                <figure>
                  <RouterLink :to="{ name: 'carItem', params: { id: car.carId } }">
                    <img :src="`https://localhost:7162/Car1/${car.carImg}`" class="tab-image" />
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
                    <span class="input-group-btn">
                      <button type="button" class="quantity-left-minus btn btn-danger btn-number"
                        @click="decreaseQuantity(car.carId)">
                        -
                      </button>
                    </span>
                    <input type="text" id="quantity" name="quantity" class="form-control input-number" />
                    <span class="input-group-btn">
                      <button type="button" class="quantity-right-plus btn btn-success btn-number"
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


        </div> <!-- /tab-content -->
      </div>
    </section>
    <ShopReviewComponent :shopId="shopId"></ShopReviewComponent>
  </div>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css';
/* 引用 CSS 文件 */
</style>