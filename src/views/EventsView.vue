<template>
  <SampleComponent>
    <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;">
    </div>
  </SampleComponent>

  <div class="container" style="margin-top: 50px;" ref="targetArea">
    <div class="row"  style="margin-bottom: 10px">
      <div class="col-3 carousel-wrapper" v-for="(term, index) in paginatedTerms" :key="term.eventId" >
        <div class="icon-container">
          <i class="fa-solid fa-pencil pencil-icon" style="font-size:22px;margin-right: 20px;color:#B0B0B0;cursor: pointer;" @click="handlePencilClick(term)">
            <p style="font-size: 13px !important; margin-top: 5px;">Edit</p>
          </i>
          <i class="fa-solid fa-circle-plus new-icon" style="font-size: 22px;margin-right: 20px;color: #A6C8F0;cursor: pointer;" @click="handlePlusClick()">
            <p style="font-size: 13px !important; margin-top: 5px;">New</p>
          </i>
          <i class="fa-solid fa-ban delete-icon" style="font-size: 24px;color: #D4A1BB;cursor: pointer;" @click="handleDeleteClick(term.eventId)">
            <p style="font-size: 13px !important; margin-top: 5px;">Delete</p>
          </i>
        </div> 
        <v-timeline direction="horizontal" v-if="index % 2 === 0" >
          <v-timeline-item >
            <template v-slot:opposite>
              <div style="width: auto; height: 200px;">
                <label style="display: flex; justify-content: center;font-size:calc(1rem + 0.6vw);" class="fontspecial">{{ term.eventTime.replace("T", " ").slice(0, 16) }}</label>
                <img :src="`${loadImgURL}${term.eventLocationImg}`" alt="User Icon" style="width: 220px; height: 150px;" class="localhost">
              </div>
            </template>
            <div style="width: auto; height: 200px;text-align: center;" >
              <h1 class="fontspecial" style="font-size:calc(1.5rem + 1.5vw)">{{ term.eventName }}</h1>
              <p style="margin-bottom: 5px;font-weight:bolder;">( 活動地點 )</p>
              <p style="margin-bottom: 10px;">{{ term.eventLocation }}</p>
              <p style="margin-bottom: 5px;font-weight:bolder;">( 活動備註 )</p>
              <p style="margin-bottom: 6px;">{{ term.eventNotes }}</p>
            </div>
          </v-timeline-item>
        </v-timeline>
        <v-timeline direction="horizontal" v-else>
          <v-timeline-item >
            <template v-slot:opposite>
              <div style="width: auto; height: 200px;text-align: center;" >
                <h1 class="fontspecial" style="font-size:calc(1.5rem + 1.5vw)">{{ term.eventName }}</h1>
                <p style="margin-bottom: 5px;font-weight:bolder;">( 活動地點 )</p>
                <p style="margin-bottom: 10px;">{{ term.eventLocation }}</p>
                <p style="margin-bottom: 5px;font-weight:bolder;">( 活動備註 )</p>
                <p style="margin-bottom: 10px;">{{ term.eventNotes }}</p>
              </div>
            </template>
            <div style="width: auto; height: 200px;">
              <label style="display: flex; justify-content: center;font-size:calc(1rem + 0.6vw);" class="fontspecial">{{ term.eventTime.replace("T", " ").slice(0, 16) }}</label>
              <img :src="`${loadImgURL}${term.eventLocationImg}`" alt="User Icon" style="width: 220px; height: 150px;" class="localhost"/>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
      <EventEditComponent ref="editEventDialog" @update="refreshTerms"/>
      <EventNewComponent ref="editEventPlus" @refresh="refreshTerms"></EventNewComponent>
    </div>
    <div class="pagination-controls fontspecial" style="padding-top: 10px;">
      <button @click="prevPage" :disabled="currentPage === 0" style="font-size:calc(1rem + 1vw);">上一頁</button>
      <button @click="shot" class="capture-btn" style="font-size:calc(1rem + 1vw);">截取螢幕</button>
      <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= termsevent.length" style="font-size:calc(1rem + 1vw);">下一頁</button>
    </div>
  </div>

  <div class="container" style="margin-bottom: 50px;">
    <div v-for="terms in termschedul" :key="terms.scheduleId">
      <v-timeline style="justify-content: flex-start !important;">
        <v-timeline-item dot-color="teal-lighten-3" size="small" >
          <v-row align="center" justify="start">
          <!-- 第一張 Card -->
            <v-col cols="auto">
              <v-card style="width: 300px; height: auto;">
                <v-card-title class="bg-info" style="font-weight: bold;background-color: #5579a2 !important;">
                  {{ terms.scheduleStageName }}
                  <i class="fa-solid fa-user-plus" @click="staffNewClick(terms.scheduleId)" style="margin-left: 15px;"></i>
                </v-card-title>
                <v-card-text style="background-color:#eeecec;padding-top: 16px;padding-bottom: 10px">
                  <strong class="me-4">{{ terms.scheduleTime.split("T")[0].split("-").slice(1).join("-") }}</strong>
                  <strong class="me-4">{{ terms.scheduleTime.split("T")[1] }}</strong>
                  <div class="text-caption">
                    {{ terms.scheduleStageNotes }}
                  </div>
                  <button class="btn" @click="SchedulEditClick(terms)">
                    修改
                    <span></span><span></span><span></span><span></span>
                  </button>
                  <button class="btn" @click="SchedulNewClick(terms)" style="border: 3px solid #A6C8F0;background-color:#A6C8F0;color: #556679;">
                    新增
                    <span></span><span></span><span></span><span></span>
                  </button>
                  <button class="btn" @click="scheduleDeleteClick(terms.scheduleId,terms.eventId)" style="border: 3px solid #D4A1BB;background-color:#D4A1BB;color: #644c58">
                    刪除
                    <span></span><span></span><span></span><span></span>
                  </button>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- 第二張 Card -->
            <v-col v-if="filteredStaff(terms.scheduleId).length > 0">
              <v-row align="center">
                <v-col v-for="staff in filteredStaff(terms.scheduleId)" :key="staff.personnelId">
                  <v-card style="width: 250px; height: auto;">
                    <v-card-title class="bg-info" style="background-color:#bd89ee !important;font-weight: bold;">
                      參與成員
                    </v-card-title>
                      <v-card-text style="background-color:#eeecec;padding-top: 16px;padding-bottom: 10px">
                        <strong class="me-4">{{ staff.personnelName }}</strong>
                        <div class="text-caption">
                          {{ staff.assistanceContent }}
                        </div>
                        <button class="btn" @click="staffEditClick(staff)">
                          修改
                          <span></span><span></span><span></span><span></span>
                        </button>
                        <button class="btn" @click="staffDeleteClick(staff.personnelId,terms.eventId)" style="border: 3px solid #D4A1BB;background-color:#D4A1BB;color: #644c58">
                          刪除
                          <span></span><span></span><span></span><span></span>
                      </button>
                      </v-card-text>
                  </v-card>
                </v-col>
                
              </v-row>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </div>
    <SchedulEditComponent ref="editschedulDialog" @schedulupdate="refreshschedul(this.noweventID)"></SchedulEditComponent>
    <SchedulNewComponent ref="newschedulDialog" @schedulnew="refreshschedul(this.noweventID)"></SchedulNewComponent>
    <StaffEditComponent ref="editstaffDialog" @staffupdate="refreshschedul(this.noweventID)"></StaffEditComponent>
    <StaffNewComponent ref="newstaffDialog" @staffnew="refreshschedul(this.noweventID)"></StaffNewComponent>
  </div>  
