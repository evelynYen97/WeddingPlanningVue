<template>
  <SampleComponent>
    <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;">
    </div>
  </SampleComponent>

  <div class="container" style="margin-top: 50px;">
    <div class="row">
      <div class="col-4 carousel-wrapper" v-for="(term, index) in paginatedTerms" :key="term.eventId">
        <div style="display: flex; flex-direction: column;">
          <i class="fa-solid fa-pencil pencil-icon" style="font-size:22px;" @click="handlePencilClick(term)">
            <p style="font-size: 13px !important; margin-top: 5px;">Edit</p>
          </i>
          <i class="fa-solid fa-circle-plus new-icon" style="font-size: 22px;" :id="term.eventId" @click="handlePlusClick()">
            <p style="font-size: 13px !important; margin-top: 5px;">New</p>
          </i>
        </div>
        <v-timeline direction="horizontal" v-if="index % 2 === 0">
          <v-timeline-item>
            <template v-slot:opposite>
              <div style="width: auto; height: 200px;">
                <label style="display: flex; justify-content: center; padding-top: 15px">{{ term.eventTime }}</label>
                <img src="/src/assets/images/navImage2.jpg" alt="User Icon" class="user-icon"
                  style="width: 220px; height: 150px;" />
              </div>
            </template>
            <div style="width: auto; height: 200px;">
              <div class="text-h6">{{ term.eventName }}</div>
              <p>活動地點 : </p>
              <p>{{ term.eventLocation }}</p>
              <p>活動備註 : </p>
              <p>{{ term.eventNotes }}</p>
            </div>
          </v-timeline-item>
        </v-timeline>
        <v-timeline direction="horizontal" v-else>
          <v-timeline-item>
            <template v-slot:opposite>
              <div style="width: auto; height: 200px;">
                <div class="text-h6">{{ term.eventName }}</div>
                <p>活動地點 : </p>
                <p>{{ term.eventLocation }}</p>
                <p>活動備註 : </p>
                <p>{{ term.eventNotes }}</p>
              </div>
            </template>
            <div style="width: auto; height: 200px;">
              <label style="display: flex; justify-content: center; padding-top: 15px">{{ term.eventTime }}</label>
              <img src="/src/assets/images/navImage2.jpg" alt="User Icon" class="user-icon"
                style="width: 220px; height: 150px;" />
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
      <EventEditComponent ref="editEventDialog" @update="refreshTerms"/>
      <EventNewComponent ref="editEventPlus" @update="refreshTerms"></EventNewComponent>
    </div>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 0">上一頁</button>
      <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= termsevent.length">
        下一頁
      </button>
    </div>
  </div>
  <div class="container">
    <div v-for="term in termschedul" :key="term.scheduleId">
      <v-timeline>
        <v-timeline-item dot-color="teal-lighten-3" size="small" >
          <v-row no-gutters>
          <!-- 第一張 Card -->
            <v-col>
              <v-card style="width: 300px; height: auto;">
                <v-card-title class="text-h6 bg-info" style="margin-bottom: 10px;">
                  {{ term.scheduleStageName }}
                </v-card-title>
                <v-card-text class="bg-white text--primary">
                  <strong class="me-4">{{ term.scheduleTime.split("T")[1] }}</strong>
                  <div class="text-caption">
                    {{ term.scheduleStageNotes }}
                  </div>
                  <v-btn style="color: #2894FF;" variant="outlined">修改</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- 第二張 Card -->
            <v-col v-if="termschedulstaff && termschedulstaff.length > 0 && filteredStaff(term.scheduleId).length > 0">
              <v-card style="width: 250px; height: auto;">
                <v-card-title class="text-h6" style="margin-bottom: 10px; background-color: blueviolet !important;">
                  參與成員
                </v-card-title>
                <div v-for="staff in termschedulstaff" :key="staff.personnelId">
                  <v-card-text class="bg-white">
                    <strong class="me-4">{{ staff.personnelName }}</strong>
                    <div class="text-caption">
                      {{ staff.assistanceContent }}
                    </div>
                  </v-card-text>
                </div>
                <v-btn style="color:purple;" variant="outlined">修改</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>  
</template>

<script>
import EventEditComponent from '@/components/EventEditComponent.vue';
import EventNewComponent from '@/components/EventNewComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
import { VTimeline, VTimelineItem, VCard, VCardTitle, VCardText, VBtn ,VIcon} from 'vuetify/components';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

export default {
  components: {
    SampleComponent,
    VTimeline,
    VTimelineItem,
    EventEditComponent,
    EventNewComponent
  },
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      termsevent: [],
      termschedul: [],
      termschedulstaff:[],
      currentPage: 0,
      itemsPerPage: 3,
    };
  },
  mounted() {
    this.loadevent();
  },
  watch: {
    paginatedTerms(newPaginatedTerms) { // 監視 paginatedTerms
      // 當 paginatedTerms 更新並渲染後執行選取
      this.$nextTick(() => {
        const dots = document.querySelectorAll('.v-timeline-divider__inner-dot');
        newPaginatedTerms.forEach((term, index) => {
          if (dots[index]) {
            dots[index].setAttribute('data-event-id', term.eventId); // 用來確認選取
            dots[index].addEventListener('click', () => this.loadschedul(term.eventId));
          }
        });
      });
    },
    termschedul(newtermschedul) { 
      this.$nextTick(() => {
        const dots = document.querySelectorAll('.v-timeline-divider__dot--size-small');
        newtermschedul.forEach((term, index) => {
          if (dots[index]) {
            dots[index].setAttribute('data-schedul-id', term.schedulId); // 用來確認選取
            dots[index].addEventListener('click', () => this.loadschedulstaff(term.scheduleId));
          }
        });
      });
    },
  },
  computed: {
    paginatedTerms() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.termsevent.slice(start, end);
    },
  },
  methods: {
    async loadevent() {
      const API_URL = `${BASE_URL}/Events/caseID/1`; // 之後使用正確的localhost
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        this.termsevent = results; // 將 API 回傳的結果存入 terms 陣列
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    // 打開彈窗並傳遞事件數據
    handlePencilClick(term) {
      this.$refs.editEventDialog.open(term); 
    },
    handlePlusClick() {
      this.$refs.editEventPlus.open(); 
    },
    //彈窗編輯回來,更新頁面資料
    refreshTerms() {
        this.loadevent(); // 呼叫資料載入方法重新渲染
    },
    async loadschedul(eventID) {
      const API_URL = `${BASE_URL}/Schedules/EventID/${eventID}`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        this.termschedul = results; // 將 API 回傳的結果存入 terms 陣列
        console.log(results);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    async loadschedulstaff(schedulID) {
      const API_URL = `${BASE_URL}/ScheduledStaffs/Schedul/${schedulID}`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        this.termschedulstaff = results; // 將 API 回傳的結果存入 terms 陣列

        if(results.length == 0){
          alert("尚未安排人手");
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
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
  },
};

</script>
<style lang="css" scoped>
  .titleColor {
    background-color: red;
  }

  .col-4 {
    padding: 0px;
  }

  .container {
    margin-top: 50px;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 10px;
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
  
</style>