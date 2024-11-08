<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import ShopView from './ShopView.vue';
import Cookies from 'js-cookie';


const API_URL = 'https://localhost:7048/api/Venues';
const venues = ref([]);
const searchKeyword = ref(''); // 儲存搜尋欄的關鍵字
const inputClass = ref('keyword');
const selectedDate = ref<Date | null>(null); // 新增篩選的日期，設定為 Date 或 null
const router = useRouter();

// 加載場地資料
const loadVenue = async () => {
  const response = await fetch(API_URL);
  const datas = await response.json();
  venues.value = await datas
    .filter(item => !item.memberId) // 僅保留 memberId 為空的項目
    .map(item => ({
      ...item,
      venueStyleSeverity: item.venueStyle === '中式' ? 'success' : 'danger',
      availableTime: item.availableTime.replace('T', ' ') // 轉換可用時間格式
    }))
    .sort((a, b) => new Date(a.availableTime).getTime() - new Date(b.availableTime).getTime());
    
};

// 計算屬性，用於篩選場地資料
const filteredVenues = computed(() => {
  return venues.value.filter(venue => {
    const matchesKeyword = !searchKeyword.value || venue.venueName.includes(searchKeyword.value);
    const matchesDate = !selectedDate.value || 
      new Date(venue.availableTime).toDateString() === selectedDate.value.toDateString();
    return matchesKeyword && matchesDate;
  });
});

// 監聽 searchKeyword 的變化
watch(searchKeyword, (newValue) => {
  inputClass.value = newValue ? 'keyword keyword-active' : 'keyword';
});

// 格式化貨幣顯示
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD' }).format(value);
};

async function addToBudget(venue) {
  const memberId = Cookies.get('memberID'); // 從 cookie 中取得會員 ID

  if (!memberId) {
    alert('您尚未登入，請先登入');
    return;
  }

  const budgetItem = {
    memberId: memberId,
    budgetItemDetail: venue.venueName,               // 場地名稱
    budgetItemPrice: venue.venueRentalPrice,         // 場地單價
    budgetItemAmount: 1,                             // 場地數量
    budgetItemSubtotal: venue.venueRentalPrice * 1,  // 場地總價
    budgetItemSort: '場地'                           // 固定值 "場地"
  };

  try {
    const response = await fetch('https://localhost:7048/api/MemberBudgetItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(budgetItem)
    });

    if (!response.ok) {
      throw new Error('無法加入預算表');
    }
    alert('成功加入預算表！');

  } catch (error) {
    console.error('加入預算表時發生錯誤：', error);
    alert('加入預算表失敗');
  }
}

// 使用 PUT 方法更新場地的 memberId，傳送完整的場地物件
async function updateVenueMemberId(venue) {
  const updatedVenue = {
  venueId: venue.venueId,
  shopId: venue.shopId,
  memberId: Number(Cookies.get('memberID')), // 只更新 memberId，其他都一樣
  venueFunction: venue.venueFunction,
  venueStyle: venue.venueStyle,
  inOurDoor: venue.inOurDoor,
  venueName: venue.venueName,
  tableCapacity: venue.tableCapacity,
  guestCapacity: venue.guestCapacity,
  venueRentalPrice: venue.venueRentalPrice,
  venueImg: venue.venueImg,
  venueInfo: venue.venueInfo,
  availableTime: new Date(venue.availableTime).toISOString(), // 轉換 ISO 8601 格式
  venueImg2: venue.venueImg2,
  isDelete: false,
  orderTime: venue.orderTime,
  };
  console.log(updatedVenue)
  try {
    const response = await fetch(`https://localhost:7048/api/Venues/${venue.venueId}`, {
      method: 'PUT',             
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedVenue) // 傳送完整的場地物件
    });
    console.log(venue.venueId)
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('後端返回的錯誤訊息：', errorData);
      throw new Error('無法更新場地的 memberId');
    }

    // 成功更新後本地資料的同步
    const index = venues.value.findIndex(v => v.venueId === venue.venueId);
    if (index !== -1) {
      venues.value[index].memberId = updatedVenue.memberId;
    }

    console.log('場地的 memberId 更新成功');
  
  // 等待 DOM 更新完成後，刷新資料表
  nextTick(() => { 
    loadVenue();  // 重新載入場地資料
  });
    
  } catch (error) {
    console.error('更新場地 memberId 時發生錯誤：', error);
    alert('無法更新場地資料');
  }
}
async function handleBooking(venue) {
  addToBudget(venue); // 將場地加入預算表
  updateVenueMemberId(venue); // 更新場地的 memberId

  // 等待 DOM 更新完成後，刷新資料表
  nextTick(() => { 
    loadVenue();  // 重新載入場地資料
  });
  
}

// 定義跳轉到場地詳細頁的函式
const goToVenueDetail = (id: number) => {
  router.push({ name: 'venueitem', params: { id } });
};

onMounted(async() => {
  await loadVenue();
  nextTick()
});

</script>

<template>
   <ShopView></ShopView> 

   <div class="card">
      <h3 style="padding-left: 200px; font-weight: bold;" class="mb-3">可預定場地列表</h3>
      <InputText 
          v-model="searchKeyword" 
          placeholder="輸入場地名稱進行搜尋..." 
          class="keyword"
      />
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;" class="mt-3">
          <label>選擇日期:</label>
          <Calendar v-model="selectedDate" placeholder="選擇可用日期" dateFormat="yy-mm-dd" />
      </div>

      <DataTable :value="filteredVenues" dataKey="id" :rows="5" paginator style="width: 80%; margin: auto;">
          <Column field="venueName" header="場地名稱" style="width: 20%;" />
          <Column field="venueFunction" header="功能" style="width: 20%;" />
          <Column header="場地風格" style="width: 20%">
              <template #body="{ data }">
                  <Tag :value="data.venueStyle" :severity="data.venueStyleSeverity" />
              </template>
          </Column>
          <Column field="venueRentalPrice" header="租金" style="width: 20%;">
              <template #body="{ data, field }">
                  {{ formatCurrency(data[field]) }}
              </template>
          </Column>
          <Column field="availableTime" header="可用時間" style="width: 20%" />

          <Column header="詳細資訊" style="width: 10%; text-align:center">
            <template #body="{ data }">
              <Button 
                label="顯示" 
                icon="pi pi-info" 
                @click.prevent="goToVenueDetail(data.venueId)" 
                class="p-button-info"/>
            </template>          
          </Column>

          <Column header="操作" style="width: 10%; text-align:center">
              <template #body="{ data }">
                  <Button label="下訂" icon="pi pi-check" @click.prevent="handleBooking(data)" class="p-button-success" />
              </template>
          </Column>
      </DataTable>
   </div>
</template>

<style lang="css" scoped>
.keyword {
   width: 80%; 
   margin: auto;
   border-radius: 10px;
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.keyword-input:focus {
  border-color: #3498db;
  box-shadow: 3px 3px 12px rgba(52, 152, 219, 0.5);
}

.card {
    background: var(--card-bg);
    border: var(--card-border);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}
</style>
