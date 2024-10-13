<template>
    <div>
      <div ref="pieChart" style="width: 50%; height: 400px;"></div>
      <div ref="barChart" style="width: 50%; height: 400px;"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
    const pieChart = ref(null);
    const barChart = ref(null);
  
    const initCharts = () => {
    const pieChartInstance = echarts.init(pieChart.value);
    const barChartInstance = echarts.init(barChart.value);
  
    const pieOption = {
        series: [{
         type: 'pie',
        data: [
          { value: 10, name: 'A' },
          { value: 20, name: 'B' },
           { value: 30, name: 'C' }
         ]
         }]
        };
  
        const barOption = {
          xAxis: {
            type: 'category',
            data: ['X', 'Y', 'Z', 'd']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'bar',
            data: [5, 10, 15, 7]
          }]
        };
  
        pieChartInstance.setOption(pieOption);
        barChartInstance.setOption(barOption);
  
        pieChartInstance.on('click', (params) => {
          const index = params.dataIndex;
          const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
          barChartInstance.setOption({
            series: [{
              data: data[index]
            }]
          });
        });
      };
  
    onMounted(initCharts);
  
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  