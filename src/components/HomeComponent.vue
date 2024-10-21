<script setup>
    import { onMounted } from 'vue';

    onMounted(() => {
    // You can add any JS logic here if needed
    });
</script>

<template>
  <div class="main-container">

    
    <div class="container my-5">
    <div class="row align-items-center">
        <div class="col-md-6">
        <img src="/src/assets/images/navbg/navImage.jpg" alt="婚禮" class="img-fluid rounded">
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
                <i class="bi bi-geo-alt-fill display-3 text-primary mb-3"></i>
                <h3>驚人的場地</h3>
                <p>我們為您挑選了一系列壯麗的場地，提升您的婚禮日體驗。</p>
                <a href="#" class="btn btn-outline-secondary">預訂參觀</a>
            </div>
            <div class="col-md-4">
                <i class="bi bi-calendar-check-fill display-3 text-primary mb-3"></i>
                <h3>個性化規劃</h3>
                <p>我們確保您的慶典完美反映您的獨特風格和願景。</p>
            </div>
            <div class="col-md-4">
                <i class="bi bi-people-fill display-3 text-primary mb-3"></i>
                <h3>婚禮商家推選</h3>
                <p>精選優質婚禮商家，助您一站式解決所有需求，讓您的婚禮更無憂。</p>
            </div> 
        </div>
    </div>

    <!-- 婚禮企劃 -->
    <div class="container my-5">
    <div class="row">
        <div class="col-md-6 order-1">
            <img src="/src/assets/images/navbg/navImage.jpg" alt="婚禮" class="img-fluid rounded">
        </div> 
        <div class="col-md-6 order-0">
            <h2 class="display-4">婚禮企劃書</h2>
            <h3>精心策劃，隨心所欲</h3>
            <p class="lead">
                我們的婚禮企劃書將為您提供個性化的婚禮藍圖，幫助您在每一步中做出明智的選擇。從主題設計到細節執行，讓您的夢想婚禮成為現實。
            </p>
        </div>          
    </div>
    </div>

    <!-- 場佈模擬器 -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 order-0">
                <img src="/src/assets/images/navbg/navImage.jpg" alt="婚禮" class="img-fluid rounded">
            </div>
            <div class="col-md-6 order-1">
                <h2 class="display-4">場景模擬器</h2>
                <h3>一鍵預覽您的夢想婚禮</h3>
                <p class="lead">
                    利用我們的場景模擬器，您可以視覺化婚禮場地的每個細節，從佈置到色彩搭配，提前體驗最完美的婚禮氛圍，讓您的計劃更具信心。
                </p>
            </div>          
        </div>
    </div>


    <!-- 預算規劃 -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 order-1">
                <img src="/src/assets/images/navbg/navImage.jpg" alt="婚禮" class="img-fluid rounded">
            </div> 
            <div class="col-md-6 order-0">
                <h2 class="display-4">預算規劃</h2>
                <h3>輕鬆掌控每一分預算</h3>
                <p class="lead">
                    我們的預算規劃工具將幫助您清晰地了解每項開支，合理配置資金，確保您的婚禮不僅美好，還能在預算內完美實現您的願景。
                </p>
            </div>          
        </div>
    </div>


    <!-- 婚禮流程規劃 -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 order-0">
                <img src="/src/assets/images/navbg/navImage.jpg" alt="婚禮" class="img-fluid rounded">
            </div> 
            <div class="col-md-6 order-1">
                <h2 class="display-4">婚禮流程規劃</h2>
                <h3>每一刻都不容錯過</h3>
                <p class="lead">
                    我們的婚禮流程規劃服務將協助您設計詳細的時間表，從儀式到宴會，確保每個環節流暢進行，讓您在大日子裡無後顧之憂，享受每一個珍貴的瞬間。
                </p>
            </div>
                    
        </div>
    </div>


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
    <div class="container text-center my-5">
    <h2>永恆的優雅，個性化的完美</h2>
    <p>從挑選完美的供應商團隊到協調每一個細節，我們將確保您的婚禮慶典完美展現您的願景。</p>
    <a href="#" class="btn btn-primary btn-lg">探索更多</a>
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

</style>