<template>
    <div id="ChartsContain">
        <div >
            <div class="row">
                <div class="mt-5 col-12 col-lg-3" id="piechartOuterContain">
                    <div id="piechartContain" class="position-relative">
                        <button @click="downloadPieChart" class="position-absolute top-0 end-0 mt-3 me-3 downloadButton rounded"><i class="bi bi-download  "></i></button>
                        <div ref="pieChart" style="width: 100%; height: 450px;"></div>
                    </div>
                </div>
                <div class="mt-5 col-12 col-lg-6" id="barchartOuterContain">
                    <div id="barchartContain" class="position-relative">
                        <div ref="barChart" style="width: 100%; height: 450px;"></div>
                        <button @click="downloadBarChart" class="position-absolute top-0 end-0 mt-3 me-3 downloadButton rounded"><i class="bi bi-download  "></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
const BaseUrl = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BaseUrl}/MemberBudgetItems`;
const pieData = ref([]);
const pieChart = ref(null);
const barChart = ref(null);
//接收父傳來的sort
const  props  =  defineProps({
          selectSort:String,
    thisMemberId:Number,
});


//宣告子傳父觸發事件
const emit = defineEmits(['changeTableData']);

const loadPieData = async (memberId) => {
    const response = await fetch(`${API_URL}/ForChart/${memberId}`);
    const datas = await response.json();
    pieData.value = datas;
    updatePieChart();
};

const loadBarData = async (memberId, categoryName) => {
    const response = await fetch(`${API_URL}/ForBarChart/${memberId}?sort=${encodeURIComponent(categoryName)}`);
    const barDatas = await response.json();

    return {
        categories: barDatas.categories,
        values: barDatas.values
    };
};

const updatePieChart = () => {
    const pieChartInstance = echarts.init(pieChart.value);
    const pieOption = {
        backgroundColor: '#ffffff',
        title: {
            text: '類別預算',
            subtext: '點擊查看細項',
            left: 'left',
            top:'5%',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} TWD ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: '0%', 
            left: 'center' ,
        },
        series: [{
            name: '金額及佔比',
            type: 'pie',
            radius: '50%',
            data: pieData.value,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label:{
                fontSize:14
            },
            bottom: '20%',
            top:'10%'
        }],

    };
    pieChartInstance.setOption(pieOption);
    return pieChartInstance;
};

const initCharts = async() => {

    const barChartInstance = echarts.init(barChart.value);
    const barOption = {
        backgroundColor: '#ffffff',
        title: {
            text: '類別細項'
        },
        tooltip: {},
        legend: {
            data: ['金額 (TWD)'],
            orient: 'horizontal',
            top: '0%', 
            left: 'right' ,
            textStyle: {
             fontSize: 14, 
              },
        },
        xAxis: {
            
            type: 'category',
            data: [],
            axisLabel: {
                textStyle: {
             fontSize: 14, 
              },
        rotate: -25
        }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
             fontSize: 14, 
              },
        }
        },
        series: [{
            name: '金額 (TWD)',
            type: 'bar',
            data: [],
        }]
    };

    barChartInstance.setOption(barOption);

    const pieChartInstance = updatePieChart();
    pieChartInstance.on('click', async (params) => {
        const categoryName = params.name;
        const barChartData = await loadBarData(props.thisMemberId, categoryName);
        emit('changeTableData',params.name);
        // 更新柱狀圖數據
        barChartInstance.setOption({
            xAxis: {
                data: barChartData.categories 
            },
            series: [{
                data: barChartData.values 
            }]
        });
    });
    watch(() => props.selectSort, async (newSort) => {
    if (newSort) {
        const barChartData = await loadBarData(props.thisMemberId, newSort);
        await loadPieData(props.thisMemberId);
        barChartInstance.setOption({
            xAxis: {
                data: barChartData.categories 
            },
            series: [{
                data: barChartData.values 
            }]
        });
    }
});
    
};

onMounted(() => {
    loadPieData(props.thisMemberId);
    
    initCharts();

    window.onresize = () => {
        if (pieChart.value) {
            echarts.getInstanceByDom(pieChart.value).resize();
        }
        if (barChart.value) {
            echarts.getInstanceByDom(barChart.value).resize();
        }
    };
});

const downloadPieChart = () => {
      const myChart = echarts.getInstanceByDom(pieChart.value);
      const imgData = myChart.getDataURL({
        type: 'png',
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'WeddingPieChart.png';
      link.click();
    };

    const downloadBarChart = () => {
      const myChart = echarts.getInstanceByDom(barChart.value);
      const imgData = myChart.getDataURL({
        type: 'png',
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'WeddingBarChart.png';
      link.click();
    };
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.downloadButton{
    background-color: #CED3C6;
    color: white;
    width: 40px;
}
.downloadButton:hover{
    background-color: #DEE1D9;
}
.row {
    margin: 50px;
    height: 700px;
}

#piechartContain {
    border: 3px dashed burlywood;
    padding: 40px;
    padding-top: 50px;
    border-radius: 25px;
    height: 550px;
}

#barchartContain {
    border-radius: 25px;
    padding: 40px;
    padding-top: 60px;
    border: 3px dashed burlywood;
    height: 550px;
    width: auto;
}

#piechartOuterContain,
#barchartOuterContain {
    border: 1px solid rgb(245, 240, 240);
    border-radius: 25px;
    padding: 10px;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin:auto
}
@media (max-width: 992px) {
    #ChartsContain{
        height:1200px;
    }
}

</style>