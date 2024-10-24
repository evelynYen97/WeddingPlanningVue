<template>
    <div class="img-menu">
        <h5>MemberMaterials</h5>
        <div class="col" v-for="term in terms" :key="term.memberMaterialId">
            <div class="card" @click="sendMemData(term)">
            <img :src="`/src/assets/images/Layer_MemImg/${term.memberImgName}`" class="card-img-top" :alt="term.memberMaterialId" :title="term.memberMaterialId">
                <div class="card-body">
                    <!-- 使用split來根據.分割字只取第一部分 為了去掉.png-->
                    <p class="card-text">{{ term.memberImgName.split('.').slice(0, -1).join('.') }}</p>
                </div>
            </div> 
        </div>
    </div>
</template>

<script setup>
import {ref,defineProps} from 'vue';


const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/MemberMaterials`
const terms = ref([])

const props = defineProps({
    term: {
        type: Object,
        required: true
    }
});

const loadImg = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const results = await response.json();
        terms.value = results; // 將 API 回傳的結果存入 terms 陣列
    } catch (error) {
        console.error('Fetch error:', error);
    }
};
loadImg()

const emit = defineEmits(['Memdata-sent']); // 定義 emit
const sendMemData = (term) => {
    const imagePath = `/src/assets/images/Layer_MemImg/${term.memberImgName}`;
    const name = term.memberImgName;
    const memberid = term.memberid;
    const materialId = term.memberMaterialId;
    const width = term.estimatedWidth;
    const height = term.estimatedLength;
    emit('Memdata-sent', imagePath,materialId,width,height,memberid,name); // 觸發自定義事件並傳送數據
};

</script>

<style lang="css" scoped>
h5{
    font-size:15px;
}
.img-menu {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 130px; /* 根據需求調整 */
    height: 626px; /* 根據需求調整 */
    overflow-y: scroll; /* 垂直方向顯示滾動條 */
    padding: 10px;
    position: relative;
}

.card-img-top {
    width: 50px;
    height: auto;
    object-fit: cover; /* 保持圖片比例裁切 */
    position: relative; /* 圖片相對於卡片容器進行定位 */
}

.card {
    border: 2px solid #aba092;
    display: flex;
    flex-direction: column;
    align-items: center; /* 垂直方向居中對齊 */
    position: relative; /* 保證卡片內元素相對定位 */
    margin-bottom: 20px; /* 卡片之間的距離 */

}

.card-text{
    font-size:15px
}

.col {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 自定義滾動條的樣式 */
.img-menu::-webkit-scrollbar {
    width: 8px; /* 滾動條寬度 */
}

.img-menu::-webkit-scrollbar-thumb {
    background-color: #E6D8C5; /* 滾動條顏色 */
    border-radius: 5px; /* 滾動條圓角 */
}

.img-menu::-webkit-scrollbar-thumb:hover {
    background-color: #aba092; /* 滾動條滑過時的顏色 */
}

</style>