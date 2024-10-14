<template>
    <div>
      <div ref="pieChart" style="width: 50%; height: 400px;"></div>
      <div ref="barChart" style="width: 50%; height: 400px;"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
    const API_URL='https://localhost:7048/api/MemberBudgetItems'
    //宣告圓餅圖資料
    const pieData=ref([])
    //宣告圖表
    const pieChart = ref(null);
    const barChart = ref(null);
    //呼叫圓餅圖資料  待修改成傳入會員ID！！
    const loadPieData=async()=>{
        const response=await fetch(`${API_URL}/ForChart/1`)
        const datas=await response.json()
        console.log(datas)
        pieData.value = datas
        console.log(pieData.value)
        pieChart.setOption({
                series: [{
                    data:pieData // 將獲取到的資料設置到圓餅圖中
                }]
            });
    }
    
    
    //圖表初始化設定
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
                data: [],
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
  
    onMounted(()=>{
      initCharts();

      loadPieData()
      
    });
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  