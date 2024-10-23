<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-12 mb-3 mt-5">
        <h2>婚禮企劃書</h2>
      </div>
    </div>
    <div class="row">
    <div class="block" >
        <div id="quill-1">
        <button class="closeBtn mb-3">x</button>
        <div class="quill-editor pdf-content" id="edit1" ref="pdfContent">
            <h1 style="color: white; font-weight: bold;">xxx 與 xxx 的 婚禮主題</h1>
        </div>
            <button class="upBtn rounded">↑</button>
            <button class="downBtn rounded">↓</button>
            <div style="position: absolute;width: 1140px;height: 140px;bottom:0px;background: #001733;" class="pdf-content" ref="pdfContent"></div>
             <div class="quill-editor" style="position:absolute;width:500px;height: 140px;bottom:0px; left: 50%;">
                <h1 style="color: white; font-weight: bold;">愛的旅程，從此啟程。</h1>
                <h2 style="color: white; font-weight: bold;">&nbsp;2024.10.24(婚禮日期)</h2>
             </div>
            </div>
        </div>
    <div class="block">
        <button class="closeBtn">×</button>
        <div style="width: 1200px;height:800px;background-color: #001733;" class="pdf-content" ref="pdfContent">
             <div class="quill-editor" id="edit2">
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
             <div class="quill-editor" id="edit4">
                <h4 style="color: white;">婚禮雙方介紹：</h4>
                <h6 style="color: white;">&nbsp;尊敬的各位來賓，大家好！今天我們聚集在這裡，共同見證一對新人邁向人生新篇章的美好時刻。</h6>
                <h6 style="color: white;">今天的男主角——張偉。他是一位才華洋溢的工程師，擁有穩定的職業和無限的創意。在生活中，他熱愛戶外運動，喜歡旅行，經常與朋友們分享他的冒險故事。他的善良和幽默感總能帶給周圍的人無限的快樂。</h6>
                <h6 style="color: white;">今天的女主角——李娜。李娜是一位優雅的設計師，對藝術和時尚有著獨特的見解。她的工作總是充滿創意和熱情，無論是設計還是生活，她都能把每一個細節做到極致。她熱愛烹飪，常常為家人和朋友準備美味的佳餚，讓每一個聚會都充滿溫馨的氣氛。</h6>
             </div>
        </div>
        <button class="upBtn rounded">↑</button>
        <button class="downBtn rounded text-start">↓</button>
    </div>
    <div class="block">
        <button class="closeBtn">×</button>
        <div id="blackUp" class="pdf-content" ref="pdfContent">
            <div class="quill-editor" style="position:absolute; top: 100px;left: 700px;height: 80px;width: 300px;">
            <h2 style="color: white;font-weight: bold; position:absolute; top: 100px;left: 700px;">婚禮預算分配比例</h2>
        </div>
            <img src="@/assets/images/weddingPlanImg/Vector 1.png" alt="blackUp">
        <div class="quill-editor" id="edit5">
            <img src="@/assets/images/weddingPlanImg/PieChart.png" alt="pieChart">
            <br>
            <h4 style="color: grey; font-weight: bold;">婚禮預算分配比例</h4>
            <h5 style="color: grey; font-weight: bold;">預算分配備注</h5>
            <h5 style="color: grey; font-weight: bold;">1.場地花了...</h5>
            <h5 style="color: grey; font-weight: bold;">2.</h5>
            <h5 style="color: grey; font-weight: bold;">3.</h5>
            <h5 style="color: grey; font-weight: bold;">4.</h5>
        </div>
        <div class="quill-editor" id="edit6">
            <h5 style="color: grey; font-weight: bold;">自由貼入想要放的預算相關圖片，或加入一些文字説明。</h5>
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
            <h5 style="color: grey; font-weight: bold;">·</h5>
        </div>
    </div>
        <button class="upBtn rounded text-start">↑</button>
        <button class="downBtn rounded text-start">↓</button>
    </div>
    <div class="block" >
        <div id="quill-1">
        <button class="closeBtn mb-3">x</button>
            <button class="upBtn rounded">↑</button>
            <button class="downBtn rounded">↓</button>
            <div style="position: absolute;width: 1140px;height: 140px;bottom:0px;background: #001733;" class="pdf-content" ref="pdfContent"></div>
             <div class="quill-editor" style="position:absolute;width:500px;height: 140px;bottom:0px; left: 50%;">
                <h1 style="color: white; font-weight: bold;">愛的旅程，從此啟程。</h1>
                <h2 style="color: white; font-weight: bold;">&nbsp;2024.10.24(婚禮日期)</h2>
             </div>
            </div>
        </div>
    <!-- ↓row end -->
  </div>
  <!-- ↓container end -->
</div>
</template>
  <script setup>
  import { onMounted, ref } from 'vue';
  import Quill from 'quill'; 
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
                const block = this.closest('.block');
                block.remove(); // 移除 block
            });
        });
  })
  
  </script>
  
  <style scoped>
  @import 'quill/dist/quill.snow.css';

       #quill-1{
         background: url('@/assets/images/weddingPlanImg/wed1.jpg') no-repeat;
          background-size: contain;
          height:800px;
      }
      #edit1{
        position: absolute;
        width: 384px;
        height: 102px;
        left: 142px;
        top: 39px;
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
            height: 650px;
            top: 100px;
            left: 100px;
        }

        #edit6{
            position: absolute;
            width: 350px;
            height: 500px;
            top: 250px;
            left: 700px;
        }

       .block {
            position: relative;
            height:800px
        }

        .quill-editor {
            height: 100px;
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
            right: 10px;
            width: 4px;
            background-color: aquamarine;
            text-align:center;
        }
        .downBtn{
            position: absolute;
            top:80px;
            right:10px;
            width: 4px;
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
  </style>
  