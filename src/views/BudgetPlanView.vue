<script setup>
import BudgetChartComponent from '@/components/BudgetChartComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
import { ref ,computed, watchEffect} from 'vue';
    const BaseUrl = import.meta.env.VITE_API_BASEURL;
    const memberId=101;  //待改成當前會員ID
    const API_URL=`${BaseUrl}/MemberBudgetItems`;
    const initialItemsURL=`${API_URL}/${memberId}`;
    const API_URL_Sort=`${API_URL}/ItemsSort/${memberId}`; 
    //宣告變數接當前選項
    const selectedSort = ref('');

    //初始化
    const hasItems=ref(false);
    const checkItems=async()=>{
        // try {
        // 获取当前会员预算
        const budgetResponse = await fetch(initialItemsURL);
        const budgetData = await budgetResponse.json();
        if (budgetData.length === 0) {
          try{
          const defaults = await fetch(`${BaseUrl}/MemberBudgetItems/1`)
          console.log(defaults)
          const defaultBudgetData = await defaults.json();
          const returnData= defaultBudgetData.map(item => {
            const { budgetItemId, ...rest } = item; // 解構賦值，去掉 budgetItemId
             return rest; // 返回剩餘的屬性
            });
          // 複製預設预算到當前會員
          await fetch(`${API_URL}/initialItem/${memberId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(returnData)
          })}
      catch (error) {
        console.error('Error fetching budget data:', error);
      }
      await loadBudgetItemsSort();
    }
    else{
        await loadBudgetItemsSort();
    }
    }
    checkItems();

    //獲得member的所有分類
    const ItemSorts=ref([]);
    const loadBudgetItemsSort=async () =>{
        const responseSort =await fetch(API_URL_Sort);
        ItemSorts.value=await responseSort.json();
        if (ItemSorts.value.length > 0) {
        await loadBudgetItems(ItemSorts.value[0].budgetItemSort);
        await onCategoryClick(ItemSorts.value[0].budgetItemSort)
        }
    }
    
    
    //獲得分類中的細項
    const budgetItems=ref([]);
    const loadBudgetItems = async (sort) => {    
    const response = await fetch(`${BaseUrl}/MemberBudgetItems/ItemsBySort/${memberId}?sort=${encodeURIComponent(sort)}`); 
    budgetItems.value = await response.json();
}

    //點擊分類獲得對應細項
    const onCategoryClick = (sort) => {
        selectedSort.value = sort;
        loadBudgetItems(sort);
};
    

    //實時改變當前分類的值用於傳送至子組件
    const changeSort = (sort) => {
        selectedSort.value = sort; 
        console.log('zdao f'+sort)
    };
    //集中 按下分類按鈕的事件
    const buttonClickHandler=(inputSort)=>{
        changeSort(inputSort);
        onCategoryClick(inputSort);
    }

    //新增預算項目
    const addOrEditBudgetItem=async()=>{
        // console.log(category.value)
        if(budgetItemBack.value.budgetItemSort==""||budgetItemBack.value.budgetItemDetail==""){
            alert("請確實輸入預算項目名稱及分類")
        }
        else{
            const response = await fetch(API_URL,{
            method:'POST',
             body:JSON.stringify(budgetItemBack.value),
             headers:{'Content-Type':'application/json'}
             })
         if(response.ok){
          await loadBudgetItemsSort();
          await onCategoryClick(budgetItemBack.value.budgetItemSort)
          }else{
               alert('新增失敗,請確認預算項目及分類名稱以外的欄位輸入内容為數字');
             }
        }
    }

    //判斷會員登入與否 觸發編輯或新增事件
    const AddOrEditEventHandler=()=>{
        if(memberId>1){
            addOrEditBudgetItem();
            clearData();
        }
        else{
            alert("請登入以獲得完整服務。")
        }
    }

    //宣告變數準備回傳資料
    const budgetItemBack =ref({
        "budgetItemId": 0,
        "memberId": memberId,
        "budgetItemDetail": "",
        "budgetItemPrice": 0,
        "budgetItemAmount": 1,
         "budgetItemSubtotal": 0,
         "budgetItemSort": "",
        "actualPay": 0,
         "alreadyPay": 0
    })
    watchEffect(
        ()=>{
            console.log(JSON.stringify(budgetItemBack.value))
        }
    )
    //自動計算小計
    const subtotal = computed(() => {
        budgetItemBack.value.budgetItemSubtotal=budgetItemBack.value.budgetItemPrice * budgetItemBack.value.budgetItemAmount
        return (budgetItemBack.value.budgetItemSubtotal) || 0;
        });
    
    //清空欄位
    const clearData=()=>{
        budgetItemBack.value={
            "budgetItemId": 0,
            "memberId": 0,
            "budgetItemDetail": "",
            "budgetItemPrice": 0,
            "budgetItemAmount": 1,
            "budgetItemSubtotal": 0,
            "budgetItemSort": "",
            "actualPay": 0,
            "alreadyPay": 0
        }
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
     <!-- AddModal -->
        <div class="modal fade" id="AddModal" tabindex="-1"         aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">新增預算項目</h5>
                       <button type="button" class="btn-close"      data-bs-dismiss="modal" aria-label="Close" @click="clearData"></button>
                  </div>
                 <div class="modal-body">
                    <div class="input-group-modal">
                        <label class="label-modal">預算項目名稱</label>
                     <div class="input-container">
                         <input autocomplete="off" class="input-modal" type="text" v-model="budgetItemBack.budgetItemDetail">
                    </div>
                    <div class="input-group-modal">
                        <label class="label-modal">預算項目分類</label>
                     <div class="input-container">
                         <input autocomplete="off" class="input-modal" type="text" v-model="budgetItemBack.budgetItemSort">
                    </div>
                </div>
                     <label class="label-modal">單價</label>
                     <div class="input-container">
                        <input autocomplete="off" class="input-modal" type="text" v-model="budgetItemBack.budgetItemPrice">
                     <span class="unit">NT$</span>
                    </div>
                     <label class="label-modal">數量</label>
                     <div class="input-container">
                        <input autocomplete="off" class="input-modal" type="text" v-model="budgetItemBack.budgetItemAmount">
                    </div>
                     <label class="label-modal">小計</label>
                     <div class="input-container">
                     <input autocomplete="off" class="input-modal-readonly" type="text" v-model="subtotal" disabled>
                     <span class="unit">NT$</span>
                    </div>
                     <label class="label-modal">實際支出</label>
                     <div class="input-container">
                        <input autocomplete="off" class="input-modal" type="text" v-model="budgetItemBack.actualPay">
                     <span class="unit">NT$</span>
                    </div>
                     <label class="label-modal">已支付</label>
                     <div class="input-container">
                     <input autocomplete="off" class="input-modal" type="text" v-model="budgetItemBack.alreadyPay">
                     <span class="unit">NT$</span>
                    </div>
                     <div></div></div>

               </div>
          <div class="modal-footer">
           <button type="button" class="btn ActiveButton" data-bs-dismiss="modal" @click="clearData">取消</button>
           <button type="button" class="btn modalButton" @click="AddOrEditEventHandler">新增</button>
             </div>
        </div>
     </div>
        </div>
    <!-- AddModal end-->
             <BudgetChartComponent :selectSort="selectedSort" :thisMemberId="memberId" @changeTableData="onCategoryClick"></BudgetChartComponent>
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
                        <button id="AddBudgetItem" data-bs-toggle='modal' data-bs-target='#AddModal'><i class="bi bi-patch-plus fs-5"></i>  新增預算項目</button>
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
                        <td >{{ budgetItem.actualPay }}</td>
                        <td >{{ budgetItem.alreadyPay }}</td>
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
                                <button type="button" class="SortButton list-group-item list-group-item-action" v-for="budgetItemSort in ItemSorts" :key="budgetItemSort.budgetItemSort" @click="buttonClickHandler(budgetItemSort.budgetItemSort)" :class="selectedSort === budgetItemSort.budgetItemSort ? 'ActiveButton':'InActiveButton'">{{budgetItemSort.budgetItemSort}}</button>
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
    @import url(@/assets/css/budgetPlanViewModal.css);
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
    text-align: center;
  }
  th {
    padding: 2.0rem 1.0rem;
    
  }
  td {
    padding: 1.8rem 1.0rem;
    transition: all 0.3s ease;
    .btn { display: inline; }
  }
  tr:hover td { background: #FAFAFA; }

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