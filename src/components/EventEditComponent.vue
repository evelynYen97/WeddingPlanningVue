<template>
    <v-dialog v-model="dialog" max-width="500px" class="my-dialog" transition="dialog-transition">
        <v-card>
            <v-card-title class="headline">修改事件</v-card-title>
            <v-card-text>
                <v-text-field v-model="editedEvent.eventName" label="Event Name" outlined></v-text-field>
                <v-text-field v-model="editedEvent.eventLocation" label="Event Location" outlined></v-text-field>
                <v-text-field v-model="editedEvent.eventTime" label="Event Time" type="datetime-local" outlined></v-text-field>
                <v-textarea v-model="editedEvent.eventNotes" label="Event Notes" outlined></v-textarea>
                <p>{{ editedEvent.eventLocationImg }}</p>
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
const BASE_URL = import.meta.env.VITE_API_BASEURL;

    export default {
        data() {
            return {
                dialog: false,
                editedEvent: {}, // 存放編輯的事件數據
            };
        },
        methods: {
            open(event) {
                this.editedEvent = { ...event }; // 將傳入的事件數據複製到本地變量
                this.dialog = true; // 打開對話框
            },
            async saveEvent() {
                let terms = {
                    "eventId": this.editedEvent.eventId,
                    "caseId": 1, //之後吃cookie裡的
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
                this.dialog = false; // 關閉對話框
                this.$emit('update');
            },
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
        background-color: #B0B0B0;
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
        background-color: #B0B0B0;
        overflow: hidden;
        box-shadow: 0px 0px 17px 1px rgba(0, 0, 0, 0.34);
        padding: 8px 12px;
        text-decoration: none;
        margin-right: 10px;
    }
    .btn span {
        color: #ffffff;
        font-size: 1.5rem;
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
