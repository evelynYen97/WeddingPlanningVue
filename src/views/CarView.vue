<script setup>
import {ref, computed} from 'vue'
import ShopView from './ShopView.vue';

const API_URL =   'https://localhost:7048/api/Cars'

const cars = ref([]) //宣告放在名為cars的陣列中
const selectedCategory = ref('all'); // 存放目前選中的分類


//讀取API資料
const  loadCars = async() => {
  const response = await fetch(API_URL)
  const datas = await response.json()
  console.log(datas)
  cars.value = datas
}

// 根據選擇的分類過濾商家(幾人座)
const filtered = computed(() => {
  if (selectedCategory.value === 'all') {
    return cars.value; // 顯示全部商家
  }

  // 根據 `passengerCapacity` 過濾商家
  return cars.value.filter(car => car.
  passengerCapacity === parseInt (selectedCategory.value));
});


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

            <!-- Tabs Content -->
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" 
                   id="nav-all" 
                   role="tabpanel" 
                   aria-labelledby="nav-all-tab">

                <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 
                            row-cols-lg-4 row-cols-xl-5"
                            
                            >
                  
                  <!-- Product Item -->
                  <div class="col" v-for="car in filtered" >
                    <div class="product-item">
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img src="../assets/images/thumb-bananas.png" class="tab-image" />
                        </a>
                      </figure>
                      <h3>{{ car.carName }}</h3>
                      <span class="flavor">{{ car.carDetail }}</span><br>
                      <span class="qty">{{ car.passengerCapacity }}人座</span>
                      <span class="price">{{ car.rentalPerDay }}</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
                          <span class="input-group-btn">
                            <button type="button" 
                                    class="quantity-left-minus btn btn-danger btn-number" 
                                    data-type="minus"
                                    >
                              <svg width="16" height="16">
                                <use xlink:href="#minus"></use>
                              </svg>
                            </button>
                          </span>
                          <input type="text" 
                                 id="quantity" 
                                 name="quantity" 
                                 class="form-control input-number" 
                                 value="1" />
                          <span class="input-group-btn">
                            <button type="button" 
                                    class="quantity-right-plus btn btn-success btn-number" 
                                    data-type="plus">
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
