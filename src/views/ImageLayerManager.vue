<template>
    <div>
        <div class="wrapper">
            <div class="menu">
                <div @click="changeContainerSize(600, 600)">1:1</div>
                <div @click="changeContainerSize(750, 600)">5:4</div>
                <div @click="changeContainerSize(900, 600)">3:2</div>
                <div @click="changeContainerSize(1010, 625.5)">16:9</div>
            </div>
            <div class="container" ref="container">
                <div class="size-info" v-if="selectedImage">{{ sizeInfo }}</div>
            </div>
            <div class="components-wrapper">
                <WImgMComponent @data-sent="handleDataSent" class="Mh3"/>
                <MImgMComponent @Memdata-sent="MemhandleDataSent" class="Mh5"/>
            </div>
        </div>
        <div class="controls">
            <button @click="moveLayer('down')" class="btn">上移</button>
            <button @click="moveLayer('up')" class="btn">下移</button>
            <button @click="undoLastAction(selectedImage)" class="btn" style="background-color: #6A6AFF;">回復</button>
            <button @click="deleteImage" style="background-color: red;" class="btn red">刪除</button>
            <button @click="captureScreenshot" style="background-color:yellowgreen;" class="btn">保存</button>
            <button class="btn">會員上傳圖片</button>
            <input type="text" v-model="memberID" style="width: 100px; border: 2px solid #4CAF50; padding: 8px;"/>
            <button @click="fetchEditingID" class="btn">搜尋圖層資訊</button>
            <button @click="putsql" class="btn">測試資訊</button>
        </div>
        <div class="wrapper">
            <p>說明之後放這</p>
        </div>
    </div>
</template>
    
