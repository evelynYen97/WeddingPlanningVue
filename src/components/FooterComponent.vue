<script setup>

</script>

<template>
    <!-- footer-all start-->
    <div> 
        <!-- 圖標區域開始 -->
        <div class="section section-padding section-fluid-240 brand-bg ">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="brand-wrapper">
                            <div class="brand-list d-flex justify-content-between flex-wrap">
                                <!-- 品牌項目 -->
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-01.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-02.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-01.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
                                        <a href="#">
                                            <img src="../assets/images/brand/client-logo-04.png" alt="logo image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                                    <div class="brand">
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
        <!-- 圖標區域結束 -->
         
         <!-- 資訊區域開始 -->
        <div class="section footer-section ">
            <div class="container">
                <div class="row">
                    <!-- 關於我們 start-->
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-6">
                        <div class="footer-widget"> 
                            <h5 class="footer-widget-title">關於我們</h5>
                            <div class="footer-widget-content">
                                <!-- 關於資訊 start-->
                                <div class="d-flex justify-content-between link-margin">
                                    <!-- 左邊的連結 -->
                                    <ul class="footer-links">
                                        <li><a href="#">首頁</a></li>
                                        <li><a href="#">聯絡我們</a></li>
                                        <li><a href="#">常見問題</a></li>
                                        <li><a href="#">隱私政策</a></li>
                                        <li><a href="#">產品與服務</a></li>
                                    </ul>

                                    <!-- 右邊的連結 -->
                                    <ul class="footer-links">
                                        <li><a href="#">最新消息</a></li>
                                        <li><a href="#">合作夥伴</a></li>
                                        <li><a href="#">工作機會</a></li>
                                        <li><a href="#">支援中心</a></li>
                                        <li><a href="#">條款與條件</a></li>
                                    </ul>
                                </div>
                                <!-- 關於資訊 end-->

                                <!-- 社交媒體連結 start-->
                                <div>
                                    <ul class="social-links d-flex align-items-center justify-content-center mt-4">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                                <!-- 社交媒體連結 end-->

                            </div>
                        </div>
                    </div>
                    <!-- 關於我們 end-->

                    <!-- 頁尾 logo start-->
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-6">
                        <div class="footer-logo">
                            <a href="index.html"><img src="../assets/images/logo/weddingLogo.png" alt="Logo"></a>
                        </div>
                    </div>
                    <!-- 頁尾 logo end-->

                    <!-- 贊助我們 start-->
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-6">
                        <div class="footer-widget sponsor">
                            <h5 class="footer-widget-title">贊助我們</h5>
                            <div class="footer-widget-content">
                                <p class="sponsor-text">如果您願意支持我們的工作或贊助我們的項目，您可以透過以下方式聯絡我們：</p>
                                <div class="bank-margin">
                                    <ul class="bank-no-style">
                                        <li>聯絡人：Aurora Bliss</li>
                                        <li>電子郵件： <a href="mailto:AuroraBliss@gmail.com">AuroraBliss@gmail.com</a></li>
                                        <li>銀行名稱：婚企銀行</li>
                                        <li>帳號：001234567890</li>
                                        <li>帳戶名稱：Aurora Bliss</li>
                                    </ul>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <!-- 贊助我們 end-->

                </div>
                
                <!-- 版權信息 -->
                <div class="row ">
                    <div class="col ">
                        <p class="copyright">© 2024 Aurora Bliss. All rights reserved.</p>
                    </div>
                </div>
                <!-- 版權信息結束 -->
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


.footer-widget-content {
    /* display: flex;    */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
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
    max-width: 100%; 
    height: auto; 

}


.footer-links {
    list-style: none; 
    padding: 0; 
}

.footer-links li {
    margin-bottom: 0.5rem; 
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

.link-margin {
    margin-left: 30px;
    margin-right: 30px; 
}

.sponsor {
    margin-left: auto;
    margin-right: auto;
    width: 100%; /* 讓寬度占滿可用空間 */
    max-width: 350px; /* 設定最大寬度 */
}

.sponsor-text {
    color: #555; 
    text-align: justify; 
    margin-bottom: 0px;
    
}
 
.bank-no-style {
    list-style-type: none; 
    padding: 0;
    margin: 0;
    text-align: left; /* 讓文字左對齊 */
    /* width: 100%;  */
    /* 保證 ul 占滿整個父容器，實現左對齊 */
}

.bank-margin {
    padding: 0;
    display: flex;
    justify-content: center; /* 水平置中 */
    align-items: center; /* 垂直置中 */  
}



    
</style>
