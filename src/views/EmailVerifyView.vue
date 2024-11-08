<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Members`;

const email = ref('');
const verificationCode = ref('');
const errorMessage = ref('');
const isVerificationModalVisible = ref(false);

// 發送驗證碼
async function handleEmailVerify() {
    if (!email.value) {
        errorMessage.value = "請輸入有效的信箱";
        return;
    }

    try {
    const response = await fetch(`${API_URL}/SendVerificationCode?email=${encodeURIComponent(email.value)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value })
    });
        const data = await response.json();

        if (data.success) {
            errorMessage.value = "";
            alert(data.message);  // 成功訊息
            isVerificationModalVisible.value = true;  // 顯示驗證碼模態框
        } else {
            errorMessage.value = data.message || "發送驗證碼失敗";
        }
    } catch (error) {
        errorMessage.value = "發送驗證碼時發生錯誤";
        console.error(error);
    }
}

// 驗證驗證碼
async function verifyCode() {
    try {
        const response = await fetch(`${API_URL}/VerifyCode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: email.value,
              userCode: verificationCode.value 
            })
        });
        const data = await response.json();

        if (data.success) {
            errorMessage.value = "";
            alert("驗證成功！");
            closeEditModal();  // 關閉模態框
            window.location.href = '/profile';

        } else {
            errorMessage.value = data.message || "驗證碼錯誤，請重試";
        }
    } catch (error) {
        errorMessage.value = "驗證碼驗證失敗";
        console.error(error);
    }
}

// 關閉驗證碼模態框
function closeEditModal() {
    isVerificationModalVisible.value = false;
    verificationCode.value = '';  // 清除輸入的驗證碼
}
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
                        <div class="col-md-6 col-lg-5 d-none d-md-block">
                            <img
                                src="/src/assets/images/hand.jpg"
                                alt="login form"
                                class="img-fluid"
                                style="border-radius: 1rem 0 0 1rem;"
                            />
                        </div>
                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                            <div class="card-body p-4 p-lg-5 text-black">
                                <form @submit.prevent="handleEmailVerify">
                                    <div class="d-flex align-items-center mb-3 pb-1">
                                        <i class="bi bi-person-fill" style="font-size: 2rem;"></i>
                                        <span class="h1 fw-bold mb-0">驗證信箱</span>
                                    </div>
                                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                                        請輸入您的信箱
                                    </h5>
                                    <div class="form-outline mb-4">
                                        <input type="email" id="email" v-model="email" class="form-control form-control-lg"/>
                                        <label class="form-label" for="email">您的信箱</label>
                                    </div>
                                    <div class="pt-1 mb-4">
                                        <button type="submit" class="btn btn-dark text-white btn-lg btn-block">Send</button>
                                    </div>
                                    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 驗證碼模態視窗 -->
    <div v-if="isVerificationModalVisible" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">電子信箱驗證</h5>
                    <button @click="closeEditModal" type="button" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <label for="verificationCodeInput" class="label">請輸入驗證碼</label>
                    <input type="text" id="verificationCodeInput" v-model="verificationCode" autocomplete="off" class="form-control">
                    <div v-if="errorMessage" class="alert alert-danger mt-2">{{ errorMessage }}</div>
                </div>
                <div class="modal-footer">
                    <button @click="closeEditModal" type="button" class="btn btn-secondary">關閉</button>
                    <button @click="verifyCode" type="button" class="btn btn-primary">驗證電子郵件</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 這裡可以添加自訂樣式 */
</style>
