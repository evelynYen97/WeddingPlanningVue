<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL
const API_URL = `${BASE_URL}/Members` 
const CHECK_EMAIL_URL = `${API_URL}/CheckEmail`

const userData = ref({
    "useremail":"",
    "password1":"",
    "password2":"",
    "username":"",
    "phonenumber":"",
    "address":"",
    "gender":"",
    "birthday":"",
    "preference":"",
    "weddingStatus":"",
    "budget":"",
    // "registrationTime": "" 
    
})

const validity = ref({
    "userNameRequired":true,
    "pwdValidate":true,
    "pwdRequired":true,
    "pwdConfirmed":true,
    "emailRequired":true,
    "emailFormat":true,
    "nameRequired":true,
    "phoneRequired":true,
    "addressRequired":true,
    "genderRequired":true,
    "preferenceRequired":true,
    "weddingStatusRequired":true,
    "budgetRequired":true,
    "budgetIntegerRequired":true,
    "isValid":false
})



const emailRule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwdRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

// 檢查 Email 是否已存在於資料庫中的函式
const checkEmailExists = async (email) => {
    try {
        const response = await fetch(`${CHECK_EMAIL_URL}?email=${encodeURIComponent(email)}`);
        return response.ok && (await response.json()).exists;
    } catch (error) {
        console.error("檢查 Email 錯誤：", error);
        return false;
    }
}

