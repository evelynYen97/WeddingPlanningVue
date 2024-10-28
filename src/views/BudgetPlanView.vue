<script setup>
import BudgetChartComponent from '@/components/BudgetChartComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
import { ref ,computed, watchEffect} from 'vue';
import { VAlert} from 'vuetify/components';
    const BaseUrl = import.meta.env.VITE_API_BASEURL;
    //取得當前memberID
    function getMemberID() {
    const cookies = document.cookie.split('; ');
    let memberID = '1'; // 默认值

    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === 'memberID') {
            memberID = value;
            break;
        }
    }
    return memberID;
}
    const memberId = getMemberID();

    const API_URL=`${BaseUrl}/MemberBudgetItems`;
    const initialItemsURL=`${API_URL}/${memberId}`;
    const API_URL_Sort=`${API_URL}/ItemsSort/${memberId}`; 
    //宣告變數接當前分類選擇
    const selectedSort = ref('');
    //宣告變數改變modal標題
    const modalText=ref('新增預算項目');
    //宣告變數接會員設定總預算金額
    const totalBudget=ref(0);
    const loadMemberBudget=async()=>{
        const responseMemberbudget=await fetch(`${API_URL}/BudgetTotal/${memberId}`);
        const data=await responseMemberbudget.json();
        totalBudget.value=data.budgetTotal;
    }
    loadMemberBudget();
    //會員預算編輯顯示與否
    const totalBudgetShow=ref(true);
    
    //宣告變數接當前預算總金額
    const totalNow=ref(0);
    const loadBudgetNow=async()=>{
        const responseBudgetNow=await fetch(`${API_URL}/BudgetNowTotal/${memberId}`);
        const data=await responseBudgetNow.json();
        totalNow.value=data.budgetNowTotal;
    }
    const restNow=computed(()=>{return Number(totalBudget.value)-Number(totalNow.value)})

    //修改會員預算項目
    const EditTotalBudget=async()=>{
        const backMemberBudget=ref({
            "budgetTotal":totalBudget.value
        })
        const response=await fetch((`${API_URL}/BudgetTotal/${memberId}`),{
            method:"PUT",
            body:JSON.stringify(backMemberBudget.value),
            headers:{'Content-type':'application/json'}
        })
        // if(response.ok){
        //     alert('會員總預算設定修改成功');
        // }
        // else{
        //     alert('修改儲存失敗')
        // }
    }
    //預算項目按鈕事件集合
    const editTotalButtonClick=()=>{
        if(totalBudgetShow.value===false){
            if(memberId>1){
                EditTotalBudget();
            }
            else{
                alertShow.value=true;
                alertType.value='warning';
                alertMessage.value='請登入以獲得完整服務。';
            }
            totalBudgetShow.value=true;
        }
        else{
            totalBudgetShow.value=false;
        }
        
    }

    //初始化
    const checkItems=async()=>{
        // try {
        // 获取当前会员预算
        const budgetResponse = await fetch(initialItemsURL);
        const budgetData = await budgetResponse.json();
        if (budgetData.length === 0) {
          try{
          const defaults = await fetch(`${BaseUrl}/MemberBudgetItems/1`)
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
            selectedSort.value="";
        await loadBudgetItems(ItemSorts.value[0].budgetItemSort);
        await onCategoryClick(ItemSorts.value[0].budgetItemSort);
        await loadBudgetNow();
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
            alertShow.value=true;
                alertType.value='danger';
                alertMessage.value='請確實輸入預算項目名稱及分類';
        }
        else{
            if(budgetItemBack.value.budgetItemId>0){
                const response = await fetch(`${API_URL}/${budgetItemBack.value.budgetItemId}`,{
                method:'PUT',
                 body:JSON.stringify(budgetItemBack.value),
                headers:{'Content-Type':'application/json'}
             })
             if(response.ok){
                 await loadBudgetItemsSort();
                    alertShow.value=true;
                    alertType.value='success';
                    alertMessage.value='資料修改成功';
             }else{
            //    alert('修改失敗,請確認預算項目及分類名稱以外的欄位輸入内容為數字');
                alertShow.value=true;
                alertType.value='danger';
                alertMessage.value='修改失敗';
             }
            }
            else{
                const response = await fetch(API_URL,{
                method:'POST',
                 body:JSON.stringify(budgetItemBack.value),
                headers:{'Content-Type':'application/json'}
             })
             if(response.ok){
                     alertShow.value=true;
                    alertType.value='success';
                    alertMessage.value='資料新增成功';
             await loadBudgetItemsSort();
             }else{
                alertShow.value=true;
                alertType.value='danger';
                alertMessage.value='新增失敗';
             }
            }
        }
    }

    //判斷會員登入與否 觸發編輯或新增事件
    const AddOrEditEventHandler=async()=>{
        if(memberId>1){
            await addOrEditBudgetItem();
            await loadBudgetNow();
            await clearData();
        }
        else{
                alertShow.value=true;
                alertType.value='warning';
                alertMessage.value='請登入以獲得完整服務。';
            cancelEdit();
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
    
    //自動計算小計
    const subtotal = computed(() => {
        budgetItemBack.value.budgetItemSubtotal=budgetItemBack.value.budgetItemPrice * budgetItemBack.value.budgetItemAmount
        return (budgetItemBack.value.budgetItemSubtotal) || 0;
        });
    //用於判斷當前狀態避免顯示資訊錯誤
    const AddOrEditNow=ref('');
    const IsAddOrEdit=(doing)=>{
        AddOrEditNow.value=doing;
    }
    //取消編輯
    const cancelEdit=()=>{
        if(AddOrEditNow.value==='編輯'){
            budgetItems.value=budgetItemTemp.value;
        }
        clearData();
    }
    //清空欄位
    const clearData=()=>{
        
        budgetItemBack.value={
            "budgetItemId": 0,
            "memberId": memberId,
            "budgetItemDetail": "",
            "budgetItemPrice": 0,
            "budgetItemAmount": 1,
            "budgetItemSubtotal": 0,
            "budgetItemSort": "",
            "actualPay": 0,
            "alreadyPay": 0
        }
        modalText.value="新增預算項目";
    }

    //宣告變數準備編輯資料
    const budgetItemTemp = ref(null);
    const editData=(item)=>{
        budgetItemBack.value=item;
        budgetItemTemp.value=JSON.parse(JSON.stringify(budgetItems.value)); //深拷貝避免資料變動
        modalText.value="編輯預算項目";
        AddOrEditNow.value="編輯";
        console.log("is"+AddOrEditNow.value)
    }
    watchEffect(
        ()=>{
            console.log("item"+JSON.stringify(budgetItems.value))
            console.log("Temp:"+JSON.stringify(budgetItemTemp.value))
        }
    )

    //刪除資料
    const deleteItem=ref({
        "budgetItemId": 0,
        "budgetItemDetail": "",
    });
    //顯示刪除資料内容提示
    const whichItemToDelete=async(itemID, detailName)=>{
        deleteItem.value.budgetItemId=itemID,
        deleteItem.value.budgetItemDetail=detailName
        console.log(deleteItem.value)
    }
    //刪除
    const deleteBudgetItem=async(itemID)=>{
        if(memberId>1){
            const deleteAction=await fetch(`${API_URL}/${itemID}`,{
            method:'DELETE',
        })
        if(deleteAction.ok){
            alertShow.value=true;
            alertType.value='success';
            alertMessage.value='資料刪除成功';
            deleteItem.value={
                "budgetItemId": 0,
                 "budgetItemDetail": "",
            }
            await loadBudgetItemsSort();
        }
        else{
                alertShow.value=true;
                alertType.value='danger';
                alertMessage.value='刪除失敗';
        }
        }
        else{
                alertShow.value=true;
                alertType.value='warning';
                alertMessage.value='請登入以獲得完整服務。';
        }
        

    }


    //alert
    const alertShow = ref(false);
    const alertType = ref('success'); // 或 'error', 'warning', 'info'
    const alertMessage=ref('請登入以獲得完整服務。')
   
</script>

<template>
    <div>
    <header>
        <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
    </header>
    <main>
        <article>
            <v-alert
      v-model="alertShow"
      :type="alertType"
      border="start"
      close-label="Close Alert"
      :title="alertMessage"
      variant="tonal"
      closable
      class="alert-center"
      dismissable
    >
      點擊提示框右上角可關閉此提示
    </v-alert>

     <!-- AddModal -->
        <div class="modal fade" id="AddModal" tabindex="-1"         aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{ modalText }}</h5>
                       <button type="button" class="btn-close"      data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit"></button>
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
           <button type="button" class="btn ActiveButton" data-bs-dismiss="modal" @click="cancelEdit">取消</button>
           <button type="button" class="btn modalButton" data-bs-dismiss="modal" @click="AddOrEditEventHandler">儲存</button>
             </div>
        </div>
     </div>
        </div>
    <!-- AddModal end-->
     <!-- DeleteModal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">刪除預算項目</h5>
           <button type="button" class="btn-close ActiveButton" data-bs-dismiss="modal"     aria-label="Close"></button>
          </div>
         <div class="modal-body">
             <h4>是否確認刪除這筆預算項目？</h4>
             <div class="ForSpace"> </div>
             <h5>預算項目名稱:</h5>
             <h6>{{ deleteItem.budgetItemDetail }}</h6>
          </div>
              <div class="modal-footer">
            <button type="button" class="btn ActiveButton" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn DeleteButton" @click="deleteBudgetItem(deleteItem.budgetItemId)" data-bs-dismiss="modal">刪除</button>
          </div>
        </div>
     </div>
    </div>
     <!-- DeleteModal end-->
             <BudgetChartComponent :selectSort="selectedSort" :thisMemberId="memberId" @changeTableData="onCategoryClick"></BudgetChartComponent>
             <div class="container">
                
                </div>
                 
                    <div class="row listContainRow">
                    <!-- 預算項目表 -->
                         <div class="col-12 col-sm-9">
                            <!-- 總預算輸入計算 -->
                             <div class="row">
                    <div class="col-12 col-md-4 me-0 mb-3 InputBudgetContain" style="height: 142px;">
                        <div id="InputContent">
                            <div class="me-0 w-100 d-flex justify-content-between">
                                <label class="fs-5 fw-bold ms-0">會員預算總金額： </label>
                                <button class="ActiveButton rounded" @click="editTotalButtonClick"><i class="bi bi-pencil-square text-secondary" v-show="totalBudgetShow"></i> <i class="bi bi-floppy text-secondary" v-show="!totalBudgetShow"></i></button>
                               
                            </div>
                            <div class="d-flex justify-content-end ">
                                 <label class="fs-5 fw-bold" v-if="totalBudgetShow">{{ totalBudget }}</label>
                               <div v-else>
                                <input type="text" id="TotalBudget" class="form-control fs-5 fw-bold h-50"  v-model="totalBudget">
                              </div>
                                <span class="me-2"></span>
                                <label class="fs-5 fw-bold"> TWD</label>
                            </div>
                        
                         
                </div>
                     </div>
                     <div class="col-12 col-md-5 mx-2 mb-3  InputBudgetContain">
                        <div id="InputContent">
                        <div class="d-flex justify-content-between">
                            <label class="fs-5 fw-bold">當前預算總支出：</label>
                            <label class="fs-5 fw-bold">{{totalNow}} TWD</label>
                        </div>
                        <div class="d-flex justify-content-between">
                            <label class="fs-5 fw-bold">當前剩餘金額 ：</label>
                            <label class="fs-5 fw-bold">{{restNow}} TWD</label>
                        </div>
                        </div>
                    </div>
                </div>
                     <!-- 總預算輸入計算 end-->
                        <button id="AddBudgetItem" data-bs-toggle='modal' data-bs-target='#AddModal' @click="IsAddOrEdit('新增')"><i class="bi bi-patch-plus fs-5"></i>  新增預算項目</button>
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
                            <button id="EditBudgetItem" class="text-info" data-bs-toggle='modal' data-bs-target='#AddModal' @click="editData(budgetItem)"><i class="bi bi-pen"></i></button>|
                            <button id="DeleteBudgetItem" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="whichItemToDelete(budgetItem.budgetItemId,budgetItem.budgetItemDetail)"><i class="bi bi-trash3"></i></button>
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
                                <li class="list-group-item " style="border:none;padding-bottom: 0;">
                                    <div class="ms-2 me-auto" >
                                      <label class="fs-5 fw-bold text-secondary" >預算項目分類</label>
                                    </div>
                                </li>
                                <div style="height:3px; margin-bottom: 3px; background-color: #B4BEA7;"></div>
                                <button type="button" class="SortButton list-group-item list-group-item-action" v-for="budgetItemSort in ItemSorts" :key="budgetItemSort.budgetItemSort" @click="buttonClickHandler(budgetItemSort.budgetItemSort)" :class="selectedSort === budgetItemSort.budgetItemSort ? 'ActiveButton':'InActiveButton'">{{budgetItemSort.budgetItemSort}}</button>
                            </div>
                        </div>
                         </div>
                    <!-- 預算項目分類end -->
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
    .InputBudgetContain,#tableContain,#sortListContain{
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

        width: 100%;
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
    .ActiveButton:hover,.InActiveButton:hover,#AddBudgetItem:hover{
        background-color: #DBDFD6;
    }
    .InActiveButton{
        background-color: transparent;
    }
    .DeleteButton{
        background-color: rgb(238, 78, 78);
        color:white;
    }
    .ForSpace{
        height:50px;
    }
    .SortListHead{
        border-bottom: 3px dashed darkolivegreen;
    }
    .listContainRow{
        margin:20px ;
    }
    .alert-center {
        position: fixed;
         top: 20%;
         left: 80%;
         transform: translate(-50%, -50%);
         z-index: 1000; /* 确保在最上层 */
        }
</style>