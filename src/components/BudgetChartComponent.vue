<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="mt-5 col-12 col-sm-5" id="piechartOuterContain">
                    <div id="piechartContain">
                        <div ref="pieChart" style="width: 100%; height: 400px;"></div>
                    </div>
                </div>
                <div class="mt-5 col-12 col-sm-6" id="barchartOuterContain">
                    <div id="barchartContain">
                        <div ref="barChart" style="width: 100%; height: 400px;"></div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const BaseUrl = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BaseUrl}/MemberBudgetItems`;
const pieData = ref([]);
const pieChart = ref(null);
const barChart = ref(null);

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
        title: {
            text: '類別預算',
            subtext: '點擊查看細項',
            left: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} TWD ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: '0%', 
            left: 'center' 
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
            }
        }],

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
            data: ['金額 (TWD)'],
            orient: 'horizontal',
            bottom: '0%', 
            left: 'center' 
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '金額 (TWD)',
            type: 'bar',
            data: []
        }]
    };

    barChartInstance.setOption(barOption);

    const pieChartInstance = updatePieChart();
    pieChartInstance.on('click', async (params) => {
        const categoryName = params.name;
        const memberId = 1; // 根據實際情況替換
        const barChartData = await loadBarData(memberId, categoryName);

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
};

onMounted(() => {
    const memberId = 1; // 使用的會員 ID
    loadPieData(memberId);
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

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}



.row {
    margin: 50px;
    height: 600px;
}

#piechartContain {
    border: 3px dashed burlywood;
    padding: 40px;
    padding-top: 50px;
    border-radius: 25px;
    height: 500px;
}

#barchartContain {
    border-radius: 25px;
    padding: 40px;
    padding-top: 60px;
    border: 3px dashed burlywood;
    height: 500px;
}

#piechartOuterContain,
#barchartOuterContain {
    border: 1px solid rgb(245, 240, 240);
    border-radius: 25px;
    padding: 10px;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin:auto
}
</style>