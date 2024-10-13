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
                data: [
                    { value: 10, name: '菜色' },
                    { value: 20, name: '禮車' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
  
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
            name:'金額',
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
  