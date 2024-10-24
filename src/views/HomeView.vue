<script setup>
    import SampleComponent from '@/components/SampleComponent.vue';
import { onMounted } from 'vue';

    onMounted(() => {
    // You can add any JS logic here if needed
    });
</script>

<template>
    <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
  <div class="main-container">

    
    <div class="container my-5">
        <div class="row align-items-center">
            <div class="col-md-6">
            <img src="/src/assets/images/navImage.jpg" alt="婚禮" class="img-fluid rounded">
            </div>
            <div class="col-md-6 text-center text-md-start">
            <h2 class="display-4">永恆的誓約</h2>
            <h3>慶祝您的愛情</h3>
            <p class="lead">
                與我們的專家團隊一起發現完美的婚禮規劃體驗。從精心挑選場地到提供專業建議，我們將確保您的特別日子充滿難忘的瞬間。
            </p>
            <!-- <a href="#" class="btn btn-primary btn-lg">立即探索</a> -->
            </div>
        </div>
    </div>

    <!-- 服務部分 -->
    <div class="container my-5">
        <div class="row text-center">
            <div class="col-md-4">
                <i class="bi bi-geo-alt-fill display-3 text-grey mb-3"></i>
                <h3>驚人的場地</h3>
                <p>我們為您挑選了一系列壯麗的場地，提升您的婚禮日體驗。</p>
                <a href="#" class="btn btn-outline-secondary">預訂參觀</a>
            </div>
            <div class="col-md-4">
                <i class="bi bi-calendar-check-fill display-3 text-grey mb-3"></i>
                <h3>個性化規劃</h3>
                <p>我們確保您的慶典完美反映您的獨特風格和願景。</p>
            </div>
            <div class="col-md-4">
                <i class="bi bi-people-fill display-3 text-grey mb-3"></i>
                <h3>婚禮商家推選</h3>
                <p>精選優質婚禮商家，助您一站式解決所有需求，讓您的婚禮更無憂。</p>
            </div> 
        </div>
    </div>

     <!-- 婚禮企劃 -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-12 order-0 planImage-container ">
                <img src="/src/assets/images/navImage.jpg" alt="婚禮" class="img-fluid rounded planImage-size">
            </div> 

            <div class="col-md-12 order-1 text-center">
                <h2 class="display-4">婚禮企劃書</h2>
                <h3>精心策劃，隨心所欲</h3>
                <p class="lead">
                    我們的婚禮企劃書將為您提供個性化的婚禮藍圖，幫助您在每一步中做出明智的選擇。從主題設計到細節執行，讓您的夢想婚禮成為現實。
                </p>
            </div>          
        </div>
    </div>

    <hr />

    <!-- 婚佈 預算 流程-->
    <div class="container my-5">
        <!-- 婚佈 -->
        <div class="row process-flow">
            <!-- 左側圖片部分 -->
            <div class="col-md-4 d-flex justify-content-end">
                <img src="/src/assets/images/navImage.jpg" alt="場地圖片" class="img-fluid rounded">
            </div>

             <!-- 統一的箭頭部分
             <div class="col-md-1 d-flex justify-content-center align-items-center">
                <img src="/src/assets/images/homeImage/arrow.png" alt="">
            </div> -->

            <!-- 右側文字部分 -->
            <div class="col-md-7">
                <h2 class="display-4">場景模擬器</h2>
                <h3>一鍵預覽您的夢想婚禮</h3>
                <p class="lead">
                    利用我們的場景模擬器，您可以視覺化婚禮場地的每個細節，提前體驗最完美的婚禮氛圍。
                </p>
            </div>
        </div>

        <!-- 預算 -->
        <div class="row process-flow mt-4">
            <!-- 右側圖片部分 -->
            <div class="col-md-4 order-md-2 d-flex justify-content-start">
                <img src="/src/assets/images/navImage.jpg" alt="預算圖片" class="img-fluid rounded">
            </div>

            <!-- 左側文字部分 -->
            <div class="col-md-7 order-md-1">
                <h2 class="display-4">預算規劃</h2>
                <h3>輕鬆掌控每一分預算</h3>
                <p class="lead">
                    我們的預算規劃工具將幫助您清晰地了解每項開支，確保您的婚禮在預算內實現願景。
                </p>
            </div>
        </div>

        <!-- 流程 -->
        <div class="row process-flow mt-4">
            <!-- 左側圖片部分 -->
            <div class="col-md-4 d-flex justify-content-end">
                <img src="/src/assets/images/navImage.jpg" alt="流程圖片" class="img-fluid rounded">
            </div>
    

            <!-- 右側文字部分 -->
            <div class="col-md-7">
                <h2 class="display-4">婚禮流程規劃</h2>
                <h3>每一刻都不容錯過</h3>
                <p class="lead">
                    我們的婚禮流程規劃服務將協助您設計詳細的時間表，確保每個環節流暢進行。
                </p>
            </div>
        </div>
    </div>

    <hr />


    <!-- 婚禮商家展示 -->
    <div class="container my-5">
        <h2 class="display-4 text-center mb-4">婚禮商家推選</h2>
        <div class="row">
            <div class="col-md-3">
                <div class="card mb-4">
                    <img src="/src/assets/images/homeImage/婚宴會場.jpg" class="card-img-top images-size" alt="婚宴會場">
                    <div class="card-body">
                        <h5 class="card-title">婚宴會場</h5>
                        <p class="card-text">選擇我們精選的婚宴會場，為您的婚禮創造完美的氛圍。</p>
                        <a href="#" class="btn btn-outline-secondary">了解更多</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card mb-4">
                    <img src="/src/assets/images/homeImage/婚宴菜餚.jpg" class="card-img-top images-size" alt="婚宴菜餚">
                    <div class="card-body">
                        <h5 class="card-title">婚宴菜餚</h5>
                        <p class="card-text">我們提供多樣化的婚宴菜餚選擇，滿足每位賓客的味蕾。</p>
                        <a href="#" class="btn btn-outline-secondary">了解更多</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card mb-4">
                    <img src="/src/assets/images/homeImage/禮車.jpg" class="card-img-top images-size" alt="禮車">
                    <div class="card-body">
                        <h5 class="card-title">禮車</h5>
                        <p class="card-text">豪華禮車服務，為您和賓客提供舒適的接送體驗。</p>
                        <a href="#" class="btn btn-outline-secondary">了解更多</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card mb-4">
                    <img src="/src/assets/images/homeImage/喜餅.jpg" class="card-img-top images-size" alt="喜餅">
                    <div class="card-body">
                        <h5 class="card-title">喜餅</h5>
                        <p class="card-text">精美的喜餅選擇，讓您的婚禮更添甜蜜。</p>
                        <a href="#" class="btn btn-outline-secondary">了解更多</a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- 行動呼籲 -->
    <div class="container text-center my-8">
        <h2>永恆的優雅，個性化的完美</h2>
        <p>從挑選完美的供應商團隊到協調每一個細節，我們將確保您的婚禮慶典完美展現您的願景。</p>
        <!-- <a href="#" class="btn btn-primary btn-lg">探索更多</a> -->
    </div>

    </div>

</template>

<style lang="css" scoped>
    @font-face {
    font-family: 'ChenYuluoyan-Thin'; /* 自定義字體名稱 */
    src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype'); /* 字體檔案路徑 */
    font-weight: normal;
    font-style: normal;
    }

    h1, h2, h3 {
        font-family: 'ChenYuluoyan-Thin', sans-serif; /* 將自定義字體應用於標題、段落、按鈕等 */
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


    
    /* 空格 */


    .planImage-container {
        display: flex;
        justify-content: center; /* 水平置中 */
        align-items: center;     /* 垂直置中 */
        margin-bottom: 50px;
    }

    .planImage-size {
        max-width: 50%; /* 將圖片的寬度設置為父容器寬度的 50% */
        height: auto;   /* 保持圖片的比例 */
    }



    /* 空格 */


    .process-flow {
        margin-bottom: 50px; 
    }


</style>