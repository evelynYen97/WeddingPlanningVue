<script setup>
</script>

<template>
    <!-- footer-all start-->
    <div> 
        <!-- 圖標區域開始 -->
        <div class="section section-padding section-fluid-240 brand-bg">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="brand-wrapper">
                            <div class="brand-list d-flex justify-content-between flex-wrap">
                                <!-- 品牌項目 -->
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="/src/assets/images/homeImage/footerlogo5.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="/src/assets/images/homeImage/footerlogo2.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="/src/assets/images/homeImage/footerlogo1.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="/src/assets/images/homeImage/footerlogo3.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="/src/assets/images/homeImage/footerlogo4.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 圖標區域結束 -->
         
        <!-- 資訊區域開始 -->
        <div class="section footer-section">
            <div class="container">
                <div class="row align-items-center footer-info">
                    
                    <!-- Logo Section -->
                    <div class="col-lg-3 col-md-4 col-sm-12 mb-4 d-flex justify-content-center">
                        <div class="footer-logo">
                            <a href="#"><img src="../assets/images/weddingLogo02.png" alt="Logo" class="img-fluid"></a>
                        </div>
                    </div>

                    <!-- About Us Section -->
                    <div class="footer-widget about-us col-lg-3 col-md-4 col-sm-12">
                        <h5 class="footer-widget-title">關於我們</h5>
                        <ul class="footer-links">
                            <li><a href="#">首頁</a></li>
                            <li><a href="#">聯絡我們</a></li>
                            <li><a href="#">隱私政策</a></li>
                            <li><a href="#">常見問題</a></li>
                            <li><a href="#">最新消息</a></li>
                        </ul>
                    </div>

                    <!-- Sponsor Section -->
                    <div class="footer-widget sponsor col-lg-3 col-md-4 col-sm-12">
                        <h5 class="footer-widget-title">贊助我們</h5>
                        <ul class="bank-info">
                            <li>聯絡人：Aurora Bliss</li>
                            <li>電子郵件：<a href="mailto:AuroraBliss@gmail.com">AuroraBliss@gmail.com</a></li>
                            <li>帳戶名稱：Aurora Bliss</li>
                            <li>銀行名稱：婚企銀行</li>
                            <li>帳號：001234567890</li>
                        </ul>
                    </div>

                </div>

                <!-- Social Links Area -->
                <div class="social-links-wrapper d-flex justify-content-center my-3">
                    <ul class="social-links d-flex">
                        <li><a href="#"><i class="bi bi-facebook"></i></a></li>
                        <li><a href="#"><i class="bi bi-youtube"></i></a></li>
                        <li><a href="#"><i class="bi bi-instagram"></i></a></li>
                    </ul>
                </div>
                <hr>
                <!-- Copyright Area -->
                <div class="copyright-wrapper text-center">
                    <p>© 2024 Aurora Bliss. All rights reserved.</p>
                </div>
            </div>
        </div>
        <!-- 資訊區域結束-->
    </div>
    <!-- footer-all end-->
</template>

<style lang="css" scoped>
@import '../assets/css/FooterStyle.css';

.footer-widget-title {
    font-size: 1.5rem; 
    font-weight: bold; 
    color: #333; 
    margin-bottom: 1rem; 
    text-align: center; 
}

.brand {
    text-align: center; 
    margin: 0 15px; 
}

.brand-list {
    display: flex; 
    justify-content: space-between; 
    flex-wrap: wrap; 
}

.brand-bg {
    background-color: rgb(240, 242, 242); 
}

.img-fluid {
    width: 300px;
    height: auto; 
    object-fit: contain;
}

.footer-links {
    list-style: none; 
    padding: 0; 
}

.footer-links li {
    margin-bottom: 0.5rem; 
}

.social-links-wrapper {
    margin-top: 20px;
    margin-bottom: 10px;
}

.social-links {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 10px;
}

.social-links li {
    margin: 0 5px;
}

.social-links a {
    color: #555;
    font-size: 1.5rem;
}

.copyright-wrapper {
    margin-top: 10px;
    font-size: 0.875rem;
    color: #777;
}

.footer-info {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.sponsor {
    max-width: 350px;
}

.bank-info {
    list-style-type: none; 
    padding: 0;
    margin: 0;
    text-align: left;
}
</style> 
