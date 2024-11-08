<template>
    <v-dialog v-model="dialog" max-width="450px" class="my-dialog" transition="dialog-transition">
        <v-card>
            <v-card-title class="headline fontspecial" >新增事件</v-card-title>
            <v-card-text style="padding-top: 0px;">
                <v-text-field v-model="newEvent.eventName" label="Event Name" outlined></v-text-field>
                <v-text-field v-model="newEvent.eventLocation" label="Event Location" outlined></v-text-field>
                <v-text-field v-model="newEvent.eventTime" label="Event Time" type="datetime-local" outlined></v-text-field>
                <v-textarea v-model="newEvent.eventNotes" label="Event Notes" outlined></v-textarea>
                <input type="file" @change="onFileChange" accept="image/*" style="width:402px;height: auto"/>
            </v-card-text>
            <v-card-actions>
                <button @click="createEvent" class="btn">
                    <span>new</span>
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
            newEvent: {
                eventId:0,
                caseId:0, //之後吃cookie
                eventName: '',
                eventTime: '',
                eventLocation: '',
                eventNotes: '',
                eventLocationImg: ''
            },
            selectedFile: null,
            imageUrl:null,
            loadImgURL:'https://localhost:7162/eventImg/',
            caseId:0,
        };
    },
    methods: {
        open(caseID) {
            this.caseId = caseID;
            this.resetForm();
            this.dialog = true;
        },
        async createEvent() {
            const API_URL = `${BASE_URL}/Events`; // 請確認 API URL 是否正確
            
            this.uploadImage();
            if(this.selectedFile != null){
                this.newEvent.eventLocationImg = this.selectedFile.name;
            }
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(this.newEvent),
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error('Failed to create event');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
            this.dialog = false;
            this.$emit('refresh');
        },
        resetForm() {
            this.newEvent = {
                eventId:0,
                caseId:this.caseId,
                eventName: '',
                eventTime: '',
                eventLocation: '',
                eventNotes: '',
                eventLocationImg: ''
            };
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
    }
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
    .my-dialog .v-card-title {
        font-weight: bold;
        font-size: 3em;
        color: #556679; /* Vuetify 藍色 */
        text-align: center;
    }

    input{
        background-color:#dae3ee !important;
        color: #475460;
        border-radius: 10px;
    }

    ::v-deep .v-field__field{
        background-color:#dae3ee !important;
        border-radius: 12px;
    }
    
    .btn {
        position: relative;
        z-index: 1;
        min-width: 90px;
        background-color: #9cbbde;
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
        background: #556679;
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
