<script setup>

</script>

<template>
    <div class="footer-container"> 
        <!-- 品牌區域開始 -->
        <div class="section section-padding section-fluid-240 bg-custom">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="brand-wrapper">
                            <div class="brand-list d-flex justify-content-between flex-wrap">
                                <!-- 品牌項目 -->
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand text-center">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-01.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand text-center">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-02.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand text-center">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-03.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand text-center">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-04.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand text-center">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-05.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 品牌區域結束 -->

        <div class="footer-section section">
            <div class="container">
                <div class="row mb-8 align-items-center">                
                    <!-- 關於我們 -->
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-6">
                        <div class="footer-widget">
                            <h5 class="footer-widget-title">關於我們</h5>
                            <div class="footer-widget-content">
                                <p class="about-text">我們是一家致力於提供高品質產品與服務的公司，旨在滿足客戶的需求。</p>
                                <p class="about-text">自成立以來，我們秉持著創新、專業與誠信的理念，努力成為業界的領導者。</p>
                            </div>
                        </div>
                    </div>


                    <!-- 頁尾 logo -->
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-6 text-md-center">
                        <div class="footer-logo">
                            <a href="index.html"><img src="../assets/images/logo/footer-logo.png" alt="Logo"></a>
                        </div>
                    </div>

                  <!-- 贊助我們 -->
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-6">
                        <div class="footer-widget">
                            <h5 class="footer-widget-title">贊助我們</h5>
                            <div class="footer-widget-content">
                                <p class="about-text">如果您想支持我們的工作或有興趣贊助我們的項目，歡迎通過以下方式聯絡： 
                                    <a href="mailto:support@example.com">Aurora Bliss@example.com</a>
                                </p>
                                <p class="about-text rem-margin-bottom">匯款資訊：</p>
                                <ul class="about-text rem-padding-right ul-right-margin-top ul-no-style">
                                    <li>銀行名稱：婚企銀行</li>
                                    <li>帳號：001234567890</li>
                                    <li>帳戶名稱：Aurora Bliss</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                
                <!-- 版權信息 -->
                <div class="row">
                    <div class="col">
                        <p class="copyright">© 2024 Aurora Bliss. All rights reserved.  </p>
                    </div>
                </div>
                <!-- 版權信息結束 -->
            </div>
        </div>
    
    </div>
</template>

<style lang="css" scoped>

@import '../assets/css/FooterStyle.css';

.footer-container {
    display: flex; /* 使用 flexbox */
    flex-direction: column; /* 確保 footer 內容按列排列 */
    min-height: 100vh; /* 確保 footer 在頁面底部 */
    justify-content: space-between; /* 確保內容分散在容器中 */
}

.brand-list {
    display: flex; 
    justify-content: space-between; 
    flex-wrap: wrap; 
}

.brand {
    text-align: center; 
    margin: 0 15px; 
}

.img-fluid {
    max-width: 100%; 
    height: auto; 
}


.bg-custom {
    background-color: #F0F2F2; 
}


.footer-widget-title {
    font-size: 1.5rem; 
    font-weight: bold; 
    color: #333; 
    margin-bottom: 1rem; 
    text-align: center; 
}

.about-text {
    font-size: 1rem; 
    line-height: 1.6; 
    color: #555; 
    margin: 0.5rem 0; 
    text-align: justify; 
}

   
.rem-margin-bottom {
    margin-bottom: 0.2rem; 
}

.ul-right-margin-top {
    text-align: right; 
    width: 100%;
    margin-top: 0.2rem; 
}

.rem-padding-right {
    padding-right: 1rem; 
}


.ul-no-style {
    list-style-type: none; 
}



</style>
