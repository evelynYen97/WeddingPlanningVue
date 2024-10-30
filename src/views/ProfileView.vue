<script setup>
import SampleComponent from '@/components/SampleComponent.vue';
import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Members`;


//初始化 editOption
const initializeEditOption = (memberData) => ({
    memberId: memberData?.memberId || "",
    username: memberData?.memberName || "",
    useremail: memberData?.email || "",
    phonenumber: memberData?.phoneNumber || "",
    birthday: memberData?.birthday || "",
    sex: memberData?.sex || "",
    preference: memberData?.preference || "",
    address: memberData?.address || "",
    weddingStatus: memberData?.weddingStatus || "",
    budget: memberData?.memberBudget || ""
});

const getMemberIdFromCookie = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('memberID='))
    ?.split('=')[1];
};

const editOption = ref({});
const member = ref(null); // 用來存放從 API 獲取的會員資料
const memberId = ref(getMemberIdFromCookie());
const errorMessage = ref(''); // 存放錯誤消息



// 更新初始編輯資料
const openEditModal = () => {
  if (member.value) editOption.value = initializeEditOption(member.value);
};

//重設編輯資料時顯示的值
const resetEditOptions = () => openEditModal();


// 在關閉模態框時調用重置函數
const closeEditModal = () => {
    resetEditOptions();
    // 其他關閉模態框的邏輯
};




const fetchMemberData = async () => {
    // 檢查取得的會員 ID
    // console.log("會員 ID:", memberId.value);  
        if (!memberId.value) {
            console.error("無法獲取會員 ID");
            alert('您尚未登入!!')
            window.location.href = '/login';
            return;
            }
  try {
    const response = await fetch(`${API_URL}/${memberId.value}`);
    if (response.ok) {
    member.value = await response.json();
    openEditModal();
    return member;
    } else {
      console.error("無法獲取會員資料", await response.text());
    }
  } catch (error) {
    console.error("發生錯誤: ", error);
  }
};

//更新會員資料
const editMemberData = async () => {
  try {
    if (!editOption.value.username || !editOption.value.useremail) {
      errorMessage.value = '姓名和電子郵件是必填項目。';
      setTimeout(() => {
        errorMessage.value = ''; // 在 3 秒後清空錯誤消息
      }, 3000);
      return;
    }

    // 檢查電子郵件格式
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(editOption.value.useremail)) {
        errorMessage.value = '電子郵件格式不正確。';
        setTimeout(() => {
            errorMessage.value = ''; // 設置一段時間後清空錯誤訊息
        }, 3000); // 3秒後消失
        return;
    }

    const updatedMemberData = {
        memberId:memberId.value,
        memberName: editOption.value.username,
        email: editOption.value.useremail,
        phoneNumber: editOption.value.phonenumber,
        birthday:editOption.value.birthday,
        sex: editOption.value.sex,
        preference: editOption.value.preference,
        address: editOption.value.address,
        weddingStatus: editOption.value.weddingStatus,
        memberBudget: editOption.value.budget
        
    };

    const response = await fetch(`${API_URL}/${memberId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMemberData)
    });

    if (response.ok) {
      member.value = await response.json();
      alert('會員資料更新成功！');
      errorMessage.value = ''; // 清空錯誤消息
    } else {
      console.error("更新會員資料失敗:", await response.text());
      errorMessage.value = '更新會員資料失敗，請檢查輸入。';
      setTimeout(() => {
        errorMessage.value = ''; // 在 3 秒後清空錯誤消息
      }, 3000);

    }
  } catch (error) {
    console.error("發生錯誤:", error);
    errorMessage.value = '更新過程中發生錯誤，請稍後再試。';
    setTimeout(() => {
        errorMessage.value = ''; // 在 3 秒後清空錯誤消息
      }, 3000);
  }
};



// 使用 onMounted 來在元件掛載後呼叫 API
onMounted(() => {
  fetchMemberData();
});
</script>

<template>
  <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
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
            <div class="col-md-6 col-lg-6 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black"></div>
        <div style="position: relative;">
          <div class="mb-0 text-end">
            <h1 class="fs-1 text-end">會員中心</h1>
          </div>
          <div style="position: relative;">
            <button class="btn btn-dark text-white btn-lg" id="editProfile" data-bs-toggle="modal" data-bs-target="#editModal" style="position: absolute; top:1px; right: 200px;">
                編輯
            </button>
        </div>
          <div v-if="member">
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">姓名</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.memberName }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">電子郵件</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.email }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">電話</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.phoneNumber }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">生日</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.birthday }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">性別</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.sex }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">風格</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.preference }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">地址</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.address }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">結婚狀態</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.weddingStatus }}</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-grey">預算</label>
            </div>
            <div class="mb-0 text-end">
              <label class="form-label fs-6 text-dark">{{ member.memberBudget }}</label>
            </div>
          </div>
          <div v-else>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <p v-else>正在加載會員資料...</p>
          </div>
        </div>
    </div>
  </div>
</div>
</div>
  </div>
</div>


<!-- 編輯資料 -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">個人資料編輯</h5>
          <div v-if="errorMessage" class="alert alert-danger show fade" style="position: absolute; top: 30px; right: 120px; width: auto;">{{ errorMessage }}</div>
          <button @click="openEditModal(member)" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="edit-modal">
            <label for="editName" class="label">姓名</label>
            <input type="text" id="editName" autocomplete="off" v-model.trim="editOption.username">
          </div>
          <div class="edit-modal">
            <label for="editEmail" class="label">Email</label>
            <input type="email" id="editEmail" autocomplete="off" v-model.trim="editOption.useremail">
          </div>
          <div class="edit-modal">
            <label for="editPhoneNumber" class="label">電話</label>
            <input type="tel" id="editPhoneNumber" autocomplete="off" v-model.trim="editOption.phonenumber">
          </div>
          <div class="edit-modal">
            <label for="editBirthday" class="label">生日</label>
            <div>
              <input type="date" id="editBirthday" autocomplete="off" v-model.trim="editOption.birthday">
            </div>
          </div>
          <div class="edit-modal">
            <label for="editSex" class="label">性別</label>
              <input type="text" id="editSex" autocomplete="off" v-model.trim="editOption.sex">
          </div>
          <div class="edit-modal">
            <label for="editPreference" class="label">風格</label>
            <select class="form-select" v-model.trim="editOption.preference" id="editPreference"  placeholder="請選擇喜歡的婚禮風格" required>
              <option value="" disabled selected>請選擇</option>
              <option value="中式風格">中式風格</option>
              <option value="西式風格">西式風格</option>
              <option value="其他">其他</option>
              </select>
          </div>
          <div class="edit-modal">
            <label for="editAddress" class="label">住址</label>
              <input type="text" id="editAddress" autocomplete="off" v-model.trim="editOption.address">
          </div>
          <div class="edit-modal">
            <label for="editWeddingStatus" class="label">結婚狀態</label>
            <select class="form-select" v-model.trim="editOption.weddingStatus" id="editWeddingStatus"  placeholder="請選擇喜歡的婚禮風格" required>
              <option value="" disabled selected>請選擇</option>
              <option value="已婚">已婚</option>
              <option value="未完婚">未完婚</option>
              </select>
          </div>
          <div class="edit-modal">
            <label for="editBudget" class="label">預算</label>
            <input type="number" id="editBudget" autocomplete="off" v-model.trim="editOption.budget">
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeEditModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button @click="editMemberData" type="button" class="btn btn-primary">儲存變更</button>
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