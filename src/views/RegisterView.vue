<script setup>
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL
const API_URL = `${BASE_URL}/Members` 

const userData = ref({
    "useremail":"",
    "password1":"",
    "password2":"",
    "username":"",
    "phonenumber":"",
    "address":"",
    "gender":""
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
    "isValid":false
})

const emailRule = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const pwdRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


const validate = async() =>{
    //解構賦值(javascrypt語法 可以簡化程式但是會移除響應式的特性)
    const { username, password1, password2, useremail, phonenumber, address, gender } = userData.value

    //資料一定要輸入的驗證
    validity.value.userNameRequired = username.length > 0
    validity.value.pwdRequired = password1.length > 0
    validity.value.emailRequired = useremail.length > 0
    validity.value.nameRequired = username.length > 0
    validity.value.phoneRequired = phonenumber.length > 0
    validity.value.addressRequired = address.length > 0
    validity.value.genderRequired = gender.length > 0

    //密碼與再次輸入密碼一致
    validity.value.pwdConfirmed = password1 === password2
    //Email格式是否正確
    validity.value.emailFormat = emailRule.test(useremail)
    //檢查密碼是否符合網站要求
    validity.value.pwdValidate = pwdRule.test(password1)


    // console.log(validity.value)
    // console.log(userData.value)

    validity.value.isValid = validity.value.userNameRequired && validity.value.pwdRequired && validity.value.emailRequired && validity.value.nameRequired && validity.value.phoneRequired && validity.value.addressRequired && validity.value.genderRequired && validity.value.pwdConfirmed && validity.value.emailFormat && validity.value.pwdValidate


    //fetch
    if(validity.value.isValid){
        // 準備 JSON 資料
        const requestBody = JSON.stringify({
            Name: userData.value.username,
            Email: userData.value.useremail,
            Password: userData.value.password1,
            Phonenumber:userData.value.phonenumber,
            Address:userData.value.address,
            Gender:userData.value.gender
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
                    <input type="email" v-model.trim="userData.useremail" id="email" class="form-control" placeholder="請輸入Email" required>
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
                    <input type="password" v-model.trim="userData.password1" id="password1" class="form-control" placeholder="請輸入密碼" required>
                    <div class="mb-3">
                        <small v-if="!validity.pwdRequired" class="text-danger">請輸入密碼</small>
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
                    <input type="password" v-model.trim="userData.password2" id="password2" class="form-control" placeholder="請再次輸入密碼" required>
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
                    <input type="text" v-model.trim="userData.username" id="username" class="form-control" placeholder="請輸入姓名" required>
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
                    <input type="tel" v-model.trim="userData.phonenumber" id="phonenumber" class="form-control" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                        placeholder="請輸入連絡電話" required>
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
                    <input type="text" v-model.trim="userData.address" id="address" class="form-control" placeholder="請填寫地址" required>
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
                    <input type="text" v-model.trim="userData.gender" id="gender" class="form-control" placeholder="請填寫性別" required>
                    <div class="mb-3">
                        <small v-if="!validity.genderRequired" class="text-danger hide">請填寫性別</small>
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