<template>
    <div>
        <div>
            <div class="components-wrapper">
                <WImgMComponent @data-sent="handleDataSent"/>
                <MImgMComponent @Memdata-sent="MemhandleDataSent"/>
            </div>
            <div class="container" ref="container">
                <div class="size-info" v-if="selectedImage">{{ sizeInfo }}</div>
            </div>
            <div class="menu">
                <div @click="changeContainerSize(600, 600)">1:1</div>
                <div @click="changeContainerSize(750, 600)">5:4</div>
                <div @click="changeContainerSize(900, 600)">3:2</div>
                <div @click="changeContainerSize(1008, 627)">16:9</div>
            </div>
        </div>
        
        <div class="controls">
            <button @click="moveLayer('down')">上移</button>
            <button @click="moveLayer('up')">下移</button>
            <button @click="undoLastAction(selectedImage)">回復</button>
            <button @click="deleteImage" style="background-color: red;">刪除</button>
            <button @click="captureScreenshot" style="background-color:yellowgreen;">截取截图</button>
        </div>
    </div>
</template>
    
<script>
import MImgMComponent from '@/components/MImgMComponent.vue';
import WImgMComponent from '@/components/WImgMComponent.vue';
import html2canvas from 'html2canvas';
import interact from 'interactjs';
    
//const materialId = newImageContainer.getAttribute('data-material-id'); 素材的專屬id
    