<script>
import MImgMComponent from '@/components/MImgMComponent.vue';
import WImgMComponent from '@/components/WImgMComponent.vue';
import html2canvas from 'html2canvas';
import interact from 'interactjs';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
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
            containerSize: {
                width: 0,
                height: 0,
            },
            memberID: '',
            editingID: null,
            ImgUsings:'',
        };
    },
    mounted() {
        this.setupInteract();
        this.addContainerClickListener();
    },
    methods: {
        handleDataSent(imagePath,materialId,width,height,name) {
            this.addImage(imagePath, width, height,materialId,name,1);
        },
        MemhandleDataSent(imagePath,materialId,width,height,memberid,name) {//memberid 未用到
            this.addImage(imagePath, width, height,materialId,name,0);
        },
        // 用會員id查詢圖層id的 methods
        async fetchEditingID() {
            try {
                const FindID_URL = `${BASE_URL}/EditingImgFiles/FindID/${this.memberID}`
                const response = await fetch(FindID_URL);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const EditingID = await response.json();
                this.editingID = EditingID;  // 將ID存儲到 data 中
                this.fetchImgUsings();//呼叫圖層資訊
            } catch (error) {
                console.error('Fetch error:', error);
            }
        },
        // 用圖層id查詢圖層所用之圖的 methods
        async fetchImgUsings() {
            try {
                const FindID_URL = `${BASE_URL}/ImgUsings/${this.editingID}`
                const response = await fetch(FindID_URL);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const Img = await response.json();
                this.ImgUsings = Img;  // 將ID存儲到 data 中
                this.defaultImg();
            } catch (error) {
                console.error('Fetch error:', error);
            }
        },
        //更新舊素材回資料庫
        putsql(){
            const container = this.$refs.container;
            const elements = container.querySelectorAll('[default-material-id][websource][memsource]');
            
            elements.forEach(element => {
                console.log(element);
                const API_URL = `${BASE_URL}/ImgUsings/${element.getAttribute('default-material-id')}`
                const imgElement = element.querySelector('img');
                const width = imgElement.style.width;
                const widthWithoutPx = width.replace('px', '');
                const height = imgElement.style.height;
                const heightWithoutPx = height.replace('px', '');
                let terms = {
                    "imgUsingId": parseInt(element.getAttribute('default-material-id')),//parseInt是轉成整數
                    "imageName": element.getAttribute('imageName'),
                    "memSource": parseInt(element.getAttribute('websource')),
                    "webSource": parseInt(element.getAttribute('memsource')),
                    "imgHeight": heightWithoutPx,
                    "imgWidth": widthWithoutPx,
                    "imgX": parseFloat(parseFloat(imgElement.getAttribute('data-x')).toFixed(2)),
                    "imgY": parseFloat(parseFloat(imgElement.getAttribute('data-y')).toFixed(2))//toFixed(2)會將數字四捨五入到小數點後兩位，返回的是一個字串。如果你需要它是數字型態而不是字串，可以再使用 parseFloat()
                    
                }
                const put = async()=>{
                    const response = await fetch(API_URL,{
                        method:'PUT',
                        body:JSON.stringify(terms),
                        headers:{'Content-Type': 'application/json'}
                    }); 
                    // alert("Operation started");
                    // await this.sleep(3000);
                }
                put();
                // console.log("Operation resumed after 3 seconds");
            });
            
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        //加入新素材更新回資料庫
        postsql(){
            const container = this.$refs.container;
            const elements = container.querySelectorAll('[data-material-id][websource][memsource]');
            
            elements.forEach(element => {
                const imgElement = element.querySelector('img');
                const width = imgElement.style.width;
                const widthWithoutPx = width.replace('px', '');
                const height = imgElement.style.height;
                const heightWithoutPx = height.replace('px', '');
            });
            // const terms = ref({
            //     "imgUsingId": 0,
            //     "imageName": "string",
            //     "memSource": 0,
            //     "webSource": 0,
            //     "imgHeight": "string",
            //     "imgWidth": "string",
            //     "imgX": 0,
            //     "imgY": 0
            // })
        },
        //圖層所有元素順序添加進畫面
        defaultImg(){
            let i = 0;
            for(i = 0;i<this.ImgUsings.length;i++)
            {
                this.AddDefaultImage(this.ImgUsings[i].imgUsingId,this.ImgUsings[i].imageName,this.ImgUsings[i].webSource,this.ImgUsings[i].imgWidth,this.ImgUsings[i].imgHeight,this.ImgUsings[i].imgX,this.ImgUsings[i].imgY);
            }
        },
        //添加圖片的method(1)
        addImage(imagePath,width,height,materialId,name,source) {
            if (imagePath) {
            const newImageContainer = document.createElement('div');//創建一个容器来包裹图片和锁图标
            newImageContainer.style.position = 'absolute';
            newImageContainer.style.left = '0';
            newImageContainer.style.top = '0';
            newImageContainer.setAttribute('data-material-id', materialId); // 使用 materialId 標記容器
            newImageContainer.setAttribute('imageName',name);
            if(source==1){
                newImageContainer.setAttribute('websource',1);
                newImageContainer.setAttribute('memsource',0);
            }
            else{
                newImageContainer.setAttribute('memsource',1);
                newImageContainer.setAttribute('websource',0);
            }

            const newImage = document.createElement('img');
            newImage.src = imagePath;//圖片路徑
            newImage.classList.add('movable-image');
            newImage.style.transform = `translate(0px, 0px)`;
            newImage.style.width = `${width*1.5}px`;
            newImage.style.height = `${height*1.5}px`;
            newImage.setAttribute('data-x', 0);
            newImage.setAttribute('data-y', 0);

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
        //載入圖片的method(2)
        AddDefaultImage(imgUsingId,imageName,webSource,width,height,imgX,imgY) {
            const newImageContainer = document.createElement('div');//創建一个容器来包裹图片和锁图标
            newImageContainer.style.position = 'absolute';
            newImageContainer.style.left = `${imgX}px`;
            newImageContainer.style.top = `${imgY}px`;
            newImageContainer.setAttribute('default-material-id', imgUsingId);//添加素材屬性,方便之後做put跟post
            newImageContainer.setAttribute('imageName', imageName);

            const newImage = document.createElement('img');
            if(webSource){//判斷素材的出處是會員還是本網站提供
                newImage.src = `/src/assets/images/Layer_WebImg/${imageName}`;//圖片路徑
                newImageContainer.setAttribute('websource',1);
                newImageContainer.setAttribute('memsource',0);
            }else{
                newImage.src = `/src/assets/images/Layer_MemImg/${imageName}`;
                newImageContainer.setAttribute('websource',0);
                newImageContainer.setAttribute('memsource',1);
            }
            newImage.classList.add('movable-image');
            newImage.style.transform = `translate(0px, 0px)`;
            newImage.style.width = `${width}px`;
            newImage.style.height = `${height}px`;
            newImage.setAttribute('data-x',imgX);
            newImage.setAttribute('data-y',imgY);

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

                    // 取得容器位置
                    const containerOffsetX = parseFloat(target.parentNode.style.left) || 0; // 取得 newImageContainer 的 left
                    const containerOffsetY = parseFloat(target.parentNode.style.top) || 0; // 取得 newImageContainer 的 top
                    // 限制 x 和 y 在容器內
                    x = Math.max(0 - containerOffsetX, Math.min(x, containerRect.width - imgRect.width- containerOffsetX));
                    y = Math.max(0 - containerOffsetY, Math.min(y, containerRect.height - imgRect.height- containerOffsetY));

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
                    
                    // 取得容器位置
                    const containerOffsetX = parseFloat(target.parentNode.style.left) || 0;
                    const containerOffsetY = parseFloat(target.parentNode.style.top) || 0;
                    // 防止圖片左邊和上邊溢出
                    x = Math.max(0-containerOffsetX, Math.min(x, containerRect.width - newWidth- containerOffsetX));
                    y = Math.max(0-containerOffsetY, Math.min(y, containerRect.height - newHeight- containerOffsetY));

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
        props: {
            memberId: {
            type: Number,
            required: true
            }
        }
    },
};
</script>
    
<style scoped>
    WimgmenuComponent{
        position: relative;
        padding: 10px;
    }

    MimgmenuComponent{
        position: relative;
        padding: 10px;
    }
    .Mh3 {
        background-color: #F5F5DC;
        color: #6f8170;
        text-align: center;
        padding: 8px;
        position: sticky; /* 讓 h3 固定 */
    }
    .Mh5 {
        background-color: #F5F5DC;
        color: #6f8170;
        text-align: center;
        padding: 8px;
        position: sticky;
    }
    /* 使用 flexbox 讓 .container 和 .components-wrapper 橫向排列 */
    .wrapper {
        display: flex;
        justify-content: flex-start; /* 元素從左往右排列 */
        align-items: flex-start;
        padding-top: 50px;
    }

    /* .components-wrapper 緊跟在 .container 右邊 */
    .components-wrapper {
        height: 626px;
        margin-right: 50px;
        display: flex;
        gap: 1px; /* 兩個 component 之間設置 3px 的間距 */
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
        width: 1012px;
        height: 626px;
        background-color: #D8CAB8;
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
        gap: 10px;
    }
        
    .controls input {
        margin-right: 10px;
    }
        
    .btn,
    .btn:focus {
        position: relative;
        min-width: 100px;
        background-color: black;
        border-radius: 4em;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition-duration: 0.4s;
        padding: 10px 20px;
    }
    .btn:hover {
        background-color:#CCCCCC;
        color: #3A3A3A;
        transition-duration: 0.1s;
    }
    .btn:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: all 0.5s;
        box-shadow: 0 0 10px 40px rgb(0, 0, 0);
        border-radius: 4em;
    }
    .btn:active:after {
        opacity: 1;
        transition: 0s;
        box-shadow: 0 0 0 0 rgb(123, 123, 123);
    }
    .btn:active {
        top: 1px;
    }

    .btn.red:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: all 0.5s;
        box-shadow: 0 0 10px 40px rgb(253, 2, 2);
        border-radius: 4em;
    }
    .btn.red:active:after {
        opacity: 1;
        transition: 0s;
        box-shadow: 0 0 0 0 rgb(139, 65, 65);
    }
    .btn.red:active {
        top: 1px;
    }
        
    input[type="file"] {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    /* 調整尺寸的框 */
    .menu {
        gap: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        margin-left: 127px;
        padding-top: 10px;
        position: relative;
        width: 100px;
        height: 90vh;
        background-color: #F5F5DC;
        color: #6f8170;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .menu div {
        padding: 20px;
        cursor: pointer;
        text-align: center;
        background-color: #C3E0C5;
        margin-bottom: 10px;
    }
    
    .menu div:hover {
        background-color: rgb(203, 255, 213);
        color: black;
    }
</style>