<script setup>
    import OurTeamComponent from '@/components/OurTeamComponent.vue';
    import CoverComponent from '@/components/CoverComponent.vue';
    import TextComponent from '@/components/TextComponent.vue';
    import Text2Component from '@/components/Text2Component.vue';

    import { ref, onMounted, onUnmounted } from 'vue';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';
import { RouterLink } from 'vue-router';

    gsap.registerPlugin(ScrollTrigger);
    // 滑鼠相關的狀態管理
    const isClicking = ref(false);
    const isHovering = ref(false);
    const cursorPosition = ref({ x: 0, y: 0 });



    onMounted(() => {
    
    // 延遲將滾動位置設置到頂部
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);

    // 滾動動畫設定
    const blocks = gsap.utils.toArray('.scroll-block');

    gsap.to(blocks, {
      xPercent: -100 * (blocks.length - 1), // 讓區塊水平滾動
      scrollTrigger: {
        trigger: '.main-container',
        start: "bottom bottom", // 讓動畫從頂部開始
        pin: true, // 固定容器
        scrub: true, // 開啟 scrub，使動畫與滾動同步
        snap: 1 / (blocks.length - 1), // 讓滾動更平滑
        
      },
      ease: 'none',
    });

    gsap.from(".merchant-card", {
        scrollTrigger: {
        trigger: ".merchant-card",
        start: "top 80%",
        end: "bottom top",
        markers: false,
        },
        opacity: 0,
        y: 100,
        stagger: 0.2, // 讓每個卡片延遲顯示
        duration: 1,
    });

     // 婚禮商家推選標題動畫
     gsap.from(".merchant-title", {
      scrollTrigger: {
        trigger: ".merchant-title",
        start: "top 80%",
        end: "bottom top",
        markers: false,
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // 行動呼籲區塊動畫
    gsap.from(".action-content", {
      scrollTrigger: {
        trigger: ".action-content",
        start: "top 80%",
        end: "bottom top",
        markers: false,
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });



    const handleMouseMove = (e) => {
        cursorPosition.value = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
        isClicking.value = true;
    };

    const handleMouseUp = () => {
        isClicking.value = false;
    };

    const handleMouseEnter = () => {
        isHovering.value = true;
    };

    const handleMouseLeave = () => {
        isHovering.value = false;
    };

    // 滑鼠事件監聽器
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const hoverElements = document.querySelectorAll(".hover-target");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
    });

    // 卸載時移除滑鼠事件
    onUnmounted(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);

        hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        });
    });
    
    });
  
</script>

<template>

<!-- 封面設定 -->
<CoverComponent></CoverComponent>
<!-- 封面設定 -->
<TextComponent></TextComponent>
<Text2Component></Text2Component>

<!-- 滾動區塊 -->
<div class="main-container">
  <div class="scroll-container">

    <!-- 婚佈 -->
    <div class="scroll-block scroller-color">
      <div class="container">
        <div class="scroll-row">

            <!-- 左側圖片部分 -->
            <div class="image-container">
                <img src="/src/assets/images/homeImage/花1.svg" alt="場地圖片" class="rounded">
            </div>
            <!-- 右側文字部分 -->
            <div class="text-container">
                <h2>場景模擬器</h2>
                <p>
                    利用我們的場景模擬器，您可以視覺化婚禮場地的每個細節，提前體驗最完美的婚禮氛圍。
                </p>
                <h3>
                    <span class="line"></span> 一鍵預覽您的夢想婚禮 <span class="line"></span>
                </h3>
            </div>     
        </div>
      </div>
    </div>  

    <!-- 預算 -->
    <div class="scroll-block scroller-color">
      <div class="container">
        <div class="scroll-row">
        <!-- 右側圖片部分 -->
        <div class="image-container">
          <img src="/src/assets/images/homeImage/花2.svg" alt="預算圖片" class="rounded" style="width: 230px;">
        </div>
        <!-- 左側文字部分 -->
        <div class="text-container">
        <h2>預算規劃</h2>
        <p>
              我們的預算規劃工具將幫助您清晰地了解每項開支，確保您的婚禮在預算內實現願景。
        </p>
        <h3>
            <span class="line"></span> 輕鬆掌控每一分預算 <span class="line"></span>
        </h3>
        </div>
        </div>
      </div>
    </div>

    <!-- 流程 -->
    <div class="scroll-block scroller-color">
      <div class="container">
        <div class="scroll-row">
        <!-- 左側圖片部分 -->
        <div class="image-container">
          <img src="/src/assets/images/homeImage/花3.svg" alt="流程圖片" class="rounded" style="width: 300px; height: auto; ">
        </div>
        <!-- 右側文字部分 -->
        <div class="text-container">
          <h2>婚禮流程規劃</h2>
          <p>
            我們的婚禮流程規劃服務將協助您設計詳細的時間表，確保每個環節流暢進行。
          </p>
          <h3>
            <span class="line"></span> 每一刻都不容錯過 <span class="line"></span>
          </h3>
        </div>
        </div>
      </div>
    </div>
    

    <!-- 婚禮企劃書 -->
    <div class="scroll-block scroller-color">
        <div class="container">
            <div class="scroll-row">
            <!-- 左側圖片部分 -->
            <div class="image-container">
                <img src="/src/assets/images/homeImage/花4.svg" alt="婚禮企劃書" class="rounded">
            </div>
            <!-- 右側文字部分 -->
            <div class="text-container">
                <h2>婚禮企劃書</h2>
                <p>
                    我們的婚禮企劃書將為您提供個性化的婚禮藍圖，幫助您在每一步中做出明智的選擇。從主題設計到細節執行，讓您的夢想婚禮成為現實。
                </p>
                <h3>
                    <span class="line"></span> 精心策劃，隨心所欲 <span class="line"></span>
                </h3>
            </div>
            </div>
        </div>
    </div>

    

  </div>
