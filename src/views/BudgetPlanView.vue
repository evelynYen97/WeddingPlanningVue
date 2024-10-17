<script setup>
import BudgetChartComponent from '@/components/BudgetChartComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
import { ref } from 'vue';
    const BaseUrl = import.meta.env.VITE_API_BASEURL;
    // const API_URL = `${BaseUrl}/MemberBudgetItems/${memberID}?sort=${encodeURIComponent(sort)}`;
    const API_URL_Sort=`${BaseUrl}/MemberBudgetItems/ItemsSort/1`; //待改成會員ID


    //獲得member的所有分類
    const ItemSorts=ref([]);
    const loadBudgetItemsSort=async () =>{
        const responseSort =await fetch(API_URL_Sort);
        ItemSorts.value=await responseSort.json();
        console.log(ItemSorts)
        if (ItemSorts.value.length > 0) {
        loadBudgetItems(ItemSorts.value[0].budgetItemSort);
        }
    }
    loadBudgetItemsSort();
    
    //獲得分類中的細項
    const budgetItems=ref([]);
    const loadBudgetItems = async (sort) => {    
    const response = await fetch(`${BaseUrl}/MemberBudgetItems/ItemsBySort/1?sort=${encodeURIComponent(sort)}`); //待改成會員ID
    budgetItems.value = await response.json();
    console.log(budgetItems.value); 
}

    //點擊分類獲得對應細項
    const onCategoryClick = (sort) => {
        selectedSort.value = sort;
        loadBudgetItems(sort);
};
    //宣告變數接當前選項
    const selectedSort = ref('');
</script>

<template>
    <div>
    <header>
        <HeaderComponent></HeaderComponent>
        <SampleComponent></SampleComponent>
    </header>
    <main>
        <article>
            
             <BudgetChartComponent></BudgetChartComponent>
             <div class="container">
                <div class="row">
                     <!-- 總預算輸入計算 -->
                <div id="InputBudgetContain" class="col-12 col-sm-6">
                <div id="InputContent">
                        <div class="d-flex align-items-center">
                            <label class="fs-5 fw-bold">預算總金額：</label>
                             <input type="text" id="TotalBudget" class="form-control fs-5 fw-bold">
                             <label class="fs-6 fw-bold">TWD</label>
                         </div>
                    <span class="col-sm-2">
                        <label for="" class="fs-5 fw-bold">當前預算總支出：0 TWD</label>
                    </span>   
                     <span class="col-sm-2">
                        <label for="" class="fs-5 fw-bold">當前剩餘金額 ：0 TWD</label>
                </span >
                </div>
                 </div>
                 </div>
                 <!-- 總預算輸入計算 end-->
                    <div class="row">
                    <!-- 預算項目表 -->
                    <div class="col-12 col-sm-9">
                        <button id="AddBudgetItem"><i class="bi bi-patch-plus fs-5"></i>  新增預算項目</button>
                        <div id="tableContain">
                            <table class="table"> 
                 <thead>
                     <tr>
                         <th>預算項目名稱</th>
                         <th>單價</th>
                         <th>數量</th>
                         <th>小計</th>
                         <th>實際支出</th>
                         <th>已支付</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                    <tr v-for="budgetItem in budgetItems" :key="budgetItem.budgetItemId">
                        <td >{{ budgetItem.budgetItemDetail }}</td>
                        <td >{{ budgetItem.budgetItemPrice }}</td>
                        <td >{{ budgetItem.budgetItemAmount }}</td>
                        <td >{{ budgetItem.budgetItemSubtotal }}</td>
                        <td ><input type="text" class="payInput form-control fs-6 fw-bold" v-model="budgetItem.actualPay"></td>
                        <td ><input type="text" class="payInput form-control fs-6 fw-bold" v-model="budgetItem.alreadyPay"></td>
                        <td>
                            <button id="EditBudgetItem" class="text-info"><i class="bi bi-pen"></i></button>|
                            <button id="DeleteBudgetItem" class="text-danger"><i class="bi bi-trash3"></i></button>
                        </td>
                    </tr>      
                 </tbody>
                </table>
                        </div>
                
                     </div>
                   <!-- 預算項目表end -->
                    <!-- 預算項目分類 -->
                     <div class="col-12 col-sm-3">
                        <div id="sortListContain">
                            <div class="list-group">
                                <button type="button" class="SortButton list-group-item list-group-item-action" v-for="budgetItemSort in ItemSorts" :key="budgetItemSort.budgetItemSort" @click="onCategoryClick(budgetItemSort.budgetItemSort)" :class="selectedSort === budgetItemSort.budgetItemSort ? 'ActiveButton':'InActiveButton'">{{budgetItemSort.budgetItemSort}}</button>
                            </div>
                        </div>
                     </div>
                    <!-- 預算項目分類end -->
                  </div>
             </div>
         </article>
    </main>
    <aside>
        <item>
            
        </item>
    </aside>
    
    </div>
</template>

<style lang="css" scoped>
    #InputBudgetContain,#tableContain,#sortListContain{
         border: 1px solid rgb(245, 240, 240);
         border-radius: 25px;
         padding: 10px;
         box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
         margin:auto
    }
    #tableContain{
        padding:30px;
    }
    #TotalBudget{

        width: 50%;
        border-radius: 5px;
        border-bottom: 3px solid rgb(255, 231, 231);
        display: inline;
    }
    #InputContent{
        margin: 20px;
    }

    #AddBudgetItem{
        color: #000;
        background-color: #EEF0F0;
        text-decoration: none;
        border-radius: 15px;
        margin-bottom: 10px;
    }
    #AddBudgetItem:hover{
        color: #EEF0F0;
        background-color: darkolivegreen;
    }
    #EditBudgetItem,#DeleteBudgetItem{
        border-radius: 15px;
    }
    #EditBudgetItem:hover,#DeleteBudgetItem:hover{
        background-color:#F0F2F2;
    }

    table {
	width: 100%;
  margin: 2rem 0 4rem 0;
	border-spacing: 0;
    border-radius: 15px;
    border-bottom:1px solid rgb(235, 235, 235)
}
  td, th {
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.05);
  }
  th {
    padding: 2.0rem 1.0rem;
    text-align: left;
  }
  td {
    padding: 1.8rem 1.0rem;
    transition: all 0.3s ease;
    .btn { display: inline; }
  }
  tr:hover td { background: #FAFAFA; }

    .payInput{
        width:100px;
    }
    .SortButton{
        border-top:none;
        border-left:none;
        border-right:none;
        color:#4C4C4C;
    }
    .ActiveButton{
        background-color: #F0F2F2;
    }
    .InActiveButton{
        background-color: transparent;
    }
</style>