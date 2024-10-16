<script setup>
import BudgetChartComponent from '@/components/BudgetChartComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
    const BaseUrl = import.meta.env.VITE_API_BASEURL;
    const API_URL = `${BaseUrl}/MemberBudgetItems`;
    const budgetItems=ref([]);
    const loadBudgetItems = async () => {    
    const response = await fetch(API_URL)
    budgetItems.value = await response.json( )
    console.log(budgetItems.value)   
}
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
                             <input type="text" id="" class="form-control fs-5 fw-bold">
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
             <!-- 總預算輸入計算 end-->
                </div>
                <div class="row">
                    <!-- 預算項目表 -->
                    <div class="col-12 col-sm-10">
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
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ><input type="text"></td>
                        <td ><input type="text"></td>
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
    #InputBudgetContain,#tableContain{
         border: 1px solid rgb(245, 240, 240);
         border-radius: 25px;
         padding: 10px;
         box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
         margin:auto
    }
    #tableContain{
        padding:30px;
    }
    input.form-control{

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
    border:1px solid rgb(22, 54, 22)
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
  tr:hover td { background: rgba(0, 0, 0, 0.03); }
}

</style>