</div>

<!-- 商家show -->
<div class="merchant-container">
    <!-- 婚禮商家展示 -->
    <div class="container my-5">
      <h2 class="display-4 text-center merchant-title">婚禮商家推選</h2>
      <div class="row">
        <div class="col-md-3 merchant-card">
          <div class="card mb-4">
            <img
              src="/src/assets/images/homeImage/婚宴會場.jpg"
              class="card-img-top images-size"
              alt="婚宴會場"
            />
            <div class="card-body">
              <h5 class="card-title">婚宴會場</h5>
              <p class="card-text">
                選擇我們精選的婚宴會場，為您的婚禮創造完美的氛圍。
              </p>
              <div class="btn-container">
                <RouterLink :to="{name:'venue'}" class="btn btn-outline-secondary">了解更多</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 merchant-card">
          <div class="card mb-4">
            <img
              src="/src/assets/images/homeImage/婚宴菜餚.jpg"
              class="card-img-top images-size"
              alt="婚宴菜餚"
            />
            <div class="card-body">
              <h5 class="card-title">婚宴菜餚</h5>
              <p class="card-text">
                我們提供多樣化的婚宴菜餚選擇，滿足每位賓客的味蕾。
              </p>
              <div class="btn-container">
                <RouterLink :to="{name:'dish'}" class="btn btn-outline-secondary">了解更多</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 merchant-card">
          <div class="card mb-4">
            <img
              src="/src/assets/images/homeImage/禮車.jpg"
              class="card-img-top images-size"
              alt="禮車"
            />
            <div class="card-body">
              <h5 class="card-title">禮車</h5>
              <p class="card-text">
                豪華禮車服務，為您和賓客提供舒適的接送體驗。
              </p>
              <div class="btn-container">
                <RouterLink :to="{name:'car'}" class="btn btn-outline-secondary">了解更多</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 merchant-card">
          <div class="card mb-4">
            <img
              src="/src/assets/images/homeImage/喜餅.jpg"
              class="card-img-top images-size"
              alt="喜餅"
            />
            <div class="card-body">
              <h5 class="card-title">喜餅</h5>
              <p class="card-text">
                精美的喜餅選擇，讓您的婚禮更添甜蜜。
              </p>
              <div class="btn-container">
                <RouterLink :to="{name:'cake'}" class="btn btn-outline-secondary">了解更多</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 行動呼籲 -->
    <div class="container text-center action-content">
      <h2>永恆的優雅，個性化的完美</h2>
      <p>
        從挑選完美的供應商團隊到協調每一個細節，我們將確保您的婚禮慶典完美展現您的願景。
      </p>
    </div>
  </div>
<!-- 商家show -->

<hr>
<!-- 團隊介紹 -->
<!-- <OurTeamComponent></OurTeamComponent> -->
<!-- 團隊介紹 -->

<!-- 滑鼠 -->
<div class="cursor" 
     :class="{ active: isHovering, click: isClicking }" 
     :style="{ left: cursorPosition.x + 'px', top: cursorPosition.y + 'px' }">
</div>
<!-- 滑鼠 -->

</template>

