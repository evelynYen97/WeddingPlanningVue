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
    updateChart(); 
};
const loadBarData = async (memberId,categoryName) => {
    // const response = await fetch(`${API_URL}/ForBarChart/${memberId}?sort=${encodeURIComponent(categoryName)}`);
    const response = await fetch(`${API_URL}/ForBarChart/1?sort=${encodeURIComponent('裝飾')}`);
    const barDatas = await response.json();
    barData.value = barDatas; 
    console.log(barData.value)
};
loadBarData();
const updateChart = () => {
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
            data: ['X', 'Y', 'Z', 'd']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '金額',
            type: 'bar',
            data: [5, 10, 15, 7]
        }]
    };

    barChartInstance.setOption(barOption);

    const pieChartInstance = updatePieChart(); // Get the pie chart instance after updating it
    pieChartInstance.on('click', (params) => {
        const index = params.dataIndex;
        const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; // Example data
        barChartInstance.setOption({
            series: [{
                data: data[index]
            }]
        });
    });
};

onMounted(() => {
    const memberId = 2; // Replace with the actual member ID you want to use
    loadPieData(memberId); // Pass the member ID to load the data
    initCharts(); // Initialize the charts after loading data
});
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  