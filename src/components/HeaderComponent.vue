<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isSticky = ref(false); // 控制 header 固定
const scrollY = ref(0); // 追蹤滾動高度

const defaultColor = 'white'; // 預設顏色在此設定
const finalColor = 'black'; // 滾動後的最終顏色

const getMemberIdFromCookie = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('memberID='))
    ?.split('=')[1];
};

const getMemberNameFromCookie = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('memberName='))
    ?.split('=')[1];
};

const memberId = ref(getMemberIdFromCookie());
const memberName = ref(getMemberNameFromCookie());

//登出
async function handleLogout() {
  // 清除所有相關的 cookie
  document.cookie = "memberID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "memberName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
  // 如果還有其他的 cookie 需要清理，請在這裡添加

  // 可以在這裡進行跳轉或其他登出邏輯
  window.location.href = '/login'; // 跳轉到登入頁面
}

// 滾動事件處理器
const handleScroll = () => {
  scrollY.value = window.scrollY;
  isSticky.value = scrollY.value > 0;
};

// 計算文字顏色
const textColor = computed(() => {
  if (scrollY.value === 0) return defaultColor; // 如果未滾動，返回預設顏色
  return finalColor; // 滾動後改變顏色
});

// 監聽和解除滾動事件
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));


const scrollToContactUs = () => {
  const contactSection = document.getElementById('contact-us');
  if (contactSection) {
    const offset = 111; // 導覽列的高度
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

function scrollToHomeTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>

<template>
  <header :class="{ fixed: isSticky, sticky: isSticky }" id="header">
    <div class="container">
      <div class="row">
        <nav class="navbar navbar-expand-lg col-md-12 padding-small flex-container">
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#slide-navbar-collapse"
            aria-controls="slide-navbar-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon-navicon">
              <i class="fa-solid fa-bars"></i>
            </span>
          </button>

          <div class="navbar-collapse collapse" id="slide-navbar-collapse">
            <ul class="navbar-nav list-inline light text-uppercase align-items-center w-100 d-flex justify-content-between">
              <li class="nav-item">
                <RouterLink :style="{ color: textColor }" class="nav-link fontSize hover-1" :to="{name:'home'}" @click="scrollToHomeTop">首頁</RouterLink>
              </li>
              <li class="nav-item dropdown">
                <a
                  :style="{ color: textColor }"
                  class="nav-link dropdown-toggle fontSize hover-1"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  婚禮商家
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><RouterLink class="dropdown-item" :to="{name:'allShop'}">所有商家</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'venue'}">婚宴會場</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'dish'}">婚宴菜餚</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'car'}">婚宴禮車</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'cake'}">送禮喜餅</RouterLink></li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  :style="{ color: textColor }"
                  class="nav-link dropdown-toggle fontSize hover-1"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  婚禮規劃
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><RouterLink class="dropdown-item" :to="{name:'weddingplan'}">婚禮企劃</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'event'}">婚禮流程規劃</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'budgetplan'}">婚禮預算規劃</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'layers'}">場佈模擬器</RouterLink></li>
                </ul>
              </li>

              <!-- LOGO 區 -->
              <li class="nav-item nav-brand">
                <a href="index.html">
                  <img src="/src/assets/images/weddingLogo02.png" style="width:150px;" alt="Logo" />
                </a>
              </li>

              <li class="nav-item nav-link">
                <a href="javascript:void(0)" @click="scrollToContactUs" :style="{ color: textColor }" class="nav-link fontSize hover-1">聯絡我們</a>
              </li>

              <li class="nav-item dropdown">
                <a
                  :style="{ color: textColor }"
                  class="nav-link dropdown-toggle fontSize hover-1"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  會員中心
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><RouterLink class="dropdown-item" :to="{name:'todo'}">待辦事項</RouterLink></li>
                  <li><RouterLink class="dropdown-item" :to="{name:'profile'}">會員資料</RouterLink></li>
                </ul>
              </li>

              <li class="nav-item user" >
                <div>
                <RouterLink
                  v-if="!memberId" 
                  class="nav-item user"
                  :to="{ name: 'login' }" 
                >
                  <a class="dropdown-toggle fontSize" :style="{ color: textColor } ">登入/</a>
                </RouterLink>
                <RouterLink
                  v-if="!memberId" 
                  class="nav-item user"
                  :to="{ name: 'register' }" 
                >
                  <a class="dropdown-toggle fontSize" :style="{ color: textColor }">註冊會員</a>
                </RouterLink>
                <div v-else class="user-container fontSize hover-1">
                  <img src="/src/assets/images/PAREO.jpg" alt="User Icon" class="user-icon" />
                  <span :style="{ color: textColor }" class="nav-link">使用者: {{ memberName }}</span>
                  <button @click="handleLogout" class="btn btn-outline-danger btn-sm ms-2">登出</button>
                </div>
              </div>
              </li>


            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>

    <!-- 其他內容 -->
  
</template>

<style scoped>
@import '../assets/css/navStyle.css'; /*引用css文件*/

a {
  text-decoration: none;
}

.fontSize{
	font-size: 20px;
	/* text-shadow: 
      1px 1px 0 rgb(166, 166, 166), 
      -1px 1px 0 rgb(166, 166, 166), 
      1px -1px 0 rgb(166, 166, 166), 
      -1px -1px 0 rgb(166, 166, 166);  白色邊緣效果 */
}
@media (max-width: 575px) {
  .fontSize {
    font-size: 15px; 
  }
}

.dropdown-item {
  color: black !important;
}

/* 平滑的顏色過渡 */
.nav-link {
  transition: color 1.0s ease;
}

.user-container {
  display: flex;
  align-items: center;
}

.user-icon {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}

.hover-1 {
  --b: 0.05em;   /* the thickness of the line */
  --c: #000000; /* the color */
  
  color: #4a474700;
  padding-block: var(--b);
  background: 
    linear-gradient(var(--c) 50%,#000 0) 0% calc(100% - var(--_p,0%))/100% 200%,
    linear-gradient(var(--c) 0 0) 0% var(--_p,0%)/var(--_p,0%) var(--b) no-repeat;
  -webkit-background-clip: text,padding-box;
          background-clip: text,padding-box;
  transition: .3s var(--_s,0s) linear,background-size .3s calc(.3s - var(--_s,0s));
}
.hover-1:hover {
  --_p: 100%;
  --_s: .3s;
}
</style>
