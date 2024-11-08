<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router'; 

const route = useRoute();
const venueId = route.params.id;
const venue = ref({}); // 用於儲存場地詳細資料

const initializeFunction = async () => {
  try {
    const response = await fetch(`https://localhost:7048/api/Venues/${venueId}`);
    venue.value = await response.json();
    console.log(venue.value);
  } 
  catch (error) {
    console.error('載入失敗:', error);
  }
};

// 控制圖片的索引
const imageIndex = ref(0);
let intervalId; // 使用 let 來宣告 intervalId

// 設置計時器，每隔3秒切換一次圖片
const startAutoSwitch = () => {
  intervalId = setInterval(() => {
    toggleImage();
  }, 5000); // 3秒切換一次
};

// 停止自動輪播
const stopAutoSwitch = () => {
  clearInterval(intervalId);
};

// 切換圖片的函數
const toggleImage = () => {
  imageIndex.value = imageIndex.value === 0 ? 1 : 0;
};

// 使用者手動切換圖片時觸發的函數
const manualToggleImage = () => {
  stopAutoSwitch();  // 停止當前的自動輪播
  toggleImage();     // 切換圖片
  startAutoSwitch(); // 重新啟動自動輪播
};

onMounted(() => {
  startAutoSwitch(); // 初始化場地資料並啟動自動輪播
  initializeFunction();
});

onUnmounted(() => {
  stopAutoSwitch(); // 組件卸載時停止輪播
});
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
              <li class="breadcrumb-item "><RouterLink :to="{name:'venue'}">可預訂場地列表</RouterLink></li>
              <li class="breadcrumb-item active" aria-current="page">{{ venue.venueName }}</li>
            </ol>
          </nav>
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="image-holder zoom-effect">
                <a href="#">
                  <img
                    :src="`https://localhost:7162/Ven1/${imageIndex === 0 ? venue.venueImg : venue.venueImg2}`"
                    style="width: 1000px;"
                    alt="post"
                    class="card-img-top"
                  />
                </a>
                <!-- 手動切換圖片的按鈕 -->
                <div class="d-flex justify-content-center mt-3">
                    <button @click="manualToggleImage" class="venueButton btn-lg mt-3 ">切換圖片</button>
                </div>
              </div>
              <div class="card-body">
                <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center"></div>
              </div>
            </article>
          </div>
          <div class="col-lg-6 col-md-12">
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="image-holder zoom-effect"></div>
              <div class="card-body">
                <div class="post-header">
                  <h2 class="post-title">
                    <a href="#" class="text-decoration-none">名稱：{{ venue.venueName }}</a>
                  </h2>
                  <h5>{{ venue.venueStyle }}場地</h5>
                  <br />
                  <h5>{{ venue.venueInfo }}</h5>
                  <br /><br /><br />
                  <h3>用途：{{ venue.venueFunction }}</h3>
                  <h4>{{ venue.inOurDoor }}場地</h4>
                  <br />
                  <h3>可容納桌次：{{ venue.tableCapacity }}</h3>
                  <h3>可容納人數：{{ venue.guestCapacity }}</h3>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css'; /* 引用 CSS 文件 */

</style>
