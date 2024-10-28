<template>
    <SampleComponent><div class="slide" style="background: url(/src/assets/images/navImage.jpg) no-repeat;background-size: cover;"></div></SampleComponent>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-12 mb-3 mt-5">
        <h2>婚禮企劃書</h2>
        <!-- <button ref="generateButton">生成 PDF</button> -->
        <div id="makePDFButton" class="my-4">
        <ClickButtonAComponent @ButtonAClick="generatePDF"><h3>生成PDF</h3></ClickButtonAComponent>
    </div>
      </div>
    </div>
    <div class="row">
    <div class="block" >
        <div id="quill-1" class="pdfContent">
            <div id="edit1" class="quill-editor"> 
                <h2 style="color: white; font-weight: bold;">_______ 與_______的</h2>
            </div>
            <h2 class="whiteBoldFont" id="weddingName">{{weddingplanData.weddingName}}</h2>
        
            <div id="firstpageBackground"></div>
             <div class="quill-editor" id="firstPageHeader">
                <h1 style="color: white; font-weight: bold;">愛的旅程，從此啟程。</h1>
             </div>
                <h2 id="weddingDate" class="mb-0 whiteBoldFont"> {{weddingplanData.weddingLocation}} &nbsp;&nbsp;{{ formattedTime}}</h2>
            </div>
        </div>
      
    <div class="block">
        <button class="closeBtn">×</button>
        <div style="width: 1200px;height:800px;background-color: #001733;" class="pdfContent">
             <div class="quill-editor " id="edit2">
                <p>
                <img src="@/assets/images/weddingPlanImg/male.jpg" alt="男方" style="width:250px;">
                </p>
                <h4 style="color: white; font-weight: bold;">
                    男方：
                </h4>
             </div>
             <div class="quill-editor" id="edit3">
                <p>
                <img src="@/assets/images/weddingPlanImg/female.jpg" alt="男方" style="width:250px;">
                </p>
                <h4 id="introduction" style="color: white; font-weight: bold;">
                    女方：
                </h4>
             </div>
             <img src="@/assets/images/weddingPlanImg/ring.png" alt="ring" id="ringImg">
             <div id="edit4">
                <h4 style="color: white;">婚禮雙方介紹：</h4>
                <h6 style="color: white;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{weddingplanData.weddingIntroduction}}</h6>
             </div>
        </div>
        <button class="upBtn rounded button-55">▲</button>
        <button class="downBtn rounded button-55">▼</button>
    </div>
    <div class="block" >
        <button class="closeBtn mb-3">x</button>
        <button class="upBtn rounded button-55">▲</button>
        <button class="downBtn rounded button-55">▼</button>
        <div id="weddingPlace" class="pdfContent">
            <h3 id="weddingSpot">婚禮殿堂：{{weddingplanData.venueName
            }}</h3>
            <div class="quill-editor" id="weddingTime">
                <h4 style=" font-weight: bold;color:#353637;">桌數:&nbsp;</h4>
                <h4 style=" font-weight: bold;color:#353637;">賓客人數:&nbsp;</h4>
            </div>
            <img :src="venueImgPath1" alt="venue1" id="venue1Img">
            <img :src="venueImgPath2" alt="venue2" id="venue2Img">
             <div class="quill-editor" id="firstPageHeader">
                <h1 style="color: white; font-weight: bold;">Forever starts today.</h1>
             </div>
            </div>
     </div>  
     <div class="block" >
        <button class="closeBtn mb-3">x</button>
        <button class="upBtn rounded button-55">▲</button>
        <button class="downBtn rounded button-55">▼</button>
        <div id="handBackground" class="pdfContent">
            <div style="position:absolute;height: 550px;width: 1100px;background-color:#CECDCD; border-radius: 25px; left: 55px; z-index: 0;" ></div>
            <img :src="imageSrc" alt="simulate" id="simulateImg" >
            <!-- <img src="`@/assets/images/weddingPlanImg/Simulated.png`" alt="simulate" id="simulateImg" > -->
            <div class="quill-editor" id="simulateEdit">
                <h2 style="color: #AC929E; font-weight: bold;">場景模擬圖</h2>
             </div>
             <div class="quill-editor" id="simulateInfo">
                <h4 style="color: #FFFFFF; font-weight: bold;">來為場景模擬圖增添一點説明吧</h4>
                <h4 style="color: #FFFFFF;font-weight: bold;">~</h4>
             </div>
         </div>
        </div>
        <div class="block" >
        <button class="closeBtn mb-3">x</button>
        <button class="upBtn rounded button-55">▲</button>
        <button class="downBtn rounded button-55">▼</button>
        <div id="handBackground2" class="pdfContent">
            <div class="quill-editor" id="simulateEdit">
                <h2 style="color: #ffffff; font-weight: bold;">婚禮活動時程</h2>
             </div>
            <img :src="eventTimeLinePath" alt="events" id="eventImg">
             <div class="quill-editor" id="simulateSlogan">
                <h1 style="color: white; font-weight: bold;">Celebrating love in every corner!</h1>
             </div>
            </div>
        </div>
    <div class="block">
        <button class="closeBtn">×</button>
        <div id="blackUp" class="pdfContent">
            <div class="quill-editor" style="position:absolute; top: 100px;left: 700px;height: 80px;width: 300px;">
            <h2 style="color: white;font-weight: bold; position:absolute; top: 100px;left: 700px;">婚禮預算分配比例</h2>
        </div>
            <img src="@/assets/images/weddingPlanImg/Vector 1.png" alt="blackUp">
            <div class="quill-editor" id="edit5">
            <img src="@/assets/images/weddingPlanImg/PieChart.png" alt="pieChart" >
            <br>
            <h4 style="color: grey; font-weight: bold;">婚禮預算分配比例</h4>
            <h5 style="color: grey; font-weight: bold;">可以貼上預算規劃工具產生的圖片替換</h5>
            <h5 style="color: grey; font-weight: bold;">1.場地花了...</h5>
            <h5 style="color: grey; font-weight: bold;">2.</h5>
            <h5 style="color: grey; font-weight: bold;">3.</h5>
        </div>
        <div class="quill-editor" id="edit6">
            <h5 style="color: grey; font-weight: bold;">自由貼入想要放的預算相關圖片，或加入一些文字説明。</h5>
            <h5 style="color: grey; font-weight: bold;">如果不想放預算相關内容，也可以自由發揮，隨心所欲設計這一頁的内容~</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
            <h5 style="color: grey; font-weight: bold;">·</h5>
        </div>
    </div>
    <button class="upBtn rounded button-55">▲</button>
    <button class="downBtn rounded button-55">▼</button>
    </div>
    <div class="block" style="height: 0px;">
        <div class="pdfContent">.</div>
    </div>
    <!-- ↓row end -->
  </div>
  <div class="row">
    <div class="block" style="height: 1600px;">
        <button class="closeBtn mb-3">x</button>
        <div id="scheduleBackground" class="pdfContent">
            <h1 id="edit1" style="color:white">婚禮活動詳細排程</h1>
            <div style="position:absolute;height: 1400px;width: 1000px;margin: 100px;background-color:#F1F1F1; border-radius: 25px">
                <ul style="left: 30px; top:30px ;" class="budgetItemsList">
                    <li v-for="eventSchedule in eventScheduleData" :key="eventSchedule.scheduleId">{{formatScheduleTime(eventSchedule.scheduleTime)}}&nbsp;&nbsp;&nbsp;&nbsp;{{eventSchedule.eventName}}-{{eventSchedule.scheduleName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;備注：{{ eventSchedule.scheduleNote }}</li>
                </ul>
                </div>
            </div>
        </div>
        <div class="block" style="height: 0px;">
        <div class="pdfContent">.</div>
    </div>
    <div class="block" style="height: 1600px;">
        <button class="closeBtn mb-3">x</button>
        <div id="staffBackground" class="pdfContent">
            <h1 id="edit1" style="color:white">婚禮排程工作人員</h1>
            <div style="position:absolute;height: 1400px;width: 1000px;margin: 100px;background-color:#F1F1F1; border-radius: 25px">
                <ul style="left: 30px; top:30px ;" class="budgetItemsList">
                    <li v-for="staff in ScheduleStaffData" :key="ScheduleStaffData.staffID" style="font-size: 20px;" class="lh-lg">{{formatScheduleTime(staff.staffScheduleTime)}}&nbsp;&nbsp;&nbsp;{{staff.staffScheduleName}}-人員: {{staff.staffName
                    }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;協助内容：{{ staff.assistanceContent }}</li>
                </ul>
                </div>
            </div>
        </div>
        <div class="block" style="height: 0px;">
        <div class="pdfContent">.</div>
    </div>
    <div class="block" style="height: 1600px;">
        <button class="closeBtn mb-3">x</button>
        <div id="budgetBackground" class="pdfContent">
            <h1 id="edit1" style="color:white">婚禮預算項目</h1>
            <div style="position:absolute;height: 1400px;width: 1000px;margin: 100px;background-color:#F1F1F1; border-radius: 25px">
                <ul style="left: 30px; top:30px ;" class="budgetItemsList">
                    <li v-for="BudgetItem1 in budgetItems1" :key="BudgetItem1.budgetItemName">
                        {{ BudgetItem1.budgetItemName }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{BudgetItem1.budgetItemSubtotal
                        }}&nbsp;&nbsp;&nbsp;NT$
                    </li>
                </ul>
                <ul style="left: 50%; top:30px;" class="budgetItemsList">
                    <li v-for="BudgetItem2 in budgetItems2" :key="BudgetItem2.budgetItemName">
                        {{ BudgetItem2.budgetItemName }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{BudgetItem2.budgetItemSubtotal
                        }}&nbsp;&nbsp;&nbsp;NT$</li>
                </ul>
            </div>
                <h2 id="budgetTotal" class="whiteBoldFont">&nbsp;婚禮總預算支出:&nbsp;&nbsp; {{ BudgetTotal.budgetNowTotal}}&nbsp;&nbsp;NT$</h2>
            </div>
        </div>
        <div class="block" style="height: 0px;">
        <div class="pdfContent">.</div>
    </div>
  </div>
  <!-- ↓container end -->
</div>
</template>
  <script setup>
    import { onMounted, ref } from 'vue';
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
    import Quill from 'quill'; 
    import ClickButtonAComponent from '@/share_components/ClickButtonAComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
const BaseUrl = import.meta.env.VITE_API_BASEURL;
const API_URL=`${BaseUrl}/WeddingPlans`;
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
const memberID = getMemberID();

    //載入企劃書數據
    const weddingplanData=ref([]);
    const eventScheduleData=ref([]);
    const ScheduleStaffData=ref([]);
    const BudgetData=ref([]);
    const BudgetTotal=ref(0);
    const formattedTime=ref('');
    const budgetItems1=ref([]);
    const budgetItems2=ref([]);
    let imageSrc =''; 
    let venueImgPath1='';
    let venueImgPath2='';
    let eventTimeLinePath='';
    //加載數據start
    const loadWeddingplanData=async()=>{
        const responseData=await fetch(`${API_URL}/planData/${memberID}`);
        weddingplanData.value=await responseData.json();
        formattedTime.value = weddingplanData.value.weddingTime.replace('T', ' ');
            imageSrc = `http://localhost:5173/src/assets/images/weddingPlanImg/${weddingplanData.value.editingImgName}`;
            venueImgPath1= `https://localhost:7162/Ven1/${weddingplanData.value.venueImgName1}`;
            venueImgPath2=`https://localhost:7162/Ven1/${weddingplanData.value.venueImgName2}`;
            eventTimeLinePath=`https://localhost:7162/eventImg/${weddingplanData.value.eventImgName}`;

    }
    loadWeddingplanData();
    
    const loadEventScheduleData=async()=>{
        const responseEventSchedule=await fetch(`${API_URL}/EventSchedules/${memberID}`)
        eventScheduleData.value=await responseEventSchedule.json();
    }
    loadEventScheduleData();

    const loadScheduleStaff=async()=>{
        const responseEventSchedule=await fetch(`${API_URL}/ScheduleStaff/${memberID}`)
        ScheduleStaffData.value=await responseEventSchedule.json();
    }
    loadScheduleStaff();

    const loadBudgetItemsData=async()=>{
        const responseItems=await fetch(`${API_URL}/MemberbudgetList/${memberID}`)
        BudgetData.value=await responseItems.json();
        budgetItems1.value =BudgetData.value.slice(0, 47);
        budgetItems2.value = BudgetData.value.slice(47, 93);
    }
    loadBudgetItemsData();

    const loadBudgetTotal=async()=>{
        const responseBudgetTotal=await fetch(`${BaseUrl}/MemberBudgetItems/BudgetNowTotal/${memberID}`);
        BudgetTotal.value=await responseBudgetTotal.json();
    }
    loadBudgetTotal();


    //調整時間顯示格式的方法
    const formatScheduleTime = (scheduleTime) => {
        return scheduleTime.replace('T', ' ');
    };
    //加載數據end

    //總預算
    const budgetTotal=ref(0);

    //pdf
    const generatePDF = () => {
    const elements = Array.from(document.querySelectorAll('.block')).map(block => block.querySelector('.pdfContent')).filter(el => el !== null);

if (elements.length === 0) {
    alert('沒有可生成的內容！');
    return;
}
  const promises = elements.map(element => html2canvas(element));

  Promise.all(promises).then(canvases => {
    const pdf = new jsPDF();
    const imgWidth = 190; // PDF 宽度
    const pageHeight = pdf.internal.pageSize.height;

    let position = 0; // 初始化位置
    let count = 0; // 计数器

    canvases.forEach(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 添加图片到 PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      position += imgHeight; // 更新位置
      count++; // 增加计数

      // 每添加两个内容，就换一页
      if (count % 2 === 0) {
        pdf.addPage(); // 添加新页面
        position = 0; // 重置位置
      }
    });

    pdf.save('download.pdf');
  });
};

const generateButton = ref(null);
  onMounted(()=>{
    
    const editors = document.querySelectorAll('.quill-editor');
        editors.forEach(editor => {
            const quill = new Quill(editor, {
                modules: {
                    toolbar: false
                },
                theme: 'snow'
            });
            // 添加焦點事件
            editor.addEventListener('focus', () => {
                editor.previousElementSibling.style.display = 'block'; // 顯示工具欄
            });
            editor.addEventListener('blur', () => {
                editor.previousElementSibling.style.display = 'none'; // 隱藏工具欄
            });
        });

        // 上移按鈕事件
        document.querySelectorAll('.upBtn').forEach(button => {
            button.addEventListener('click', function () {
                const block = this.closest('.block');
                const previous = block.previousElementSibling;
                if (previous) {
                    block.parentNode.insertBefore(block, previous);
                }
            });
        });

        // 下移按鈕事件
        document.querySelectorAll('.downBtn').forEach(button => {
            button.addEventListener('click', function () {
                const block = this.closest('.block');
                const next = block.nextElementSibling;
                if (next) {
                    block.parentNode.insertBefore(next, block);
                }
            });
        });

        // 關閉按鈕事件
        document.querySelectorAll('.closeBtn').forEach(button => {
            button.addEventListener('click', function () {
         if (confirm('確定要移除這個區塊嗎？')) {
              const block = this.closest('.block');
        block.remove(); // 移除區塊
                }
              });
             });
            })
            
  </script>
  
  <style scoped>
  @import 'quill/dist/quill.snow.css';

        #makePDFButton{
            height: 50px;
            width: 100px;
        }

        #firstpageBackground{
            position: absolute;
            width: 1140px;
            height: 140px;
            bottom:0px;
            background: #001733;
        }

        #firstPageHeader{
            position:absolute;
            width:500px;
            height: 70px;
            bottom:50px; 
            left: 50%;
        }

        .whiteBoldFont{
            color: white; 
            font-weight: bold;
        }

        #weddingDate{
            position:absolute;
            height:70px;
            bottom:0px; 
            right: 10%;
        }

        #weddingPlace{
            position:absolute;
            top: 50px;
        }

       #quill-1{
         background: url('@/assets/images/weddingPlanImg/wed1.jpg') no-repeat;
          background-size: contain;
          height:800px;
          width: 1200px;
      }
      #weddingPlace{
         background: url('@/assets/images/weddingPlanImg/wed5.jpg') no-repeat;
          background-size: contain;
          height:800px;
          width: 1200px;
          top:0px;
      }

      #venue1Img{
        position:absolute;
        width: 450px;
        left: 100px;
        bottom: 100px;
        border-radius: 133px 0px 90px 49px;
      }

      #venue2Img{
        position:absolute;
        width: 450px;
        left: 650px;
        top: 100px;
        border-radius: 133px 46px 90px 0px;
      }

      #weddingSpot{
        position: absolute;
        top: 50px;
        left:50px;
        font-weight: bold;
        color:#353637;
      }

      #weddingTime{
        position: absolute;
        height: 130px;
        width: 500px;
        top: 100px;
        left:80px;
       
      }

      #simulateImg{
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 2;
        border-radius: 15px;
      }

      #simulateEdit{
        position: absolute;
        width: 500px;
        height: 50px;
        left: 100px;
        top: 20px;
      }

    #simulateInfo{
        position: absolute;
        width: 350px;
        height: 450px;
        left: 750px;
        top: 50px;
      }
    
      #simulateSlogan{
            position:absolute;
            width:500px;
            height: 120px;
            bottom:20px; 
            left: 650px;
      }

      #eventImg{
        position:absolute;
        left: 205px;
        top: 120px;
        height: 500px;
        width: 700px;
      }

      #edit1{
        position: absolute;
        width: 384px;
        height:50px;
        left: 142px;
        top: 40px;
        }

        #weddingName{
            position: absolute;
            left: 250px;
            top:90px;
        }

        #edit2{
            position: absolute;
            height:450px;
            width: 300px;
            top: 50px;
            left: 200px;
        }

        #edit3{
            position: absolute;
            height:450px;
            width: 300px;
            top: 50px;
            left: 700px;
        }

        #edit4{
            position: absolute;
            width: 840px;
            height: 180px;
            top: 600px;
            left: 180px;
        }

        #ringImg{
            position: absolute;
            top: 500px;
            left: 550px;
            
        }

        #blackUp{
        position: absolute;
        width: 1200px;
        height: 800px;
        background: #CECDCD;
        }
        
        #edit5{
            position: absolute;
            width: 500px;
            height: 600px;
            top:100px;
            left: 100px;
        }

        #PieChart{
            position: absolute;
            top: 100px;
            left: 100px;
            height: 438px;
            border-radius: 25px;
        }

        #edit6{
            position: absolute;
            width: 450px;
            height: 500px;
            top: 250px;
            left: 650px;
        }

        #handBackground{
         background: url('@/assets/images/weddingPlanImg/wed3.jpg') no-repeat;
          height:800px;
          width: 1200px;
      }

      #handBackground2{
         background: url('@/assets/images/weddingPlanImg/wed4.jpg') no-repeat;
          height:800px;
          width: 1200px;
      }

      #scheduleBackground{
        background: url('@/assets/images/weddingPlanImg/background2.jpg') no-repeat;
          height:1600px;
          width: 1200px;
      }

      #staffBackground{
        background: url('@/assets/images/weddingPlanImg/background3.jpg') no-repeat;
          height:1600px;
          width: 1200px;
      }

      #budgetBackground{
        /* background: url('@/assets/images/weddingPlanImg/budgetBackground.jpg') no-repeat;
         */
         background-color: #B7B0AA;
          height:1600px;
          width: 1200px;
      }


       .block {
            position: relative;
            height:800px
        }

        .quill-editor {
            height: 100px;
            border: none !important; 
            /* border: none !important;  最後再調*/
        }
        .quill-editor:hover{
          border:2px solid greenyellow !important;
        }

        .ql-container {
            /* border: none; */
        }

        .button-container {
            position: absolute;
            top:30px;
            right: 10px;
            display: none;
        }
        .upBtn{
            position: absolute;
            top:50px;
            right: 40px;
            width: 10px;
            background-color: aquamarine;
            text-align:center;
        }
        .downBtn{
            position: absolute;
            top:90px;
            right:40px;
            width: 10px;
            background-color: aquamarine
        }
        
        .block:hover .button-container {
            display: block;
        }


        .quill-editor:focus+.ql-toolbar {
            display: block;
            /* 編輯時顯示工具欄 */
        }

        .closeBtn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: red;
            cursor: pointer;
            font-size: 16px;
            z-index: 9999;
        }

        #budgetTotal{
            position:absolute;
            height:70px;
            bottom:0px; 
            right: 15%;
        }

        .budgetItemsList{
            list-style-type: none;
             color: gray; 
             font-weight: bold;
             position: absolute;
        }

        /* button */

/* CSS */
.button-55 {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-55:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-55:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
  </style>
  