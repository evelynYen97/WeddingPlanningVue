<script setup>
import { ref, computed } from 'vue';
import ShopView from './ShopView.vue';

const API_URL = 'https://localhost:7048/api/Shops'; 

const allShops = ref([]); // 存放所有商家資料
const selectedCategory = ref('all'); // 存放目前選中的分類

// 從 API 讀取所有商家資料
const loadAllShop = async () => {
  const response = await fetch(API_URL);
  const datas = await response.json();
  console.log(datas);
  allShops.value = datas;
};

loadAllShop();

// 根據選擇的分類過濾商家
const filteredShops = computed(() => {
  if (selectedCategory.value === 'all') {
    return allShops.value; // 顯示全部商家
  }
  // 根據 `shopSort` 過濾商家
  return allShops.value.filter(shop => shop.shopSort === selectedCategory.value);
});
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
                  <div class="col" v-for="shop in filteredShops" :key="shop.id">
                    <div class="product-item">
                      <figure>
                        <a href="#" title="Product Title">
                          <img 
                            src="../assets/images/thumb-bananas.png"
                            class="tab-image" 
                          />
                        </a>
                      </figure>
                      <h3>{{ shop.shopName }}</h3>
                      <span class="flavor">{{ shop.shopSort }}</span><br>
                      <span class="qty">評價：{{ shop.shopRating }}</span>
                      <span class="price">付款方式：{{ shop.payment }}</span>
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
