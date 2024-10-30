<template>
  <SampleComponent>
        <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;">
        </div>
  </SampleComponent>

  <div class="container" style="margin-top: 50px;">
    <div class="row">
      <div class="col-4 carousel-wrapper" v-for="(term,index) in paginatedTerms" :key="term.eventID">
        <v-timeline direction="horizontal" v-if="index % 2 === 0">
          <v-timeline-item >
            <template v-slot:opposite>
              <div style="width: auto; height: 200px;">
                <label style="display: flex; justify-content: center; padding-top: 15px">
                  時間：{{ term.eventTime }}
                </label>
                <img src="/src/assets/images/navImage2.jpg" alt="User Icon" class="user-icon" style="width: 220px; height: 150px;"/>
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
              <label style="display: flex; justify-content: center; padding-top: 15px">
                時間：{{ term.eventTime }}
              </label>
              <img src="/src/assets/images/navImage2.jpg" alt="User Icon" class="user-icon" style="width: 220px; height: 150px;"/>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 0">上一頁</button>
      <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= termsevent.length">
        下一頁
      </button>
    </div>
    <!-- <div v-for="term in termschedul"> -->
      <v-timeline>
        <v-timeline-item dot-color="pink" size="small">
          <div class="d-flex">
            <strong class="me-4">5pm</strong>
            <div>
              <strong>New Icon</strong>
              <div class="text-caption">
                Mobile App
              </div>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    <!-- </div> -->
    
  </div>
</template>

<script>
  import SampleComponent from '@/components/SampleComponent.vue';
  import { VTimeline, VTimelineItem,VCard, VCardTitle, VCardText, VBtn } from 'vuetify/components';

  const BASE_URL = import.meta.env.VITE_API_BASEURL;

  export default {
    components: {
      SampleComponent,
      VTimeline,
      VTimelineItem,
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
        termschedul:[],
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
      async loadschedul(eventID) {
        const API_URL = `${BASE_URL}/Schedules/EventID/${eventID}`; // 之後使用正確的localhost
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
      //點擊事件
      handleDotClick(eventID) {
        console.log(`您點擊了ID為 ${eventID} 的dot！`)
      },
    },
  };

</script>

<style lang="css" scoped>

  .titleColor {
    background-color: red;
  }

  .col-4{
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

</style>