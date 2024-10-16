<script setup>
import { ref, onMounted } from 'vue';

const isSticky = ref(false);

const handleScroll = () => {
    if (window.scrollY > 0) {
        isSticky.value = true;
    } else {
        isSticky.value = false;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

</script>

<template>
	<header :class="{'fixed': isSticky, 'sticky': isSticky}" id="header">
		
	  <div class="container">
		<div class="row">
		  <nav class="navbar navbar-expand-lg col-md-12 padding-small flex-container">
			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse"
			  data-target="#slide-navbar-collapse" aria-controls="slide-navbar-collapse"
			  aria-expanded="false" aria-label="Toggle navigation">
			  <span class="icon-navicon">
				<i class="fa-solid fa-bars"></i>
			  </span>
			</button>
  
			<div class="navbar-collapse collapse" id="slide-navbar-collapse">
			  <ul class="navbar-nav list-inline light text-uppercase align-items-center w-100 d-flex justify-content-between">
				<li class="nav-item active">
				  <a href="#billboard" class="navlink">首頁</a>
				</li>
				<li class="nav-item">
				  <a href="">關於我們</a>
				</li>
				<li class="nav-item">
				  <a href="">會員中心</a>
				</li>
  
				<!-- 我們的 LOGO -->
				<li class="nav-item nav-brand">
				  <a href="index.html">
					<img src="/public/images/weddingLogoFF.png" style="width:200px;" alt="Logo">
				  </a>
				</li>
  
				<li class="nav-item">
				  <a href="">商城</a>
				</li>
				<li class="nav-item">
				  <a href="">婚禮場部系統</a>
				</li>
				<li class="nav-item">
				  <a href="">聯絡我們</a>
				</li>
			  </ul>
			</div><!-- navbar-collapse -->
		  </nav>
		</div>
	  </div>
	</header>
	<div id="body-wrapper" class="bg-grey">

		<!-- <section id="billboard" class="dark-overlay">
        <div class="slide" style="background: url(images/servicebg.jpg) no-repeat;background-size: cover;"></div>
      </section> -->

</div>
  </template>
<style lang="css" scoped>
a {
  text-decoration: none;
}

</style>