const validate = async() =>{
    //解構賦值(javascrypt語法 可以簡化程式但是會移除響應式的特性)
    const { username, password1, password2, useremail, phonenumber, address, gender, birthday, preference, weddingStatus, budget } = userData.value

    //資料一定要輸入的驗證
    validity.value.userNameRequired = username.length > 0
    validity.value.pwdRequired = password1.length > 0
    validity.value.emailRequired = useremail.length > 0
    validity.value.nameRequired = username.length > 0
    validity.value.phoneRequired = phonenumber.length > 0
    validity.value.addressRequired = address.length > 0
    validity.value.genderRequired = gender.length > 0
    validity.value.birthdayRequired = birthday.length > 0
    validity.value.preferenceRequired = preference.length > 0  
    validity.value.weddingStatusRequired = weddingStatus.length > 0 
    validity.value.budgetRequired = budget.length > 0 
    validity.value.budgetIntegerRequired = budget !== null && budget !== "" && !isNaN(budget) && budget.trim().length > 0


    //密碼與再次輸入密碼一致
    validity.value.pwdConfirmed = password1 === password2
    //Email格式是否正確
    validity.value.emailFormat = emailRule.test(useremail)
    //檢查密碼是否符合網站要求
    validity.value.pwdValidate = pwdRule.test(password1)


    // console.log(validity.value)
    // console.log(userData.value)

    validity.value.isValid = validity.value.userNameRequired && validity.value.pwdRequired && validity.value.emailRequired && validity.value.nameRequired && validity.value.phoneRequired && validity.value.addressRequired && validity.value.genderRequired && validity.value.pwdConfirmed && validity.value.emailFormat && validity.value.pwdValidate && validity.value.birthdayRequired && validity.value.preferenceRequired && 
    validity.value.weddingStatusRequired && validity.value.budgetRequired && validity.value.budgetIntegerRequired

    // 檢查 Email 是否已存在
    if (await checkEmailExists(useremail)) {
        alert("此 Email 已被使用，請選擇其他 Email");
        return;
    }

    //fetch
    if(validity.value.isValid){
        // userData.value.registrationTime = new Date().toISOString();
        //因為資料庫是使用datetime2 所以只能用toISOString 顯示的時間是UTC時間
        //因為後端已經寫了別的方法來轉換時間 所以這段已經不需要了

        // 準備 JSON 資料
        const requestBody = JSON.stringify({
            MemberName: userData.value.username,
            Email: userData.value.useremail,
            Password: userData.value.password1,
            PhoneNumber:userData.value.phonenumber,
            Address:userData.value.address,
            Sex:userData.value.gender,
            Birthday:userData.value.birthday,
            Preference:userData.value.preference,
            WeddingStatus:userData.value.weddingStatus,
            MemberBudget:userData.value.budget,
            // RegistrationTime: userData.value.registrationTime 

            
        });
        try {
            // 發送 API 請求
            const response = await fetch(API_URL, {
                method: 'POST',
                body: requestBody,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('註冊成功！');
                window.location.href = '/login'
            } else {
                alert('註冊失敗，請重試');
            }
        } catch (error) 
            {
            console.error("API 發送錯誤：", error);
            alert('發生錯誤，請重試');
            }

    }

}

    
</script>

<template>
    <SampleComponent>
        <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div>
    </SampleComponent>
    <div>
        <form id="registerForm" novalidate @submit.prevent="validate()">
            <div class="container">
                <div class="row">
                    <h2 class="column-12">註冊</h2>
                </div>
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="email" class="form-label">電子郵件</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="email" v-model.trim="userData.useremail" id="email" class="form-control" placeholder="請輸入Email" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.emailRequired" class="text-danger">電子郵件要輸入</small><br>
                            <small v-if="!validity.emailFormat" class="text-danger">電子郵件格式不正確</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="password1" class="form-label">密碼</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="password" v-model.trim="userData.password1" id="password1" class="form-control" placeholder="請輸入密碼" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.pwdRequired" class="text-danger">請輸入密碼</small><br>
                            <small v-if="!validity.pwdValidate" class="text-danger">密碼至少8個字，要有大小寫字母加數字</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="password2" class="form-label">再次輸入密碼</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="password" v-model.trim="userData.password2" id="password2" class="form-control" placeholder="請再次輸入密碼" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.pwdConfirmed" class="text-danger hide">密碼不一致</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="username" class="form-label">姓名</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="text" v-model.trim="userData.username" id="username" class="form-control" placeholder="請輸入姓名" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.nameRequired" class="text-danger hide">請填寫姓名</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="phonenumber" class="form-label">電話</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="tel" v-model.trim="userData.phonenumber" id="phonenumber" class="form-control" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" placeholder="請輸入連絡電話" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.phoneRequired" class="text-danger hide">請輸入連絡電話</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="address" class="form-label">地址</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="text" v-model.trim="userData.address" id="address" class="form-control" placeholder="請填寫地址" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.addressRequired" class="text-danger hide">請填寫住址</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="gender" class="form-label">性別</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="text" v-model.trim="userData.gender" id="gender" class="form-control" placeholder="請填寫性別" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.genderRequired" class="text-danger hide">請填寫性別</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="birthday" class="form-label">生日</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="date" v-model.trim="userData.birthday" id="birthday" class="form-control" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.birthdayRequired" class="text-danger hide">請填寫生日</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="preference" class="form-label">婚禮風格</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <select class="form-select" v-model.trim="userData.preference" id="preference"  placeholder="請選擇喜歡的婚禮風格" required>
                        <option value="" disabled selected>請選擇</option>
                        <option value="中式風格">中式風格</option>
                        <option value="西式風格">西式風格</option>
                        <option value="其他">其他</option>
                        </select>
                        <div class="mb-3">
                            <small v-if="!validity.preferenceRequired" class="text-danger hide">請填寫婚禮風格</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                 <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="weddingStatus" class="form-label">結婚狀態</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <select class="form-select" v-model.trim="userData.weddingStatus" id="weddingStatus"  placeholder="請選擇結婚狀態" required>
                        <option value="" disabled selected>請選擇</option>
                        <option value="已婚">已婚</option>
                        <option value="未完婚">未完婚</option>
                        </select>
                        <div class="mb-3">
                            <small v-if="!validity.weddingStatusRequired" class="text-danger hide">請填寫結婚狀態</small>
                        </div>
                    </div>
                </div>
                <!-- end -->
                <!-- start -->
                <div class="row mb-3">
                    <div class="col-12 col-xl-1 offset-xl-2">
                        <label for="budget" class="form-label">預算</label>
                    </div>
                    <div class="col-12 col-xl-7">
                        <input type="text" v-model.trim="userData.budget" id="budget" class="form-control" placeholder="請填寫預算" autocomplete="off" required>
                        <div class="mb-3">
                            <small v-if="!validity.budgetRequired" class="text-danger hide">請填寫預算</small><br>
                            <small v-if="!validity.budgetIntegerRequired" class="text-danger hide">預算必須是整數</small>

                        </div>
                    </div>
                </div>
                <!-- end -->
                <div>
                    <div class="text-center mt-3">
                        <button type="submit" class="btn btn-primary" id="buttonSubmit">送出</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style lang="css" scoped>

</style>