export default {
    components: {// 在這裡註冊子組件
        WImgMComponent,
        MImgMComponent,
    },
    data() {
        return {
            selectedImage: null,
            sizeInfo: '',
            stateHistory: [],// 用於保存每次的狀態
            maxHistory: 80,//位置狀態陣列的最大儲存量
            containerSize: {//初始container大小
            width: 600,
            height: 600,
            },
        };
    },
    mounted() {
        this.setupInteract();
        this.addContainerClickListener();
    },
    methods: {
    handleDataSent(imagePath,materialId,width,height) {
        this.addImage(imagePath, width, height,materialId);
    },
    MemhandleDataSent(imagePath,materialId,width,height,memberid) {
        console.log(imagePath, materialId, width, height,memberid);
        this.addImage(imagePath, width, height,materialId);
    },
    //添加圖片的method
    addImage(imagePath,width,height,materialId) {
        if (imagePath) {
        const newImageContainer = document.createElement('div');//創建一个容器来包裹图片和锁图标
        newImageContainer.style.position = 'absolute';
        newImageContainer.style.left = '0';
        newImageContainer.style.top = '0';
        newImageContainer.setAttribute('data-material-id', materialId); // 使用 materialId 標記容器

        const newImage = document.createElement('img');
        newImage.src = imagePath;//圖片路徑
        newImage.classList.add('movable-image');
        newImage.style.transform = `translate(0px, 0px)`;
        newImage.style.width = `${width*1.5}px`;
        newImage.style.height = `${height*1.5}px`;
        newImage.setAttribute('data-x', 0);
        newImage.setAttribute('data-y', 0);

        // 添加其餘方向的縮放句柄
        const leftHandle = document.createElement('div');
        leftHandle.className = 'resize-handle left';
        newImageContainer.appendChild(leftHandle);

        const rightHandle = document.createElement('div');
        rightHandle.className = 'resize-handle right';
        newImageContainer.appendChild(rightHandle);

        const topHandle = document.createElement('div');
        topHandle.className = 'resize-handle top';
        newImageContainer.appendChild(topHandle);

        const bottomHandle = document.createElement('div');
        bottomHandle.className = 'resize-handle bottom';
        newImageContainer.appendChild(bottomHandle);

        const lockIcon = document.createElement('div');
        lockIcon.className = 'lock-icon';
        lockIcon.innerText = '🔓';
        lockIcon.style.position = 'absolute';
        lockIcon.style.top = '5px';
        lockIcon.style.left = '5px';
        lockIcon.style.cursor = 'pointer';
        lockIcon.style.display = 'none';

        newImageContainer.appendChild(newImage);
        newImageContainer.appendChild(lockIcon);
        this.$refs.container.appendChild(newImageContainer);

        newImage.addEventListener('click', (event) => {
            this.selectedImage = newImage;
            this.sizeInfo = `Width: ${newImage.clientWidth}px, Height: ${newImage.clientHeight}px`;
            this.hideAllLockIcons();
            lockIcon.style.display = 'block';
            this.highlightSelectedImage(newImage);
            event.stopPropagation();
        });
        //鎖圖標點的點擊事件
        lockIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            const isLocked = lockIcon.innerText === '🔒';
            lockIcon.innerText = isLocked ? '🔓' : '🔒';
            interact(newImage).draggable(isLocked).resizable(isLocked);
        });

        this.setupInteract([newImage]);
        } else {
        alert('請先選擇一張圖片！');
        }
    },
    // 更改 container 的寬度和高度
    changeContainerSize(newWidth, newHeight) {
        this.containerSize.width = newWidth;
        this.containerSize.height = newHeight;
        this.$refs.container.style.width = `${newWidth}px`;
        this.$refs.container.style.height = `${newHeight}px`;
        this.adjustImagesToNewContainer();
    },
    // 调用 html2canvas 来截取 container 的截图
    captureScreenshot() {
        const container = this.$refs.container;
        html2canvas(container).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'screenshot.png';
        link.click();
        });
    },
    // 重新調整所有圖片的位置，防止超出新的容器範圍
    adjustImagesToNewContainer() {
        const container = this.$refs.container;
        const containerRect = container.getBoundingClientRect();
        const images = container.querySelectorAll('.movable-image');

        images.forEach((image) => {
        const imgRect = image.getBoundingClientRect();

        // 取得當前圖片的 x 和 y 座標
        let x = parseFloat(image.getAttribute('data-x')) || 0;
        let y = parseFloat(image.getAttribute('data-y')) || 0;

        // 限制 x 和 y 在新的容器範圍內
        x = Math.max(0, Math.min(x, containerRect.width - imgRect.width));
        y = Math.max(0, Math.min(y, containerRect.height - imgRect.height));

        // 更新圖片位置
        image.style.transform = `translate(${x}px, ${y}px)`;
        image.setAttribute('data-x', x);
        image.setAttribute('data-y', y);

        // 更新锁图标的位置
        const lockIcon = image.parentNode.querySelector('.lock-icon');
        if (lockIcon) {
            lockIcon.style.transform = `translate(${x}px, ${y}px)`;
        }
        });
    },
    // 上下移動功能
    moveLayer(direction) {
        if (this.selectedImage) {
        const container = this.$refs.container;
        const imageContainer = this.selectedImage.parentNode;
        const containers = Array.from(container.children);
        const index = containers.indexOf(imageContainer);

        if (direction === 'up' && index > 0) {// 在DOM樹中把當前容器插入到前一個容器之前
            container.insertBefore(imageContainer, containers[index - 1]);
        } else if (direction === 'down' && index < containers.length - 1) {// 在DOM樹中把當前容器插入到下一個容器之後
            container.insertBefore(containers[index + 1], imageContainer);
        }
        } else {
        alert('請先選擇一個圖片！');
        }
    },
    // 點擊刪除按鈕時的處理邏輯
    deleteImage() {
        if (this.selectedImage) {
        const imageContainer = this.selectedImage.parentNode;
        imageContainer.remove();
        this.selectedImage = null;
        this.sizeInfo = '';
        } else {
        alert('請先選擇一個圖片！');
        }
    },
    //回復功能
    undoLastAction(target) {
        if (this.stateHistory.length > 1) {
        this.stateHistory.pop(); // 移除當前狀態
        this.stateHistory.pop(); 
        this.stateHistory.pop();
        this.stateHistory.pop();
        this.stateHistory.pop();

        const lastState = this.stateHistory[this.stateHistory.length - 1]; // 取得最後一個狀態

        // 應用到圖片上
        target.style.transform = `translate(${lastState.x}px, ${lastState.y}px)`;
        // 更新圖片的座標數據
        target.dataset.x = lastState.x;
        target.dataset.y = lastState.y;
        // 還原鎖頭圖示的位置
        const lockIcon = target.parentNode.querySelector('.lock-icon');
        if (lockIcon) {
            lockIcon.style.left = `${lastState.lockX}px`;
            lockIcon.style.top = `${lastState.lockY}px`;
            lockIcon.style.transform = `translate(${lastState.x}px, ${lastState.y}px)`; // 跟隨圖片的位移
        }
        } else {
        alert('無法再進行撤銷操作');
        }
    },
    // 設置拖動和縮放功能
    setupInteract(elements = document.querySelectorAll('.movable-image')) {
        const container = this.$refs.container; // 確保 container 正確指向
        elements.forEach(element => {
        interact(element)
            .draggable({
            listeners: {
                move: (event) => { 
                const containerRect = container.getBoundingClientRect(); // 在這裡計算 containerRect
                const target = event.target;
                const imgRect = target.getBoundingClientRect(); // 取得圖片的邊界
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // 限制 x 和 y 在容器內
                x = Math.max(0, Math.min(x, containerRect.width - imgRect.width));
                y = Math.max(0, Math.min(y, containerRect.height - imgRect.height));

                // 更新圖片的位置
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                this.saveDragState(target, x, y); // 儲存縮放後的狀態

                // 更新锁图标的位置
                const lockIcon = target.parentNode.querySelector('.lock-icon');
                if (lockIcon) {
                    lockIcon.style.transform = `translate(${x}px, ${y}px)`; // 锁图标跟随图片移动
                }
                },
            },
            })
            .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move: (event) => {
                const target = event.target;
                const containerRect = this.$refs.container.getBoundingClientRect();

                // 取得圖片縮放前的數據
                const prevWidth = parseFloat(target.style.width) || target.offsetWidth;
                const prevHeight = parseFloat(target.style.height) || target.offsetHeight;

                // 新的寬度和高度
                const newWidth = event.rect.width;
                const newHeight = event.rect.height;

                // 計算寬高的變化
                const deltaX = (newWidth - prevWidth) / 2;
                const deltaY = (newHeight - prevHeight) / 2;

                // 更新圖片的大小
                target.style.width = `${newWidth}px`;
                target.style.height = `${newHeight}px`;

                // 更新位置，確保縮放後圖片不溢出容器
                let x = (parseFloat(target.getAttribute('data-x')) || 0) - deltaX;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) - deltaY;

                // 防止圖片左邊和上邊溢出
                x = Math.max(0, Math.min(x, containerRect.width - newWidth));
                y = Math.max(0, Math.min(y, containerRect.height - newHeight));

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

                // 儲存狀態
                this.saveDragState(target, x, y);

                // 更新锁图标的位置
                const lockIcon = target.parentNode.querySelector('.lock-icon');
                if (lockIcon) {
                    lockIcon.style.transform = `translate(${x}px, ${y}px)`; // 锁图标跟随图片移动
                }
                }
            }
            });
        });
    },
    //點擊空白處,取消其他鎖頭
    addContainerClickListener() {
        const container = this.$refs.container;
        container.addEventListener('click', (event) => {
        if (event.target === container) {
            this.selectedImage = null;
            this.hideAllLockIcons(); // 隐藏所有锁图标
            this.removeHighlightFromImages(); // 取消所有圖片的高光
        }
        });
    },
    // 隐藏所有锁图标的函数
    hideAllLockIcons() {
        const lockIcons = document.querySelectorAll('.lock-icon');
        lockIcons.forEach(icon => {
        icon.style.display = 'none';
        });
    },
    //將所有圖片的邊框樣式重置
    removeHighlightFromImages() {
        const images = document.querySelectorAll('.movable-image');
        images.forEach(img => {
        img.style.border = ''; // 清除所有圖片的邊框
        });
    },
    // 當前選中圖片高亮
    highlightSelectedImage(image) {
        const images = document.querySelectorAll('.movable-image');
        images.forEach(img => {
        img.style.border = '';
        });
        image.style.border = '2px solid red';
    },
    // 儲存每次拖動後的狀態
    saveDragState(target, x, y) {
        const lockIcon = target.parentNode.querySelector('.lock-icon');
        const lockX = lockIcon ? parseFloat(lockIcon.style.left) || 0 : 0;
        const lockY = lockIcon ? parseFloat(lockIcon.style.top) || 0 : 0;
        const state = { x, y };
        this.stateHistory.push(state);

        // 限制儲存的歷史狀態數量
        if (this.stateHistory.length > this.maxHistory) {
        this.stateHistory.shift();
        }
    },
    },
};
</script>
    
