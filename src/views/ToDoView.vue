<script setup>
    import { ref, onMounted, watch, computed, toRaw } from 'vue';
    import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
    import SampleComponent from '@/components/SampleComponent.vue';
    import { useRouter } from 'vue-router';
    // import router from '@/router';
    // import ThemeSwitcher from '@/share_components/ThemeSwitcher.vue';
    // import 'primeicons/primeicons.css'
    
    const todos = ref([]);  // 從 API 取得的待辦事項資料
    const selectedTodos = ref([]); // 選取的待辦事項
    const filters = ref();
    const statuses = ref([
        { label: '未完成', value: '未完成' },
        { label: '已完成', value: '已完成' },
    ]);

    const taskSortOptions = ref([
        { label: '餐飲', value: '餐飲' },
        { label: '場地', value: '場地' },
        { label: '活動', value: '活動' },
        { label: '其他', value: '其他' },
    ]);

    // 用於儲存新增的待辦事項資料
    const newTodo = ref({
        memberId: 1,   
        toDoName: '',
        personInCharge: '',
        taskSort: '',
        expiringDate: null,
        taskStatus: '未完成', 
    });
    const taskDialog = ref(false); // 用來控制對話框的顯示
    // 用來控制刪除對話框的顯示

    const deleteTasksDialog = ref(false);
    const submitted = ref(false); // 添加這一行以定義 submitted
    const hideCompleted = ref(false); // 用來隱藏已完成的待辦事項的狀態
    const exportConfirmDialog = ref(false);
    const editingRows = ref([]); // 用來存儲正在編輯的行
    // const router = useRouter(); // 初始化 router
    

    // 對話框顯示狀態
    const showAlertDialog = ref(false); // 控制顯示對話框的狀態
    
    // 取得memberid
    const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    // 檢查是否已登入的函數
    const checkLogin = () => {
        const memberId = getCookieValue('memberID');
        // console.log('memberId:', memberId); // 輸出 memberId
        if (!memberId) {
            showAlertDialog.value = true; // 顯示對話框
            return false; // 未登入
        }
        return true; // 已登入
    };

    // 重新獲取待辦事項的函數
    const fetchTodos = async (memberId) => {
        try {
            const response = await fetch(`https://localhost:7048/api/ToDoes/GetToDoDTOs?memberId=${memberId}`);
            if (!response.ok) {
                throw new Error('網路回應不正常');
            }
            const data = await response.json();
            todos.value = data.map(d => ({
                toDoId: d.toDoId,
                memberId: d.memberId,
                toDoName: d.toDoName,
                expiringDate: new Date(d.expiringDate), 
                taskStatus: d.taskStatus,
                personInCharge: d.personInCharge,
                taskSort: d.taskSort,
            }));
            // 根據 taskStatus 設定 selectedTodos
            selectedTodos.value = todos.value.filter(todo => todo.taskStatus === '已完成');
        } catch (error) {
            console.error('抓取資料時出現問題:', error);
        }
    };

    onMounted(() => {
    const memberId = getCookieValue('memberID');
    if (memberId) {
        fetchTodos(memberId);
    } else {
        // console.log('未找到 memberId，使用預設待辦事項');
        fetchTodos(1); // 使用訪客的 memberId 獲取預設的待辦事項
    }
    }); 

    // 篩選設定初始值
    const initFilters = () => {
        filters.value = { 
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },  // 全局搜尋
            toDoName: { 
                operator: FilterOperator.AND, 
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] // 部分匹配：用於查找任意部分包含搜尋字詞的待辦事項
            },
            personInCharge: { 
                operator: FilterOperator.AND, 
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] // 以部分匹配來查找包含的名稱
            },
            taskSort: { 
                operator: FilterOperator.OR, // 修改為OR操作符
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] // 精確匹配
            },
            expiringDate: { 
                operator: FilterOperator.AND, 
                constraints: [
                    { value: null, matchMode: FilterMatchMode.DATE_IS }  // 精確匹配：查找符合選定日期的事項
                ] 
            },
        };
    };

    initFilters();

    // 清除篩選
    const clearFilter = () => {
        initFilters();
    };

    // table時間格式化
    const formatDate = (date) => {
        return new Date(date).toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit', 
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Taipei'
        });
    };

    // CSV時間格式化
    const formatDateCSV = (date) => {  
        return `"${new Date(date).toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'Asia/Taipei'
        })}"`;
    };

    // 取得狀態
    const getStatus= (status) => {
        switch (status) {
            case '未完成':
                return 'danger';

            case '已完成':
                return 'success';
    
            default:
                return null;
        }
    };

    //取得標籤
    const getSort = (sort) => {
        switch (sort) {
            case '餐飲':
                return 'danger';

            case '場地':
                return 'success';

            case '活動':
                return 'info';

            case '其他':
                return 'warning';
    
            default:
                return null;
        }
    }

   // 勾選待辦事項修改資料庫完成與否狀態
    watch(selectedTodos, (newSelected) => {
        todos.value.forEach(async (todo) => {
            const originalStatus = todo.taskStatus;
            
            // 更新狀態
            if (newSelected.includes(todo)) {
                todo.taskStatus = '已完成';
            } else {
                todo.taskStatus = '未完成';
            }

            // 若狀態有變化，則發送 PUT 請求
            if (originalStatus !== todo.taskStatus) {
                try {
                    const response = await fetch(`https://localhost:7048/api/ToDoes/${todo.toDoId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...todo,  // 將待辦事項的其他資料保留
                            taskStatus: todo.taskStatus,
                        }),
                    });
                    
                    if (!response.ok) {
                        throw new Error('更新任務狀態失敗');
                    }
                    // console.log(`待辦事項 ID ${todo.toDoId} 的狀態已更新為 ${todo.taskStatus}`);
                } catch (error) {
                    console.error(`更新待辦事項 ID ${todo.toDoId} 的狀態時發生錯誤:`, error);
                    // 如果有錯誤，您可以選擇恢復狀態為原始狀態
                    todo.taskStatus = originalStatus;
                }
            }
        });
    });


    // 用於開啟新增待辦事項的函數
    const openNew = () => {
        if (!checkLogin()) {
        return;
    }   

        const memberId = getCookieValue('memberID');
        // 清空 newTodo 資料，準備新增 (初始)
        newTodo.value = {
            memberId: memberId, // 確保使用當前會員的 memberId
            toDoName: '',
            personInCharge: '',
            taskSort: '',
            expiringDate: null,
            taskStatus: '未完成',
        };
        // 打開新增表單的對話框
        taskDialog.value = true;
    }; 

    // 儲存新增的待辦事項
    const saveTask = async () => {
        if (!checkLogin()) return; // 檢查登入狀態

        submitted.value = true; // 在保存任務前，將 submitted 設置為 true
        // 必填欄位的映射
        const requiredFields = {
            toDoName: '請填寫事項名稱',
            personInCharge: '請填寫負責人',
            taskSort: '請選擇事項分類',
            expiringDate: '請選擇到期時間',
        };

        // 驗證所有必填欄位
        for (const field in requiredFields) {
            if (!newTodo.value[field]) {
                console.error(requiredFields[field]);
                return; // 如果該欄位沒有填寫，直接返回
            }
        }
    
        // // 打印要发送的请求数据
        // console.log("要发送的待办事项数据:", newTodo.value);

        try {
            const response = await fetch('https://localhost:7048/api/ToDoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberId: newTodo.value.memberId, 
                    toDoName: newTodo.value.toDoName, 
                    personInCharge: newTodo.value.personInCharge,
                    taskSort: newTodo.value.taskSort.value,  // 指定為物件裡的value
                    expiringDate: newTodo.value.expiringDate,
                    taskStatus: '未完成', 
                }),
            });

            if (!response.ok) {
                throw new Error('無法新增待辦事項');
            }

            const createdTodo = await response.json();
            todos.value.push(createdTodo);
            taskDialog.value = false;

            // 調用 fetchTodos 以重新獲取待辦事項列表  // 為何我一定要這樣啊
            await fetchTodos(newTodo.value.memberId);

        } catch (error) {
            console.error('新增待辦事項時出現錯誤:', error);
        }
    };


    // 關閉對話框
    const hideDialog = () => {
        taskDialog.value = false;
    };


    // 刪除選取的待辦事項
    const deleteSelectedTasks = async () => {
        // if (!checkLogin()) return; // 檢查登入狀態

        try {
            // 逐個刪除所有選取的待辦事項
            const deleteRequests = selectedTodos.value.map(task =>
                fetch(`https://localhost:7048/api/ToDoes/${task.toDoId}`, { method: 'DELETE' })
            );

            await Promise.all(deleteRequests);

            // 更新前端列表，移除已刪除的項目
            todos.value = todos.value.filter(task => !selectedTodos.value.includes(task));
            selectedTodos.value = []; // 清空選取項目
            // console.log('所選項目已刪除');
            deleteTasksDialog.value = false; // 關閉對話框
        } catch (error) {
            console.error('刪除多個待辦事項時出現錯誤:', error);
        }
    };

    // 刪除選取項目確認
    const confirmDeleteSelected = () => {
        if (!checkLogin()) {
        return; // 若未登入，直接返回不繼續執行
    }
        deleteTasksDialog.value = true;
    };

    // 匯出確認方法
    const confirmExport = () => {
        exportConfirmDialog.value = true;
    };

    // 輸出CSV
    const exportCSV = () => {
        exportConfirmDialog.value = false; // 關閉確認對話框
        // console.log('匯出 CSV');
        
        // 定義 CSV 標頭
        const headers = ['事項名稱', '負責人', '分類', '到期日期', '狀態'];
        const rows = todos.value.map(todo => [
            todo.toDoName || '',
            todo.personInCharge || '',
            todo.taskSort || '',
            `"${formatDateCSV(todo.expiringDate) || ''}"`,
            todo.taskStatus || ''
        ]);

        // 將數據組合成 CSV 格式，添加 \uFEFF 作為 UTF-8 標記
        const csvContent = [
            '\uFEFF' + headers.join(','), // 添加 UTF-8 标记
            ...rows.map(row => row.join(','))
        ].join('\n');

        // 創建 Blob 對象
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // 創建臨時下載鏈接
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `todos_export_${new Date().toLocaleDateString('zh-TW')}.csv`);
        document.body.appendChild(link);
        link.click();

        // 清除臨時鏈接
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // 隱藏和顯示
    const toggleCompletedTasks = () => {
        hideCompleted.value = !hideCompleted.value;
    };

    // 切換顯示/隱藏標籤名字
    const toggleButtonLabel = computed(() => {
        return hideCompleted.value ? '顯示' : '隱藏';
    });


    // 有篩選過濾的待辦事項
    const filteredTodos = computed(() => {
        return todos.value.filter(todo => {
            return !(hideCompleted.value && todo.taskStatus === '已完成');
        });
    });

    const onRowEditSave = async (event) => {
        if (!checkLogin()) {
        return; // 若未登入，直接返回不繼續執行
        }

        // 使用淺拷貝取得最新編輯後的資料
        // console.log(event); // 檢查事件內容 // event.newData才是新的，原本event.data是舊資料
        const updatedTodo = { ...event.newData };
        // console.log(updatedTodo);

        try {
            // 送出 PUT 請求更新資料庫中的待辦事項
            const response = await fetch(`https://localhost:7048/api/ToDoes/${updatedTodo.toDoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toDoId: updatedTodo.toDoId,
                    memberId: updatedTodo.memberId,
                    toDoName: updatedTodo.toDoName,
                    personInCharge: updatedTodo.personInCharge,
                    taskSort: updatedTodo.taskSort,
                    expiringDate: updatedTodo.expiringDate,
                    taskStatus: updatedTodo.taskStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('更新失敗，請稍後再試');
            }


            // 更新本地的 todos 列表，不需要重新載入整個列表
            const index = todos.value.findIndex(todo => todo.toDoId === updatedTodo.toDoId);
            if (index !== -1) {
                todos.value[index] = updatedTodo;  // 更新相應的 todo
            }

            // 若更新成功，可在此顯示成功提示或進行其他操作
            // console.log(`待辦事項 ${updatedTodo.toDoId} 更新成功`);
            // fetchTodos();   

        } catch (error) {
            console.error('儲存編輯時出現錯誤:', error);
            // 若出錯，可選擇恢復編輯前的狀態或提示錯誤訊息
        }
    };

    // 隱藏警告對話框
    const hideAlertDialog = () => {
        showAlertDialog.value = false;
    };

</script>

<template>

    <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;"></div></SampleComponent>  
        <!-- <button @click="toggleDarkMode">切換暗黑模式</button> --> 
        <!-- <ThemeSwitcher /> -->
        <!-- app-container p-dark -->
    <div class="containerStyle">

            <Toolbar class="mb-0">
                <template #start>
                    <!-- 新增按鈕 -->
                    <Button label="新增" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    
                    <!-- 刪除按鈕：需有選取的項目才能啟用 -->
                    <Button 
                        label="刪除" 
                        icon="pi pi-trash" 
                        severity="danger" 
                        outlined 
                        @click="confirmDeleteSelected" 
                        :disabled="!selectedTodos || !selectedTodos.length" 
                    />
                    
                </template>

                <template #end>
                    <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" class="mr-2" outlined @click="clearFilter()" />  -->
                    <!-- 隱藏已完成的待辦事項按鈕 -->
                    <Button 
                        :label="toggleButtonLabel" 
                        :icon="hideCompleted ? 'pi pi-eye' : 'pi pi-eye-slash'" 
                        class="mr-2"
                        :severity="hideCompleted ? 'black' : 'secondary'" 
                        @click="toggleCompletedTasks" 
                    />
                    
                    <!-- 匯出按鈕 -->
                    <Button 
                        label="匯出" 
                        icon="pi pi-upload" 
                        severity="secondary" 
                        @click="confirmExport"
                    />
                </template>
            </Toolbar>

            <DataTable
            @row-edit-save="onRowEditSave"  
            editMode="row"
            v-model:editingRows="editingRows"
            v-model:filters="filters"
            v-model:selection="selectedTodos" 
            :value="filteredTodos" 
            paginator 
            :rows="10" 
            dataKey="toDoId" 
            filterDisplay="menu"
            :globalFilterFields="['toDoName', 'personInCharge']" >
                <!-- 清除篩選條件 輸入搜尋條件 -->
                <template #header>
                    <div class="header-container">
                        <Button type="button" icon="pi pi-filter-slash" label="清除" outlined @click="clearFilter()" />
                        <IconField class="search-container">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="關鍵字搜尋"/>
                        </IconField>    
                    </div>
                </template>

                <template #empty> 沒有找到符合的待辦事項 </template>
                <!-- 允許選取多欄位 -->
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> 
                
                <!-- 待辦事項名稱 -->
                <Column field="toDoName" header="事項名稱" sortable style="min-width: 14rem">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" class="editInput-styles" />
                    </template>

                    <template #body="{ data }">
                        <div :class="{'completed': data.taskStatus === '已完成'}">
                            {{ data.toDoName }}
                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" placeholder="搜尋待辦事項" />
                    </template>
                </Column>

                <!-- 待辦事項負責人 -->
                <Column field="personInCharge" header="事項負責人" sortable style="min-width: 14rem">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" class="editInput-styles" />
                    </template>

                    <template #body="{ data }">
                        <div :class="{'completed': data.taskStatus === '已完成'}">
                            {{ data.personInCharge }}
                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value"  placeholder="搜尋負責人" />
                    </template>
                </Column>


                <!-- 事項分類 -->
                <Column field="taskSort" header="事項分類" sortable style="min-width: 10rem">
                    <template #editor="{ data, field }">
                        <Select v-model="data[field]" :options="taskSortOptions" optionLabel="label" optionValue="value" placeholder="選擇分類" />
                    </template>

                    <template #body="{ data }">
                        <div :class="{'completed': data.taskStatus === '已完成'}">
                            <Tag :value="data.taskSort" :severity="getSort(data.taskSort)" />
                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <Select v-model="filterModel.value" :options="taskSortOptions" optionLabel="label" optionValue="value" placeholder="選擇分類" showClear />
                    </template>
                  
                </Column>

                <!-- 待辦事項到期時間 -->
                <Column field="expiringDate" header="到期時間" sortable dataType="date" style="min-width: 12rem">
                    <template #editor="{ data, field }" >
                        <DatePicker v-model="data[field]" showTime class="my-datepicker editInput-my-datepicker" />
                    </template>

                    <template #body="{ data }">
                        <div :class="{'completed': data.taskStatus === '已完成'}">
                            {{ formatDate(data.expiringDate) }}                 
                        </div>
                    </template>

                    <template #filter="{ filterModel }">
                        <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                    </template>
                </Column>


                <!-- 待辦事項完成狀態 -->
                <Column field="taskStatus" header="事項狀態" sortable style="min-width: 10rem">
                    <template #editor="{ data, field }">
                        <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" />
                    </template>

                    <template #body="{ data }">
                        <Tag :value="data.taskStatus" :severity="getStatus(data.taskStatus)" />
                    </template>

                    
                </Column>


                <!-- 活動完成度(不一定要) -->
                <!-- <Column field="activity" header="Activity" sortable :showFilterMatchModes="false" style="min-width: 12rem">
                    <template #body="{ data }">
                        <ProgressBar :value="data.activity" :showValue="false" style="height: 6px"></ProgressBar>
                    </template>
                    <template #filter="{ filterModel }">
                        <Slider v-model="filterModel.value" range class="m-4"></Slider>
                        <div class="flex items-center justify-between px-2">
                            <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                            <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                        </div>
                    </template>
                </Column> -->

                <!-- 操作 -->
                <Column :rowEditor="true" style="width: 7rem; text-align: center;"></Column>
                
            </DataTable>

    </div>

 <!-- Add/Edit Task Dialog -->
        <Dialog v-model:visible="taskDialog" :style="{ width: '450px' }" header="新增待辦事項" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <!-- autofocus :invalid="submitted && !newTodo.toDoName" -->
                    <label for="title" class="block font-bold mb-3">事項名稱</label>
                    <InputText id="title" v-model.trim="newTodo.toDoName" required="true" fluid />
                    <!-- <small v-if="submitted && !newTodo.toDoName" class="text-red-500">請填寫事項名稱</small> -->
                </div>
                <div>
                    <label for="personInCharge" class="block font-bold mb-3">事項負責人</label>
                    <InputText id="personInCharge" v-model.trim="newTodo.personInCharge" required="true" fluid />
                    <!-- <small v-if="submitted && !newTodo.personInCharge" class="text-red-500">請填寫負責人</small> -->
                </div>
                <div>
                    <!-- plase holder -->
                    <label for="taskSort" class="block font-bold mb-3">事項分類</label>
                    <Select id="taskSort" v-model="newTodo.taskSort" :options="taskSortOptions" optionLabel="label" required="true" fluid />
                    <!-- <small v-if="submitted && !newTodo.taskSort" class="text-red-500">請選擇事項分類</small> -->
                </div>
                <div>
                    <label for="expiringDate" class="block font-bold mb-3">到期時間</label>
                    <DatePicker id="expiringDate" v-model="newTodo.expiringDate" showTime required="true" fluid class="my-datepicker" />
                    <!-- <small v-if="submitted && !newTodo.expiringDate" class="text-red-500">請選擇到期時間</small> -->
                </div>    
                        
            </div>  

            <template #footer>
                <Button label="取消" icon="pi pi-times" text @click="hideDialog" />
                <Button label="儲存" icon="pi pi-check" @click="saveTask" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteTasksDialog" :style="{ width: '450px' }" header="刪除確認" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span style="margin-left: 8px;">確定要刪除所選項目嗎?</span>
            </div>
            <template #footer>
                <Button label="取消" icon="pi pi-times" text @click="deleteTasksDialog = false" />
                <Button label="確認" icon="pi pi-check" text @click="deleteSelectedTasks" />
            </template>
        </Dialog>

        <Dialog v-model:visible="exportConfirmDialog" :style="{ width: '450px' }" header="匯出確認" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span style="margin-left: 8px;">您確定要匯出所有待辦事項嗎？</span>
            </div>
            <template #footer>
                <Button label="取消" icon="pi pi-times" text @click="exportConfirmDialog = false" />
                <Button label="確認" icon="pi pi-check" text @click="exportCSV" />
            </template>
        </Dialog>

        <Dialog v-model:visible="showAlertDialog" :style="{ width: '450px' }" header="提示" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-info-circle !text-3xl" />
                <span style="margin-left: 8px;">請先登入才能執行此操作</span>
            </div>
            <template #footer>
                <Button label="確定" icon="pi pi-check" text @click="hideAlertDialog" />
            </template>
        </Dialog>

</template>

<style lang="css" scoped>

.containerStyle {
    /* width: auto; */
    margin: 100px;
    border: 1px solid #ddd; /* 外框 */
    border-radius: 8px; /* 圓角 */
    padding: 1rem; /* 增加內距 */
    
}

:deep(.p-datatable-tbody td) {
    position: relative; /* 確保 .completed 的定位是相對於 td */
    text-align: center;
}

.completed {
    position: absolute; /* 定位於 td 內 */
    width: 100%; 
    left: 0;
    top: 50%; /* 確保置中 */
    transform: translateY(-50%);
    /* text-decoration: line-through; */
    color: gray;
    
}
.completed::after {
    content: ''; /* 需要的內容 */
    position: absolute; /* 絕對定位 */
    top: 50%; /* 垂直居中 */
    left: 0; /* 從左邊開始 */
    right: 0; /* 到達右邊 */
    height: 1px; /* 細線的高度 */
    background-color: #ccc; /* 細線的顏色 */
    transform: translateY(-50%); /* 垂直居中 */
    z-index: 1; /* 確保細線在其他內容上方 */
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem; /* 調整間距 */
}

.search-container {
    flex: 1; /* 搜尋框將佔據剩餘空間 */
    max-width: 20%; /* 控制搜尋框的最大寬度 */
}

.search-container .p-inputtext {
    width: 100%;
    height: 3rem; 
    border-radius: 8px; 
    /* padding: 0.25rem 0.5rem;  */
    /* font-size: 0.875rem;  */
}

.editInput-styles {
    border-radius: 8px; /* 設定圓角半徑 */
    padding: 0.7em;
}

.my-datepicker {
    border-radius: 8px !important;
    overflow: auto; 
}

.editInput-my-datepicker {
    height: 3.2rem;
}
/* .p-dark {
    background-color: #121212; 
    color: #ffffff; 
} */

</style>