<style lang="css" scoped>
    /* 下面是滾動滑動樣式的css */

    body {
        overflow-x: hidden;
        height: 100vh;
    }

    .main-container {
        width: 100%;
        height: 100vh;
    }

    .scroll-container {
        display: flex;
        width: 400vw; /* 確保三個區塊能夠並排顯示 */
        height: 100%;
    }

    .scroll-block {
        width: 100vw; /* 每個區塊占據全寬 */
        height: 100%;
    }

    .main-container .container {
        padding: 30px; /* 去除內部間距 */
        margin: 200px auto;
        width: 1200px; /* 固定寬度 */
        height: 500px; /* 固定高度 */
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3)); /* 半透明漸層背景 */
        backdrop-filter: blur(10px); /* 模糊效果 */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 添加陰影效果 */
        border-radius: 10px; /* 調整邊角弧度 */
        display: flex;
        align-items: center;
        text-align: center;
        flex-direction: row; /* 水平排列 */
    }

    .scroll-row {
        border: 1.5px solid rgb(0, 0, 0);      
        border-radius: 10px;
        display: flex;
        gap: 50px;
        align-items: center; /* 水平對齊 */
        width: 100%;
        height: 100%;
    }

    .image-container {
        display: flex;
        justify-content: center; /* 垂直居中 */ 
        align-items: center;
        width: 50%; /* 固定寬度 */
        height: 100%; /* 固定高度 */
    }

    .text-container {
        display: flex;
        flex-direction: column; /* 讓子元素垂直排列 */
        justify-content: center;
        text-align: left;
        width: 50%; /* 固定寬度 */
        height: 100%; /* 固定高度 */
        margin-right: 50px;
    }

    .text-container h2,
    h3 {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* 設定文字陰影 */
    }

    .image-container img {
        width: 80%; /* 固定圖片寬度 */
        height: auto; /* 確保圖片按比例縮放 */
        max-height: 100%; /* 防止圖片過高 */
        border-radius: 10px;
    }

    .scroller-color {
        background-image: url('/src/assets/images/homeImage/滾動背景.jpg'); /* 替換為您的圖片路徑 4 5 6 7 8*/
        background-size: cover; /* 讓圖片覆蓋整個背景 */
        background-position: center; /* 讓圖片在容器中居中 */
        background-repeat: no-repeat; /* 防止圖片重複 */
    }

    .scroller-color2 {
        background-image: url('/src/assets/images/homeImage/滾動背景7.jpg'); /* 替換為您的圖片路徑 4 5 6 7 8*7/
        background-size: cover; /* 讓圖片覆蓋整個背景 */
        background-position: center; /* 讓圖片在容器中居中 */
        background-repeat: no-repeat; /* 防止圖片重複 */
    }

    .scroller-color3 {
        background-image: url('/src/assets/images/homeImage/滾動背景6.jpg'); /* 替換為您的圖片路徑 4 5 6 7 8*6/
        background-size: cover; /* 讓圖片覆蓋整個背景 */
        background-position: center; /* 讓圖片在容器中居中 */
        background-repeat: no-repeat; /* 防止圖片重複 */
    }

    .scroller-color4 {
        background-image: url('/src/assets/images/homeImage/滾動背景8.jpg'); /* 替換為您的圖片路徑 4 5 6 7 8*8/
        background-size: cover; /* 讓圖片覆蓋整個背景 */
        background-position: center; /* 讓圖片在容器中居中 */
        background-repeat: no-repeat; /* 防止圖片重複 */
    }
    /* 上面是滾動滑動樣式的css */

    @font-face {
        font-family: 'ChenYuluoyan-Thin'; /* 自定義字體名稱 */
        src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype'); /* 字體檔案路徑 */
        font-weight: normal;
        font-style: normal;
    }

    .merchant-container {
        margin-top: 60px;
        margin-bottom: 50px;
    }

    .action-content {
        margin-top: 50px;
    }
    .merchant-title {
        margin-bottom: 30px;
    }

    .text-container h1,
    h2,
    h3 {
        font-family: 'ChenYuluoyan-Thin', sans-serif; /* 將自定義字體應用於標題、段落、按鈕等 */
    }

    .text-container h2 {
        font-size: 3rem;
    }

    .text-container h3 {
        font-size: 2rem;
        display: flex;
        margin-top: 2.5rem;
        justify-content: center; /* 水平置中 */
        align-items: center; 
        text-align: center;
    }

    .text-container h3 .line {
    display: inline-block;
    width: 80px;
    margin: 0 20px; /* 可調整線條間的距離 */
    border-top: 2px solid #333; /* 線條樣式 */
    }

    .text-container p {
        font-size: 1.2rem;
    }

    .images-size {
        width: 100%; /* 讓圖片寬度填滿容器 */
        height: 200px; /* 設定固定高度 */
        object-fit: cover; /* 確保圖片不變形並裁切至填滿 */
    }

    .card-title {
        color: #333; 
        font-weight: bold; 
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* 讓按鈕位於底部 */
        height: 100%; /* 確保卡片內容占滿高度 */
    }

    .btn-container {
        display: flex;
        justify-content: flex-end; /* 將按鈕靠右對齊 */
    }

    /* 修改按鈕樣式 */
    .btn-outline-secondary {
        color: #333; /* 設置按鈕的文字顏色 */
        border-color: #333; /* 設置按鈕的邊框顏色 */
        background-color: transparent; /* 背景透明 */
        transition: background-color 0.3s, color 0.3s; /* 增加過渡效果 */
    }

    /* hover 時的樣式 */
    .btn-outline-secondary:hover {
        background-color: #333; /* hover 時的背景顏色 */
        color: #fff; /* hover 時的文字顏色 */
        border-color: #333; /* 邊框顏色與背景一致 */
    }

    /* 滑鼠 */
    * {
        cursor: none; /* 隱藏原生滑鼠 */
    }

    .cursor {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 1px solid black;
        position: fixed;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 999;
        transition: width 0.2s ease, height 0.2s ease;
    }

    .cursor.active {
        width: 1.5rem;
        height: 1.5rem;
    }

    .cursor.click {
        width: 1rem;
        height: 1rem;
    }
    /* 滑鼠 */
</style>