<style scoped>
    WimgmenuComponent,MimgmenuComponent {
        position: relative;
        margin-right: 10px;
    }
    .components-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0;
    }
        
    .container {
        position: relative;
        width: 750px;
        height: 600px;
        background-color: lightgray;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }
        
    .size-info {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
        color: black;
        display: none;
    }
        
    img {
        position: absolute;
        cursor: move;
    }
        
    .lock-icon {
        position: absolute;
        bottom: 5px;
        right: 5px;
        cursor: pointer;
        font-size: 20px;
        display: none;
    }
        
    .controls {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
        
    .controls input {
        margin-right: 10px;
    }
        
    button {
        padding: 10px 15px;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-right: 10px;
    }
        
    button:hover {
        background-color: #0056b3;
    }
        
    input[type="file"] {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    .menu {
        position: fixed;
        top: 0;
        right: 0;
        width: 100px;
        height: 100vh;
        background-color: #333;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .menu div {
        padding: 20px;
        cursor: pointer;
        text-align: center;
        background-color: #444;
        margin-bottom: 10px;
    }
    
    .menu div:hover {
        background-color: yellow;
        color: black;
    }
    
    h3 {
        color: yellow;
        width: 100%; /* 確保 h2 佔滿父元素的寬度 */
        text-align: center;
        padding-bottom: 10px;
    }
    .img-menu {
        width: 130px; /* 根據需求調整 */
        height: 500px; /* 根據需求調整 */
        overflow-y: scroll; /* 垂直方向顯示滾動條 */
        padding: 10px;
    }
    
    .card-img-top {
        width: 50px;
        height: 50px;
        object-fit: cover; /* 保持圖片比例裁切 */
        position: relative; /* 圖片相對於卡片容器進行定位 */
    }
    
    .card {
        display: flex;
        flex-direction: column;
        align-items: center; /* 垂直方向居中對齊 */
        position: relative; /* 保證卡片內元素相對定位 */
        margin-bottom: 20px; /* 卡片之間的距離 */
    }
    
    .col {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .resize-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: transparent;
        z-index: 10;
    }
    .left {
        top: 50%;
        left: 0;
        cursor: ew-resize;
    }
    
    .right {
        top: 50%;
        right: 0;
        cursor: ew-resize;
    }
    
    .top {
        top: 0;
        left: 50%;
        cursor: ns-resize;
    }
    
    .bottom {
        bottom: 0;
        left: 50%;
        cursor: ns-resize;
    }
        /* 自定義滾動條的樣式 */
    .img-menu::-webkit-scrollbar {
        width: 8px; /* 滾動條寬度 */
    }
    
    .img-menu::-webkit-scrollbar-thumb {
        background-color: #888; /* 滾動條顏色 */
        border-radius: 5px; /* 滾動條圓角 */
    }
    
    .img-menu::-webkit-scrollbar-thumb:hover {
        background-color: #555; /* 滾動條滑過時的顏色 */
    }
</style>