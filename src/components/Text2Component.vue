<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';

const animateTextAndImage = () => {
  // 為文字加動畫
  gsap.fromTo(
    ".text2-container h3",
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
  );

  gsap.fromTo(
    ".text2-container p",
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, duration: 1, stagger: 0.3 }
  );

  // 為圖片加動畫
  gsap.fromTo(
    ".service-image",
    { opacity: 0, scale: 0.5, y: -50 }, // 初始狀態：隱形、縮小、移動
    { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.2 } // 動畫結束狀態：顯示、縮放、回到原位
  );
};

let observer;

onMounted(() => {
  const container = document.querySelector('.text2-container');

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateTextAndImage(); // 當進入視窗時觸發動畫
      }
    });
  }, { threshold: 0.5 }); // 設定條件：容器至少50%進入視窗

  observer.observe(container);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <!-- 服務部分 -->
  <div class="text2-container">
      <div class="my-5">
          <div class="row text-center">
              <div class="col-md-4 service-container">
                  <img src="/src/assets/images/homeImage/icon1.png" alt="Image 1" class="service-image">
                  <h3>規劃工具整合</h3>
                  <p>輕鬆管理預算、賓客與設計，讓婚禮準備更輕鬆。</p>
              </div>
              <div class="col-md-4 service-container">
                  <img src="/src/assets/images/homeImage/icon2.png" alt="Image 2" class="service-image">
                  <h3>個性化規劃</h3>
                  <p>我們確保您的慶典完美反映您的獨特風格和願景。</p>
              </div>
              <div class="col-md-4 service-container">
                  <img src="/src/assets/images/homeImage/icon3.png" alt="Image 3" class="service-image">
                  <h3>婚禮商家推選</h3>
                  <p>精心挑選的婚禮商家，為您的婚禮帶來無與倫比的光彩。</p>
              </div> 
          </div>
      </div>
  </div>
</template>

<style lang="css" scoped>
   /* 圖片容器設置 */
    .service-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* 水平居中 */
    }

    /* 圖片樣式 */
    .service-image {
        width: 80px !important; /* 確保圖片大小被強制設定 */
        height: 80px !important;
        margin-bottom: 20px; /* 控制圖片和標題之間的距離 */
        object-fit: contain; /* 使圖片不失真 */
    }

    @font-face {
        font-family: 'ChenYuluoyan-Thin';
        src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    .text2-container h3 {
        font-family: 'ChenYuluoyan-Thin', sans-serif;
        font-size: 2.5em;
    }

    .text2-container p {
        font-size: 1.2em;
    }
    
    .text2-container {
        margin: 50px;
    }

     /* 滑鼠 */
     * {
        cursor: none; /* 隱藏原生滑鼠 */
    }
</style>
