<script setup>
import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Members`;

const getMemberIdFromCookie = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('memberID='))
    ?.split('=')[1];
};


const member = ref(null); // 用來存放從 API 獲取的會員資料
const memberId = ref(getMemberIdFromCookie());

const fetchMemberData = async () => {
    console.log("會員 ID:", memberId.value);  // 檢查取得的會員 ID
        if (!memberId.value) {
            console.error("無法獲取會員 ID");
            alert('您尚未登入!!')
            window.location.href = '/login';
            return;
            }
  try {
    const response = await fetch(`${API_URL}/${memberId.value}`);
    console.log("API 回應狀態:", response.status);  // 檢查 API 回應狀態碼
    const responseBody = await response.text();
    console.log("API 回應內容:", responseBody);  // 檢查 API 回應內容
    if (response.ok) {
    //   const data = await response.json();
    const data = JSON.parse(responseBody);  // 解析 API 回應為 JSON
    member.value = data;
    return member;
    } else {
      console.error("無法獲取會員資料");
    }
  } catch (error) {
    console.error("發生錯誤: ", error);
  }
};

// 使用 onMounted 來在元件掛載後呼叫 API
onMounted(() => {
  fetchMemberData();
});
</script>

<template>
  <div>
    <h1>會員中心</h1>
    <div v-if="member">
      <p class="text-center"><strong>姓名:</strong> {{ member.memberName }}</p>
      <p class="text-center"><strong>電子郵件:</strong> {{ member.email }}</p>
      <p class="text-center"><strong>電話:</strong> {{ member.phoneNumber }}</p>
      <p class="text-center"><strong>地址:</strong> {{ member.address }}</p>
      <p class="text-center"><strong>性別:</strong> {{ member.sex }}</p>
    </div>
    <div v-else>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p v-else>正在加載會員資料...</p>
    </div>
  </div>
</template>
