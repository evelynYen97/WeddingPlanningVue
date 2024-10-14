<template>
    <div>
      <div ref="pieChart" style="width: 50%; height: 400px;"></div>
      <div ref="barChart" style="width: 50%; height: 400px;"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const API_URL = 'https://localhost:7048/api/MemberBudgetItems';
const pieData = ref([]);
const barData = ref([]);
const pieChart = ref(null);
const barChart = ref(null);

const loadPieData = async (memberId) => {
    const response = await fetch(`${API_URL}/ForChart/${memberId}`);
    const datas = await response.json();
    pieData.value = datas;
    updatePieChart();
};

const loadBarData = async (memberId, categoryName) => {
    // 假設這個 API 返回結構為 { categories: ['項目A', '項目B'], value: [10, 5] }
    const response = await fetch(`${API_URL}/ForBarChart/${memberId}?sort=${encodeURIComponent(categoryName)}`);
    const barDatas = await response.json();
    
    // 返回格式化數據
    return {
        categories: barDatas.categories,
        values: barDatas.values
    };
};

const updatePieChart = () => {
    const pieChartInstance = echarts.init(pieChart.value);
    const pieOption = {
        title: {
            text: '類別預算',
            subtext: '點擊查看細項',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '訂單類別',
            type: 'pie',
            radius: '50%',
            data: pieData.value,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    pieChartInstance.setOption(pieOption);
    return pieChartInstance; 
};

const initCharts = () => {
    const barChartInstance = echarts.init(barChart.value);
    const barOption = {
        title: {
            text: '類別細項'
        },
        tooltip: {},
        legend: {
            data: ['金額']
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '金額',
            type: 'bar',
            data: []
        }]
    };

    barChartInstance.setOption(barOption);

    const pieChartInstance = updatePieChart();
    pieChartInstance.on('click', async (params) => {
        const categoryName = params.name;
        const memberId = 2; // 根據實際情況替換
        const barChartData = await loadBarData(memberId, categoryName);

        // 更新柱狀圖數據
        barChartInstance.setOption({
            xAxis: {
                data: barChartData.categories // 更新類別項目
            },
            series: [{
                data: barChartData.values // 更新對應的數值
            }]
        });
    });
};

onMounted(() => {
    const memberId = 2; // 使用的會員 ID
    loadPieData(memberId);
    initCharts();
});

  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  