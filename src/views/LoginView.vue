<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref,onMounted  } from 'vue'; // 使用 ref 來進行雙向綁定


// 從環境變數獲取 BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Members`;

// 定義 email 和 password 的 ref
const email = ref('');
const password = ref('');
// const lastLoginTime = ref('');

// 檢查是否已經登入
onMounted(() => {
  // 解析 cookie 為物件
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=").map(c => c.trim());
    acc[key] = value;
    return acc;
  }, {});

  // 如果存在 memberID 或 memberName，則跳轉到會員中心
  if (cookies.memberID || cookies.memberName) {
    alert('您已經登入了，將自動跳轉回會員中心');
    window.location.href = '/profile';
  }
});

// 處理表單提交
async function handleLogin(event) {
  event.preventDefault(); // 防止表單自動提交

  // 檢查 email 和 password 是否為空
  if (!email.value || !password.value) {
    console.error('請輸入 email 和密碼');
    alert('請輸入 email 和密碼'); // 或者用其他方式顯示錯誤訊息
    return; // 終止函數，防止繼續執行
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value, // 使用 ref 值
        password: password.value, // 使用 ref 值
      }),
    });

    // 檢查回應碼是否為 200
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      console.log(response.status);
      console.log(data.memberID); // 確認 userId 的值
      console.log(data.memberName); // 確認 memberName 的值

      // 設定使用者ID到 Cookie，並設定為遊覽器關閉後刪除COOKIE，如果要過期時間為 7 天 就加上 max-age=${7 * 24 * 60 * 60}; 
      document.cookie = `memberID=${data.memberID}; path=/;secure; SameSite=Strict`;
      document.cookie = `memberName=${data.memberName}; path=/;secure; SameSite=Strict`;
      window.location.href = '/profile'; // 使用 window.location.href 來跳轉到會員中心

      // 在這裡可以儲存 session 或跳轉頁面
    } else {
      console.error('登入失敗:', response.statusText);
      // 可以根據不同的狀況顯示相應的錯誤消息
      if (response.status === 401) {
        alert('登入失敗：使用者名稱或密碼錯誤。');
      } else if (response.status === 500) {
        alert('登入失敗：伺服器內部錯誤，請稍後再試。');
      } else {
        alert(`登入失敗：${response.statusText}`);
      }
    }
  } catch (error) {
    console.error('發生錯誤:', error);
  }
}
</script>

<template>
  <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">
                <form @submit="handleLogin">
                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="bi bi-person-fill" style="font-size: 2rem;"></i>
                    <span class="h1 fw-bold mb-0">登入</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                    登入您的帳戶
                  </h5>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      v-model="email"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="email">Email</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="password" v-model="password" class="form-control form-control-lg"/>
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button type="submit" class="btn btn-dark text-white btn-lg btn-block">
                      Login
                    </button>
                  </div>

                  <a class="small text-muted" href='sendResetPassword'>忘記密碼?</a>
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">
                    您還沒有加入會員嗎?
                    <a href='register' style="color: #393f81;">建立會員</a>
                  </p>
                </form>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="/src/assets/images/church-login.jpg"
                alt="login form"
                class="img-fluid"
                style="border-radius: 1rem 0 0 1rem;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

input,select {
  border: 2px solid #D0D0D0	; 
  border-radius: 4px;
  padding: 5px; 
  width: 100%; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
}

</style>
