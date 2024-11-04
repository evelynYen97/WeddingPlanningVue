<template>
    <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title class="headline">新增排程人員</v-card-title>
            <v-card-text>
                <v-text-field v-model="newStaff.personnelName" label="姓名" outlined></v-text-field>
                <v-text-field v-model="newStaff.assistanceContent" label="工作內容" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
                <button @click="createChanges" class="btn">
                    <span>新增</span>
                    <em></em>
                </button>
                <button @click="dialog = false" class="btn" style="margin-right: 10px;">
                    <span>關閉</span>
                    <em></em>
                </button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
const BASE_URL = import.meta.env.VITE_API_BASEURL;

export default {
    data() {
        return {
            newData:0,
            dialog: false,
            newStaff: {
                "personnelId": 0,
                "scheduleId": 0,
                "personnelName": "",
                "assistanceContent": ""
            }
        };
    },
    methods: {
        open(scheduleId) {
            this.newData = scheduleId; // 將傳入的scheduleId複製到本地變量
            this.resetForm();
            this.dialog = true;
        },
        async createChanges() {
            const API_URL = `${BASE_URL}/ScheduledStaffs`;
            console.log(JSON.stringify(this.newStaff));
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(this.newStaff),
                    headers: {'Content-Type': 'application/json',},
                });
            } catch (error) {
                console.error(error);
            }
            this.dialog = false; // 關閉對話框
            this.$emit('staffnew');//觸發更新事件
        },
        resetForm() {
            this.newStaff = {
                "personnelId": 0,
                "scheduleId": this.newData,
                "personnelName": "",
                "assistanceContent": ""
            }
        }
    },
};
</script>
<style scoped>
    .my-dialog .v-card {
        border-radius: 20px; /* 自定義圓角 */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 陰影 */
    }
    
    /* 標題樣式 */
    .my-dialog .v-card-title {
        font-weight: bold;
        font-size: 1.5em;
        color: #372209; /* Vuetify 藍色 */
        text-align: center;
    }
    
    /* 自定義 v-text-field 樣式 */
    .my-dialog .v-field__field {
        border: 1px solid #475460;
        border-radius: 5px;
        background-color: #f0f4f8;
        transition: border-color 0.3s, background-color 0.3s; /* 過渡效果 */
    }

    /* 懸停時的效果 */
    .my-dialog .v-field__field:hover {
        border-color: #c3cad0; /* 懸停時邊框顏色 */
        background-color: #aebdca; /* 懸停時背景顏色 */
    }

    /* 動態過渡效果 */
    .dialog-transition-enter-active, 
    .dialog-transition-leave-active {
        transition: opacity 0.5s ease, transform 0.5s ease; /* 設置透明度和變換的過渡效果 */
    }
    .dialog-transition-enter, 
    .dialog-transition-leave-to /* .leave-active 在 Vue 2.x 中 */ {
        opacity: 0;
        transform: translateY(-30px); /* 進場時向上滑動，退場時向下滑動 */
    }

    .btn {
        position: relative;
        z-index: 1;
        min-width: 90px;
        background-color: #A6C8F0;
        overflow: hidden;
        box-shadow: 0px 0px 17px 1px rgba(0, 0, 0, 0.34);
        padding: 7px 11px;
        text-decoration: none;
        margin-right: 10px;
    }
    .btn span {
        color: #556679;
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