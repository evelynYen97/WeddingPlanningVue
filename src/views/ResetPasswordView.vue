<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Members`;

const newPassword = ref('');
const confirmPassword = ref('');
const route = useRoute(); 
const router = useRouter();

const userData = ref({
  newPassword: true,
  confirmPassword: true,
});
const validity = ref({
  pwdValidate1: true,
  pwdValidate2: true,
});

const pwdRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// 驗證 token 是否有效的函數
async function validateToken(token) {
  try {
    const response = await fetch(`${API_URL}/ValidateToken?token=${encodeURIComponent(token)}`);
    return response.ok;
  } catch (error) {
    console.error('Token 驗證失敗:', error);
    return false;
  }
}

// 處理密碼重設的函數
async function handleResetPassword() {
  const token = route.query.token;
  console.log("Token:", token);

  // 密碼驗證
  validity.value.pwdValidate1 = pwdRule.test(newPassword.value);
  validity.value.pwdValidate2 = pwdRule.test(confirmPassword.value);

  validity.value.newPassword = newPassword.value.length > 0 && pwdRule.test(newPassword.value);
  validity.value.confirmPassword = confirmPassword.value.length > 0 && pwdRule.test(confirmPassword.value);



  if (!validity.value.newPassword) {
    alert('密碼不得為空且必須符合規則！');
    return;
  }

  if (!validity.value.confirmPassword) {
    alert('確認密碼不得為空且必須符合規則！');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('請輸入相同的密碼！');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/ResetPassword?token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPassword.value),
    });

    if (response.ok) {
      alert('密碼已成功重設，請登入！');
      window.location.href = '/login';
    } else {
      const data = await response.json();
      alert(`錯誤：${data.message}`);
    }
  } catch (error) {
    console.error('發生錯誤:', error);
  }
}

// 當組件初始化時檢查 token 是否有效
onMounted(async () => {
  const token = route.query.token;
  if (!token || !(await validateToken(token))) {
    alert('無效或缺失的 token！');
    window.location.href = '/login';
  }
});
</script>

<template>
  <SampleComponent>
    <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div>
  </SampleComponent>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">
                <form @submit.prevent="handleResetPassword">
                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="bi bi-person-fill" style="font-size: 2rem;"></i>
                    <span class="h1 fw-bold mb-0">重新設定您的密碼</span>
                  </div>
                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                    請輸入您的新密碼
                  </h5>
                  <div class="form-outline mb-4">
                    <input type="password" id="newPassword" v-model="newPassword" class="form-control form-control-lg"/>
                    <label class="form-label" for="newPassword">新密碼</label>
                    <div class="mb-3">
                      <small v-if="!validity.pwdValidate1" class="text-danger">密碼至少8個字，要有大小寫字母加數字</small>
                    </div>
                  </div>
                  <div class="form-outline mb-4">
                    <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control form-control-lg"/>
                    <label class="form-label" for="confirmPassword">確認密碼</label>
                    <div class="mb-3">
                      <small v-if="!validity.pwdValidate2" class="text-danger">密碼至少8個字，要有大小寫字母加數字</small>
                    </div>
                  </div>
                  <div class="pt-1 mb-4">
                    <button type="submit" class="btn btn-dark text-white btn-lg btn-block">Send</button>
                  </div>
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

<style scoped>
</style>