</template>

<script>
import EventEditComponent from '@/components/EventEditComponent.vue';
import EventNewComponent from '@/components/EventNewComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
import SchedulEditComponent from '@/components/SchedulEditComponent.vue';
import SchedulNewComponent from '@/components/SchedulNewComponent.vue';
import StaffEditComponent from '@/components/StaffEditComponent.vue';
import StaffNewComponent from '@/components/StaffNewComponent.vue';
import html2canvas from 'html2canvas';
import { VTimeline, VTimelineItem, VCard, VCardTitle, VCardText, VBtn } from 'vuetify/components';
import domtoimage from 'dom-to-image'

const BASE_URL = import.meta.env.VITE_API_BASEURL;

export default {
  components: {
    SampleComponent,
    EventEditComponent,
    EventNewComponent,
    SchedulEditComponent,
    SchedulNewComponent,
    StaffEditComponent,
    StaffNewComponent
  },
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      WeddingPlans:[],
      termsevent: [],
      termschedul: [],
      termschedulstaff:[],
      currentPage: 0,
      itemsPerPage: 4,
      noweventID:0,//重載排程要用的引數
      loadImgURL:'https://localhost:7162/eventImg/',
      screenshotUrl: null,
      imageCache: new Map()
    };
  },
  mounted() {
    this.loadevent();
  },
  watch: {
    // 當 paginatedTerms 更新並渲染後執行選取
    paginatedTerms(newPaginatedTerms) { // 監視 paginatedTerms
      this.$nextTick(() => {
        const dots = document.querySelectorAll('.v-timeline .v-timeline-divider__inner-dot');

        newPaginatedTerms.forEach((term, index) => {
          if (dots[index]) {
            dots[index].setAttribute('data-event-id', term.eventId); // 用來確認選取
            dots[index].style.backgroundColor = '#D8D8EB';
            dots[index].addEventListener('click', () => this.loadschedul(term.eventId));

            let scale = 1;
            let colorToggle = false;
            // 定時切換 scale 和顯示文字
            setInterval(() => {
              scale = scale === 1 ? 1.2 : 1; // 切換 scale
              colorToggle = !colorToggle;
              dots[index].style.transform = `scale(${scale})`;
              dots[index].style.backgroundColor = colorToggle ? '#B8B8DC' : '#D8D8EB';

              // 檢查是否已經有文字元素，避免重複添加
              let hoverText = dots[index].querySelector('.hover-text');
              if (!hoverText) {
                hoverText = document.createElement('span');
                hoverText.innerText = 'Check Schedule !!';
                hoverText.classList.add('hover-text');
                hoverText.style.position = 'absolute';
                hoverText.style.top = '-19px';
                hoverText.style.left = '50%';
                hoverText.style.transform = 'translateX(-50%)';
                hoverText.style.color = '#B8B8DC';
                hoverText.style.padding = '2px 6px';
                hoverText.style.borderRadius = '4px';
                hoverText.style.fontSize = '11px';
                hoverText.style.whiteSpace = 'nowrap';
                dots[index].appendChild(hoverText); // 添加文字元素
              }
              else{
                dots[index].removeChild(hoverText);
              }
            }, 1100);
            // 滑鼠移入時只改變 scale 和文字
            dots[index].addEventListener('mouseenter', () => {
              dots[index].style.backgroundColor = '	#8080C0';
            });
          }
        });
      });
    },
    termschedul(newtermschedul) { 
      this.$nextTick(() => {
        newtermschedul.forEach((term) => {
          // 自動依序調用 this.loadschedulstaff
          this.loadschedulstaff(term.scheduleId);
        });
      });
    },
  },
  //計算翻頁頁面
  computed: {
    paginatedTerms() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.termsevent.slice(start, end);
    },
  },
  methods: {
    
    //接cookie
    getCookieValue(name) {
      const cookies = document.cookie.split('; ');
      const cookie = cookies.find(c => c.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
    },
    //載入婚禮企劃資料
    async loadWeddingPlans() {
      const memberID = this.getCookieValue('memberID');
      const API_URL = `${BASE_URL}/WeddingPlans/memberID/${memberID}`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        this.termsevent = results;
      } catch (error) {
        // this.createEvent();
      }
    },
    //載入活動資料
    async loadevent() {
      const memberID = this.getCookieValue('memberID');
      const API_URL = `${BASE_URL}/Events/caseID/${memberID}`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        this.termsevent = results;
      } catch (error) {
        // this.createEvent();
      }
    },
    //如果是新的成員要先新增相關的活動範例給它
    async createEvent() {
        const API_URL = `${BASE_URL}/Events`; // 請確認 API URL 是否正確
        const memberID = this.getCookieValue('memberID');
        const newEven = {
          eventId:0,
          caseId:1,
          eventName: '未編輯',
          eventTime: '',
          eventLocation: '未編輯',
          eventNotes: '未編輯',
          eventLocationImg: 'hotel2.png'
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(newEvent),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to create event');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    },
    //打開活動編輯彈窗並傳遞事件數據
    handlePencilClick(term) {
      this.$refs.editEventDialog.open(term); 
    },
    // 打開活動新增彈窗並傳遞事件數據
    handlePlusClick() {
      this.$refs.editEventPlus.open(); 
    },
    //刪除活動事件
    handleDeleteClick(eventId){
      const isConfirmed = window.confirm("您確定要刪除此活動嗎？"); // 確認視窗
      if (!isConfirmed) return; // 如果使用者點擊取消，則直接返回

      const deleteImg = async () => {
        try {
            const FindID_URL = `${BASE_URL}/Events/${eventId}`; // 正確的URL
            const response = await fetch(FindID_URL, {
                method: 'DELETE',
            });
            if (response.ok) {
              console.log('刪除成功');
              this.loadevent();
            } else {
                console.error('刪除失敗', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
      };
      deleteImg();
    },
    //彈窗編輯回來,更新頁面資料
    refreshTerms() {
        this.loadevent();
    },
    //載入排程資訊
    async loadschedul(eventID) {
      this.noweventID = eventID;
      const API_URL = `${BASE_URL}/Schedules/EventID/${eventID}`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        this.termschedul = results;

      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    //打開編輯排程對話框並傳入事件數據
    SchedulEditClick(term) {
      this.$refs.editschedulDialog.open(term); 
    },
    SchedulNewClick(term) {
      this.$refs.newschedulDialog.open(term); 
    },
    //彈窗編輯回來,更新排程資料
    refreshschedul(eventID) {
      this.loadschedul(eventID); 
    },
    //刪除排程事件
    scheduleDeleteClick(scheduleId,eventID){
      const isConfirmed = window.confirm("您確定要刪除此活動嗎？"); // 確認視窗
      if (!isConfirmed) return; // 如果使用者點擊取消，則直接返回
      const deleteschedule = async () => {
        try {
            const FindID_URL = `${BASE_URL}/Schedules/${scheduleId}`; // 正確的URL
            const response = await fetch(FindID_URL, {
                method: 'DELETE',
            });
            if (response.ok) {
              console.log('刪除成功');
              this.loadevent();
            } else {
                console.error('刪除失敗', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
      };
      deleteschedule();
      this.refreshschedul(eventID);
    },
    //載入排程人員
    async loadschedulstaff(schedulID) {
      const API_URL = `${BASE_URL}/ScheduledStaffs/Schedul/${schedulID}`;
      this.termschedulstaff = [];
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        // 使用 push 合併新資料而不是覆蓋
        this.termschedulstaff.push(...results);
        
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    //彈窗掛載資料
    staffEditClick(staffdata) {
      if (this.$refs.editstaffDialog) {
        this.$refs.editstaffDialog.open(staffdata); 
      } else {
        console.error('editstaffDialog 尚未掛載');
      }
    },
    staffNewClick(scheduleId) {
      if (this.$refs.newstaffDialog) {
        this.$refs.newstaffDialog.open(scheduleId); 
      } else {
        console.error('newstaffDialog 尚未掛載');
      }
    },
    //刪除事件人員
    staffDeleteClick(staffId,eventID){
      const isConfirmed = window.confirm("您確定要刪除此活動嗎？"); // 確認視窗
      if (!isConfirmed) return; // 如果使用者點擊取消，則直接返回
      const deletestaff = async () => {
        try {
            const FindID_URL = `${BASE_URL}/ScheduledStaffs/${staffId}`; // 正確的URL
            const response = await fetch(FindID_URL, {
                method: 'DELETE',
            });
            if (response.ok) {
              console.log('刪除成功');
              this.loadevent();
            } else {
                console.error('刪除失敗', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
      };
      deletestaff();
      this.refreshschedul(eventID);
    },
    // 根據 scheduleId 過濾出對應的 staff 成員
    filteredStaff(scheduleId) {
      return this.termschedulstaff.filter(staff => staff.scheduleId === scheduleId);
    },
    nextPage() {
      if ((this.currentPage + 1) * this.itemsPerPage < this.termsevent.length) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
      }
    },
    // 调用 html2canvas 来截取 container 的截图
    captureScreenshot() {
      const eventshot = this.$refs.eventshot;
      html2canvas(eventshot).then(canvas => {
          // 獲取 Base64 圖片數據
          const imageData = canvas.toDataURL('image/png');
          const fileName = `screenshot_${Date.now()}.png`;
          
          // 建立下載鏈接並自動觸發下載
          const link = document.createElement('a');
          link.href = imageData;
          link.download = fileName;
          link.click();

          // 儲存檔名和時間戳
          this.screenshotname = fileName;
          this.timestamp = new Date().toISOString().split('.')[0]; // "YYYY-MM-DDTHH:MM:SS" 格式
      });
    },
    // 預處理圖片
    async preloadImages() {
      const targetElement = this.$refs.targetArea
      const images = targetElement.querySelectorAll('.localhost')
      
      for (const img of images) {
        if (img.src.includes('localhost')) {
          try {
            const base64Data = await this.convertImageToBase64(img.src)
            this.imageCache.set(img.src, base64Data)
            // 暫時替換圖片來源
            img.dataset.originalSrc = img.src
            img.src = base64Data
          } catch (error) {
            console.error('圖片轉換失敗:', error)
          }
        }
      }
    },
    // 轉換圖片為 Base64
    async convertImageToBase64(imgUrl) {
      try {
        const response = await fetch(imgUrl, {
          mode: 'cors',
          credentials: 'include' // 如果需要發送 cookies
        })
        const blob = await response.blob()
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      } catch (error) {
        console.error('轉換圖片失敗:', error)
        throw error
      }
    },
    // 恢復原始圖片來源
    restoreImages() {
      const targetElement = this.$refs.targetArea
      const images = targetElement.querySelectorAll('.localhost')
      
      for (const img of images) {
        if (img.dataset.originalSrc) {
          img.src = img.dataset.originalSrc
          delete img.dataset.originalSrc
        }
      }
    },

    // 準備並執行截圖
    async prepareAndCapture() {
      try {
        // 先預處理圖片
        await this.preloadImages()
        
        // 執行截圖
        await this.takeScreenshot()
        
        // 恢復原始圖片
        this.restoreImages()
      } catch (error) {
        console.error('截圖過程發生錯誤:', error)
        this.restoreImages() // 確保圖片被恢復
      }
    },
    // 執行截圖
    async takeScreenshot() {
      try {
        const targetElement = this.$refs.targetArea
        const dataUrl = await domtoimage.toPng(targetElement, {
          quality: 1.0,
          bgcolor: '#fff',
          cacheBust: true, // 避免快取問題
          filter: (node) => {
            // 可以在這裡添加額外的過濾規則
            return true
          },
          // 處理字體
          fontEmbedCSS: document.querySelector('style')?.innerHTML || ''
        })
        this.screenshotUrl = dataUrl
      } catch (error) {
        console.error('截圖失敗:', error)
        throw error
      }
    },
    // 下載截圖
    downloadScreenshot() {
      if (!this.screenshotUrl) return
      
      const link = document.createElement('a')
      link.download = `screenshot-${Date.now()}.png`
      link.href = this.screenshotUrl
      link.click()
    },
    //截圖按鈕
    shot(){
      this.prepareAndCapture();
      this.downloadScreenshot();
    },
  },
};

</script>
<style lang="css" scoped>
  @font-face {
    font-family: 'ChenYuluoyan-Thin'; /* 自定義字體名稱 */
    src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype'); /* 字體檔案路徑 */
    font-weight: normal;
    font-style: normal;
  }

  .fontspecial {
      font-family: 'ChenYuluoyan-Thin', sans-serif; /* 將自定義字體應用於標題、段落、按鈕等 */
  }

  .titleColor {
    background-color: red;
  }

  .col-3 {
    padding: 0px;
  }

  .container {
    margin-top: 50px;
  }

  .icon-container {
    display: flex;
    flex-direction: row; /* 垂直排列 */
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination-controls button{
    padding: 5px;
    padding-top: 0px;
    padding-bottom: 0px;
    border-radius: 80px;
    margin-right: 10px
  }

  .pagination-controls button:hover{
    border: 3px black solid;
  }

  .text-caption {
    font-size: 14px !important; /* 調整字體大小，例如 14px */
    font-weight: 1px; /* 調整字體粗細，選擇 bold 或數值 */
    padding-top: 5PX;
    padding-bottom: 10px;
  }

  .carousel-wrapper .pencil-icon {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .carousel-wrapper:hover .pencil-icon {
    opacity: 1;
  }

  .carousel-wrapper .new-icon {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .carousel-wrapper:hover .new-icon {
    opacity: 1;
  }

  .carousel-wrapper .delete-icon {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .carousel-wrapper:hover .delete-icon {
    opacity: 1;
  }

  .v-col:hover .btn {
    display: inline-flex !important;
  }

  .v-col .fa-user-plus{
    display: none !important;
  }

  .v-col:hover .fa-user-plus {
    display: inline-flex !important;
  }

  .btn {
    display: none !important;
    position: relative;
    z-index: 1;
    min-width: 40px;
    background: #B0B0B0;
    border: 3px solid #B0B0B0;
    border-radius: 8px !important;
    color: #464646;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    transition: 0.5s;
    padding: 7px 13px;
    margin-right: 15px;
    }

    .btn span {
        position: absolute;
        width: 25%;
        height: 100%;
        background-color: #FFFFFF;
        transform: translateY(150%);
        border-radius: 50%;
        left: calc((var(--n) - 1) * 25%);
        transition: 0.5s;
        transition-delay: calc((var(--n) - 1) * 0.1s);
        z-index: -1;
    }

    .btn:hover,
    .btn:focus {
        color: #464646;
    }
    .btn:hover span {
        transform: translateY(0) scale(2);
    }
    .btn span:nth-child(1) {
        --n: 1;
    }
    .btn span:nth-child(2) {
        --n: 2;
    }
    .btn span:nth-child(3) {
        --n: 3;
    }
    .btn span:nth-child(4) {
        --n: 4;
    }
</style>