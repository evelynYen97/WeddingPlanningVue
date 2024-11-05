<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref } from 'vue'; // 使用 ref 來進行雙向綁定


// 從環境變數獲取 BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Members`;

// 定義 email 和 password 的 ref
const email = ref('');

async function handleChangePassword(event) {
    event.preventDefault(); // 防止表單自動提交

      // 檢查 email 是否為空
  if (!email.value) {
    console.error('請輸入 email');
    alert('請輸入 email'); // 或者用其他方式顯示錯誤訊息
    return; // 終止函數，防止繼續執行
  }

  try
  {
    const response = await fetch(`${API_URL}/SendPasswordReset?email=${encodeURIComponent(email.value)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value, // 使用 ref 值
      }),
    });

    if (response.ok) {
    alert('已寄送密碼修改信至信箱');
    window.location.href = '/login';    
    } 
    
    else {
    const data = await response.json(); // 解析 JSON 格式的回應
    console.error('發生錯誤:', data.message);

    if (response.status === 400) {
        alert(`登入失敗：${data.message || '使用者email錯誤。'}`);
    } else if (response.status === 500) {
        alert(`登入失敗：${data.message || '伺服器內部錯誤，請稍後再試。'}`);
    } else {
        alert(`登入失敗：${data.message || response.statusText}`);
    }
}

  }catch (error) {
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
                <form @submit="handleChangePassword">
                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="bi bi-person-fill" style="font-size: 2rem;"></i>
                    <span class="h1 fw-bold mb-0">忘記密碼</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                    我們需要驗證您的身分，請輸入您的電子郵件
                  </h5>

                  <div class="form-outline mb-4">
                    <input type="email" id="email" v-model="email" class="form-control form-control-lg"/>
                    <label class="form-label" for="email">Email</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button type="submit" class="btn btn-dark text-white btn-lg btn-block">Login</button>
                  </div>
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

</style>