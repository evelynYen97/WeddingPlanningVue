<script setup>
 import { onMounted, ref, watch } from 'vue';

const formData = ref({
  valid: false,
  memberId:'',
  name: '',
  email: '',
  subject: '',
  message: ''
});

const subjects = ['婚禮規劃系統問題', '婚禮商家問題', '婚禮整體規劃諮詢', '會員資料問題', '其他'];

// 提示訊息
const successMessage = ref('');
const errorMessage = ref('');

// 清除成功訊息
const clearSuccessMessage = () => {
  successMessage.value = '';
};

// 錯誤訊息 //問號
const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

 // 解析 Cookie 等待盛恩的登入再做測試，現階段訪客模式OK
 const getCookieValue = (name) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};


// // 模擬已登入的會員資料
// const user = ref({
//   isLoggedIn: true, // 假設你有某種方式檢查是否已登入
//   memberId: 1   // 假設有一個已登入的會員ID
// });

// 登入狀態
const user = ref({
  isLoggedIn: false,
  memberId: null
});


// 嘗試從 Cookie 中獲取 memberId
const checkLoginStatus = () => {
  const memberId = getCookieValue('memberId');
  if (memberId) {
    user.value.isLoggedIn = true;
    user.value.memberId = parseInt(memberId, 10); // 轉換為整數
  } else {
    // 如果沒有 memberId，則使用訪客模式
    user.value.isLoggedIn = false;
    user.value.memberId = 1;
  }
};


const fetchMemberData = async () => {
  try {
    const response = await fetch(`https://localhost:7048/api/Members/${user.value.memberId}`);
    if (response.ok) {
      const data = await response.json();
      formData.value.memberId = data.memberId; 
      formData.value.name = data.memberName;
      formData.value.email = data.email;
    } else {
      console.error('無法獲取會員資料');
    }
  } catch (error) {
    console.error('發生錯誤:', error);
  }
};

// onMounted(() => {
//   if (user.value.isLoggedIn && user.value.memberId > 1) {
//     fetchMemberData(); // 登入會員才調用 API 獲取數據
//   } else {
//     // 訪客模式，統一使用 memberId = 1，允許訪客自己填寫名稱和郵件
//     formData.value.memberId = 1;
//   }
// });

onMounted(() => {
  checkLoginStatus(); // 在頁面加載時檢查是否已登入
  if (user.value.isLoggedIn && user.value.memberId > 1) {
    fetchMemberData(); // 如果已登入，調用 API 獲取會員資料
  } else {
    // 訪客模式
    formData.value.memberId = 1;
  }
});

// 自定義驗證邏輯
const validateForm = () => {
  // 檢查每個欄位，並根據驗證結果更新錯誤訊息
  errors.value.name = formData.value.name ? '' : '此欄位必填';
  errors.value.email = /.+@.+\..+/.test(formData.value.email) ? '' : '請輸入有效的郵件';
  errors.value.subject = formData.value.subject ? '' : '此欄位必填';
  errors.value.message = formData.value.message ? '' : '此欄位必填';

  return !errors.value.name && !errors.value.email && !errors.value.subject && !errors.value.message;
};

// 清理所有錯誤訊息
const clearErrors = () => {
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};


// 發送表單數據到 API
const submitForm = async () => {
  if (validateForm()) {
    try {
        const response = await fetch('https://localhost:7048/api/Mails', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
            MemberId: formData.value.memberId,
            MemberName: formData.value.name,
            MemberEmail: formData.value.email,
            MailTitle: formData.value.subject,
            MailContent: formData.value.message,
            MailDate: new Date().toISOString(),
            IsReplied: '未回覆' 
            }), 
        });

        if (response.ok) {
            successMessage.value = '信件已成功送出！';
            errorMessage.value = '';
            
          
        // 如果是訪客，清空 name 和 email
        if (formData.value.memberId === 1) {
          formData.value = {
            memberId: 1,  
            name: '',     
            email: '',    
            subject: '',
            message: ''
          };
        } else {
          // 登入會員保留 name 和 email，清空其餘欄位
          formData.value = {
            memberId: formData.value.memberId,
            name: formData.value.name,
            email: formData.value.email,
            subject: '',
            message: ''
          };
        }

           
        } else {
            errorMessage.value = '發送失敗，請稍後再試。';
        }

    } catch (error) {
      errorMessage.value = '發送失敗，請稍後再試。';
    }


    
  } else {
    errorMessage.value = '請正確填寫所有必填欄位';
  }
};

// 自定義檢查函數，當使用者在欄位中輸入時調用
const clearError = (field) => {

if (formData.value[field]) {
  errors.value[field] = ''; // 當欄位有值時清除錯誤訊息
}
};

// 監聽 subject 的變化
watch(() => formData.value.subject, (newValue) => {
if (newValue) {
  errors.value.subject = ''; // 當 subject 有值時清除錯誤訊息
}
});

</script>

<template>

  <v-container class="my-10">
    <h2 class="my-6">聯絡我們</h2>

     <!-- 成功訊息 -->
     <v-alert v-if="successMessage" type="success" variant="outlined" dismissible class="mb-5">
      {{ successMessage }}
     </v-alert>


     <!-- 錯誤訊息 -->
     <v-alert v-if="errorMessage" type="error" variant="outlined" dismissible class="mb-5">
      {{ errorMessage }}
     </v-alert>


    <v-form ref="formRef" @submit.prevent="submitForm">
      <!-- 寄件人名稱 -->
      <v-text-field
        v-model="formData.name"
        label="寄件人名稱"
        class="mb-4"
        :error-messages="errors.name"
        :readonly="user.isLoggedIn && user.memberId > 1"
         @input="clearError('name')"
         @focus="clearSuccessMessage"
      ></v-text-field>

      <!-- 電子郵件 -->
      <v-text-field
        v-model="formData.email"
        label="電子郵件"
        class="mb-4"
        :error-messages="errors.email"
        :readonly="user.isLoggedIn && user.memberId > 1"
         @input="clearError('email')"
         @focus="clearSuccessMessage"
      ></v-text-field>

      <!-- 服務項目 (下拉選單) -->
      <v-select
        v-model="formData.subject"
        :items="subjects"
        label="服務項目"
        class="mb-4"
        :error-messages="errors.subject"
         @change="clearError('subject')"
         @focus="clearSuccessMessage"
      ></v-select>
      

      <!-- 服務需求 - 禁用拼寫檢查 -->
      <v-textarea
        v-model="formData.message"
        label="服務需求"
        :spellcheck="false"
        class="mb-4"
        :error-messages="errors.message"
        @input="clearError('message')"
        @focus="clearSuccessMessage"
      ></v-textarea>

      <!-- 提交按鈕 -->
      <v-btn color="grey" type="submit" @click="clearSuccessMessage">提交</v-btn>
    </v-form>
  </v-container>
    
</template>

<style lang="css" scoped>

</style>