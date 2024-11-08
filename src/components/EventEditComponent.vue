<template>
    <v-dialog v-model="dialog" max-width="470px" class="my-dialog1" transition="dialog-transition">
        <v-card>
            <v-card-title class="headline fontspecial">修改事件</v-card-title>
            <v-card-text style="padding-top: 0px;">
                <v-text-field v-model="editedEvent.eventName" label="Event Name" outlined></v-text-field>
                <v-text-field v-model="editedEvent.eventLocation" label="Event Location" outlined></v-text-field>
                <v-text-field v-model="editedEvent.eventTime" label="Event Time" type="datetime-local" outlined></v-text-field>
                <v-textarea v-model="editedEvent.eventNotes" label="Event Notes" outlined></v-textarea>
                <div style="font-weight: bold;">目前圖片:</div>
                <img :src="`${loadImgURL}${editedEvent.eventLocationImg}`" alt="Now Image" style="width: 220px;height: 150px;"/>
                <input type="file" @change="onFileChange" accept="image/*" style="color:black;width: 402px;height: auto;"/>
            </v-card-text>
            <v-card-actions>
                <button @click="saveEvent" class="btn">
                    <span>edit</span>
                    <em></em>
                </button>
                <button @click="dialog = false" class="btn" style="margin-right: 10px;">
                    <span>close</span>
                    <em></em>
                </button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASEURL;

    export default {
        data() {
            return {
                dialog: false,
                editedEvent: {}, // 存放編輯的事件數據
                selectedFile: null,
                imageUrl:null,
                loadImgURL:'https://localhost:7162/eventImg/'
            };
        },
        methods: {
            open(event) {
                this.editedEvent = { ...event }; // 將傳入的事件數據複製到本地變量
                this.dialog = true; // 打開對話框
            },
            async saveEvent() {
                if(this.selectedFile != null){
                    this.editedEvent.eventLocationImg = this.selectedFile.name;
                }
                let terms = {
                    "eventId": this.editedEvent.eventId,
                    "caseId": this.editedEvent.caseId,
                    "eventName": this.editedEvent.eventName,
                    "eventTime": this.editedEvent.eventTime,
                    "eventLocation": this.editedEvent.eventLocation,
                    "eventNotes": this.editedEvent.eventNotes,
                    "eventLocationImg": this.editedEvent.eventLocationImg
                }
                const API_URL = `${BASE_URL}/Events/${this.editedEvent.eventId}`; // 之後使用正確的localhost
                try {
                    const response = await fetch(API_URL,{
                        method: 'PUT',
                        body: JSON.stringify(terms),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // const results = await response.json();
                    // this.termsevent = results;
                } catch (error) {
                    console.error('Fetch error:', error);
                }
                this.uploadImage();
                this.dialog = false; // 關閉對話框
                this.$emit('update');
            },
            //當使用者選擇新圖片時，設定 selectedFile
            onFileChange(event) {
            const file = event.target.files[0];
                if (file) {
                    this.selectedFile = file;
                }
            },
            //上傳圖片
            async uploadImage() {
                if (!this.selectedFile) {
                    alert("請先選擇圖片！");
                    return;
                }
                // 使用 FormData 將圖片檔案包裝為表單數據
                const formData = new FormData();
                const UpURL = `https://localhost:7162/api/EventsAPI/upload`
                formData.append('image', this.selectedFile);
                try {
                    const response = await axios.post(UpURL, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    // 假設 API 回傳一個包含圖片 URL 的 JSON 物件
                    this.imageUrl = response.data.filePath;
                    console.log("圖片上傳成功:", this.imageUrl);
                } catch (error) {
                    console.error("上傳失敗:", error);
                }
            },
        },
    };
</script>
<style scoped>
    @font-face {
        font-family: 'ChenYuluoyan-Thin'; /* 自定義字體名稱 */
        src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype'); /* 字體檔案路徑 */
        font-weight: normal;
        font-style: normal;
    }

    .fontspecial {
        font-family: 'ChenYuluoyan-Thin', sans-serif; /* 將自定義字體應用於標題、段落、按鈕等 */
    }
    
    /* 標題樣式 */
    .my-dialog1 .v-card-title {
        font-weight: bold;
        font-size: 3em;
        color: #8e8e8e;
        text-align: center;
    }
    
    input{
        background-color:#e6e4e4 !important;
        color: #B0B0B0;
        border-radius: 10px;
    }

    ::v-deep .v-field__field{
        background-color:#e6e4e4 !important;
        border-radius: 12px;
    }

    ::v-deep .v-field__input{
        background-color:#e6e4e4 !important;
        border-radius: 12px;
    }

    .btn {
        position: relative;
        z-index: 1;
        min-width: 90px;
        background-color: #B0B0B0;
        overflow: hidden;
        box-shadow: 0px 0px 17px 1px rgba(0, 0, 0, 0.34);
        padding: 8px 10px;
        text-decoration: none;
        margin-right: 10px;
        border-radius: 10px;
    }
    .btn span {
        color: #ffffff;
        font-size: 1.3rem;
        font-weight: bold;
        text-align: left;
        text-decoration: none;
        text-transform: uppercase;;
        padding-right: 35px;
        display: block;
        transform: scaleX(0.6);
        transform-origin: center left;
        transition: color 0.3s ease;
        position: relative;
        z-index: 1;
    }
    .btn em {
        position: absolute;
        height: 1px;
        width: 47%;
        right: 7px;
        top: 50%;
        background: #ffffff;
        transform: scaleX(0.25);
        transform-origin: center right;
        transition: all 0.3s ease;
        z-index: 1;
    }
    .btn:before,
    .btn:after {
        content: '';
        position: absolute;
        height: 50%;
        width: 0;
        background: #ffffff;
        transition: 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
    .btn:before {
        top: 0;
        left: 0;
        right: auto;
    }
    .btn:after {
        bottom: 0;
        right: 0;
        left: auto;
    }
    .btn:hover:before {
        width: 100%;
        right: 0;
        left: auto;
    }
    .btn:hover:after {
        width: 100%;
        left: 0;
        right: auto;
    }
    .btn:hover span {
        color: #000000;
    }
    .btn:hover em {
        background: #000;
        transform: scaleX(1);
    }
</style>
