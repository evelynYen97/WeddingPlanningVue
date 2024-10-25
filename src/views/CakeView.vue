<script setup>
import {ref, computed} from 'vue'
import ShopView from './ShopView.vue';

const API_URL = 'https://localhost:7048/api/Cakes'

const cakes = ref([]) //宣告放在名為cakes的陣列中
const selectedCategory = ref('all') //讀取目前篩選的資料

//讀取API資料
const loadcakes = async() => {
  const response = await fetch(API_URL)
  const datas = await response.json()
  console.log(datas)
  cakes.value = datas
}

//根據中西式選擇資料
const filteredStyle = computed(() => {
  if (selectedCategory.value === 'all') {
    return cakes.value; // 顯示全部商家
  }
  // 根據 `cakeStyles` 過濾商家
  return cakes.value.filter(cake => cake.cakeStyles === selectedCategory.value);
});



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
                    :class="{ active: selectedCategory === '中式' }"
                    @click.prevent="selectedCategory = '中式'">
                    中式
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '西式' }"
                    @click.prevent="selectedCategory = '西式'">
                    西式
                  </a>
                  <a 
                    href="#" 
                    class="nav-link text-uppercase fs-6" 
                    :class="{ active: selectedCategory === '中西式' }"
                    @click.prevent="selectedCategory = '中西式'">
                    中西式
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
                            row-cols-lg-4 row-cols-xl-5">
                  
                  <!-- Product Item -->
                  <div class="col" v-for="cake in filteredStyle" >
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
