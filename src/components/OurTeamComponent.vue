<script setup>
import { ref } from 'vue';

// 團隊成員的數據
const teamMembers = ref([
  { name: '閻育如', title: 'Evelyn Yen', bio: '計畫魔法師', image: new URL('/src/assets/images/homeImage/team2.png', import.meta.url).href },
  { name: '李秉蘴', title: 'Kevin Lee', bio: '資料庫巫師', image: new URL('/src/assets/images/homeImage/team1.png', import.meta.url).href },
  { name: '曾筠琪', title: 'YunQi Zeng', bio: '設計精靈', image: new URL('/src/assets/images/homeImage/team3.png', import.meta.url).href },
  { name: '林冠廷', title: 'ERIC LIN', bio: '互動魔術師', image: new URL('/src/assets/images/homeImage/team5.png', import.meta.url).href },
  { name: '陳盛恩', title: 'Sean Chen', bio: '會員守護精靈', image: new URL('/src/assets/images/homeImage/team4.png', import.meta.url).href },
]);
</script>

<template>
  <div class="OurTeamStyle">
    <!-- 標題 Our Team -->
    <!-- <h2 class="team-title">團隊介紹</h2> -->
    
    <!-- 團隊卡片容器，直接顯示五張卡片 -->
    <div class="team-card-container">
      <div class="team-card" v-for="(member, index) in teamMembers" :key="index">
        <img :src="member.image" :alt="member.name" class="member-image" />
        <h3 class="member-name">{{ member.name }}</h3>
        <p class="member-title">{{ member.title }}</p>
        <p class="member-bio">{{ member.bio }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
   @font-face {
        font-family: 'ChenYuluoyan-Thin';
        src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }



.OurTeamStyle {
  background-color: rgb(240, 242, 242);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;


}

.team-title {
  font-size: 2rem; /* 調整字體大小 */
  font-weight: 600; /* 文字粗細 */
  color: #333; /* 改為黑色 */
  margin-bottom: 60px;
  text-align: left;
  /* font-family: 'ChenYuluoyan-Thin', sans-serif; */
  
  /* 字體間距 */
  letter-spacing: 1px;
  
  /* 陰影效果 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  /* 上下邊框樣式 */
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  
  /* 字母大寫 */
  text-transform: uppercase;
}




/* 團隊卡片容器，顯示成水平排列 */
.team-card-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

/* 每個團隊卡片的樣式 */
.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 250px;
  height: 300px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 團隊成員圖片 */
.member-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
  margin-top: 10px;
}

/* 團隊成員名字、標題等 */
.member-name,
.member-title,
.member-bio {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 強調成員名字字體粗細 */
.member-name {
  font-weight: 700;
}

.member-title,
.member-bio {
  font-weight: 400;
}
</style>
