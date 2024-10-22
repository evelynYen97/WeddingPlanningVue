<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-12 mb-3 mt-5">
        <h2>婚禮企劃書</h2>
      </div>
    </div>
    <div class="row">
    <div class="block" id="quill-1">
        <button class="closeBtn mb-3">x</button>
        <div class="quill-editor" id="edit1">
        </div>
        <div class="button-container">
            <button class="upBtn">上移</button>
            <button class="downBtn">下移</button>
        </div>
    </div>
    <div class="block">
        <button class="closeBtn">×</button>
        <div class="quill-editor"></div>
            <button class="upBtn">上移</button>
            <button class="downBtn">下移</button>
    </div>
    <div class="block">
        <button class="closeBtn">×</button>
        <div class="quill-editor"></div>
        <div class="button-container">
            <button class="upBtn">上移</button>
            <button class="downBtn">下移</button>
        </div>
    </div>
  </div>
  </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import Quill from 'quill'; // 引入 Quill 样式
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
  
  <style>
  @import 'quill/dist/quill.snow.css';

       #quill-1{
         background: url('@/assets/images/weddingPlanImg/wed1.jpg') no-repeat;
          background-size: contain;
          height:800px;
      }
      #edit1{
         width: 50px;
        }

       .block {
            padding: 10px;
            position: relative;
            margin-bottom: 10px;
            /* 增加底部邊距以分隔 */
            
            height:200px
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
  