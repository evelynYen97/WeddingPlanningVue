<template>
    <SampleComponent>
        <div class="slide" style="background: url(/src/assets/images/navImage3.jpg) no-repeat;background-size: cover;">
        </div>
    </SampleComponent>
    <div class="center-wrapper">
        <div class="wrapper">
            <div class="menu">
                <div @click="changeContainerSize(600, 600)">1:1</div>
                <div @click="changeContainerSize(750, 600)">5:4</div>
                <div @click="changeContainerSize(900, 600)">3:2</div>
                <div @click="changeContainerSize(1010, 625.5)">16:9</div>
                <div @click="fillup">填滿</div>
            </div>
            <div style="width: 1012px; height: 626px; background-color:#F5F5DC ;" >
                <div class="container" ref="container">
                    <div class="size-info" v-if="selectedImage">{{ sizeInfo }}</div>
                </div>
            </div>
            
            <div class="components-wrapper">
                <WImgMComponent @data-sent="handleDataSent" class="Mh3" />
                <MImgMComponent @Memdata-sent="MemhandleDataSent" class="Mh5" v-if="isComponentRestart" :key="componentKey"/>
            </div>
        </div>

        <div class="controls">
            <button @click="moveLayer('down')" class="btn" data-hover="CLICK!">
                <div>上移</div>
            </button>
            <button @click="moveLayer('up')" class="btn" data-hover="CLICK!">
                <div>下移</div>
            </button>
            <button @click="undoLastAction(selectedImage)" class="btn" data-hover="BACK!">
                <div>回復</div>
            </button>
            <button @click="deleteImage" class="btn btn-red" data-hover="DELETE!">
                <div>刪除</div>
            </button>
            <button v-show="memberID?.length > 0" @click="handleSave" class="btn btn-green" data-hover="SAVE!">
                <div>保存</div>
            </button>
        </div>
        <div class="controls">
            <input type="file" @change="onFileChange" accept="image/*" />
            <img v-if="imageUrl" :src="imageUrl" alt="Selected Image" width="50px" height="50px"/>
            <button @click="UpLoadImage" class="btn-up" data-hover="CLICK!" >
                <div>會員上傳圖片</div>
            </button>
        </div>
        <div class="wrapper">
            <p>說明之後放這</p>
        </div>
    </div>
</template>

<script>
import MImgMComponent from '@/components/MImgMComponent.vue';
import SampleComponent from '@/components/SampleComponent.vue';
import WImgMComponent from '@/components/WImgMComponent.vue';
import html2canvas from 'html2canvas';
import interact from 'interactjs';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
export default {
    components: {// 在這裡註冊子組件
        WImgMComponent,
        MImgMComponent,
        SampleComponent
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
            memberID:'',
            editingID: null,
            ImgUsings: '',
            selectedFile: null,
            imageUrl: null,
            isComponentRestart:true,
            componentKey: 0,
            screenshotname:'',
            timestamp:'',
            storedImageSrc: '' // 用於存放從 localStorage 中取出的 Base64 圖片數據
        };
    },
    async created() {
        await this.getmemberid();
        this.fetchEditingID();
    },
    mounted() {
        this.setupInteract();
        this.addContainerClickListener();
    },
    methods: {
        //接cookie 
        getCookieValue(name) {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(c => c.startsWith(name + '='));
            return cookie ? cookie.split('=')[1] : null;
        },
        getmemberid(){
            this.memberID = this.getCookieValue('memberID');
        },
        handleDataSent(imagePath, materialId, width, height, name) {
            this.addImage(imagePath, width, height, materialId, name, 1);
        },
        MemhandleDataSent(imagePath, materialId, width, height, memberid, name) {//memberid 未用到
            this.addImage(imagePath, width, height, materialId, name, 0);
        },
        // 用會員id查詢圖層id的 methods
        async fetchEditingID() {
            try {
                const FindID_URL = `${BASE_URL}/EditingImgFiles/FindID/${this.memberID}`;
                const response = await fetch(FindID_URL);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const EditingID = await response.json();
                this.editingID = EditingID;  // 將ID存儲到 data 中
                console.log(this.editingID);
                this.fetchImgUsings();//呼叫圖層資訊
            } catch (error) {
                console.error('Fetch error:', error);
            }
        },
        // 用圖層id查詢圖層所用之圖的methods
        async fetchImgUsings() {
            try {
                const FindImg_URL = `${BASE_URL}/ImgUsings/${this.editingID}`
                const response = await fetch(FindImg_URL);
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
        //當使用者選擇新圖片時，設定 selectedFile
        onFileChange(event) {
        const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
            }
        },
        //呼叫全部會員上傳圖片的功能
        UpLoadImage(){
            this.uploadImage();
            this.AddMemImg();
            this.toggleComponent();
        },
        //上傳圖片
        async uploadImage() {
            if (!this.selectedFile) {
                alert("請先選擇圖片！");
                return;
            }
            // 使用 FormData 將圖片檔案包裝為表單數據
            const formData = new FormData();
            const UpURL = `https://localhost:7048/api/MemberMaterials/upload`
            formData.append('image', this.selectedFile);
            try {
                const response = await axios.post(UpURL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // 假設 API 回傳一個包含圖片 URL 的 JSON 物件
                this.imageUrl = response.data.filePath;
                console.log("圖片上傳成功:", this.imageUrl);
            } catch (error) {
                console.error("上傳失敗:", error);
            }
        },
        //存新圖片回sql
        AddMemImg() {
            let Memterms = {
                "memberMaterialId": 0,
                "memberId": this.memberID,
                "memberImgName": this.selectedFile.name,
                "estimatedLength": 200,
                "estimatedWidth": 200
            };
            console.log(Memterms)
            const post = async () => {
                const API_URL = `${BASE_URL}/MemberMaterials`;
                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        body: JSON.stringify(Memterms),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                    const responseData = await response.json();
                    console.log("上傳成功:", responseData);
                } catch (error) {
                    console.error("上傳失敗:", error);
                }
            };
            post();
        },
        // 隱藏/顯示組件，這將強制重新渲染組件
        toggleComponent() {
            this.isComponentRestart = false; 
            // 使用 setTimeout 在下一個事件循環中再將 isComponentVisible 設置為 true
            setTimeout(() => {
                this.isComponentRestart = true;
                this.componentKey += 1;
            }, 50); // 可嘗試調整延遲時間，比如 50ms
        },
        //更新舊素材回資料庫
        putsql() {
            const container = this.$refs.container;
            const elements = container.querySelectorAll('[default-material-id][websource][memsource]');

            elements.forEach(element => {
                const API_URL = `${BASE_URL}/ImgUsings/${element.getAttribute('default-material-id')}`;//原圖層素材紀錄修改位置
                const pleft = parseInt(element.style.left.replace('px', ''));//取原top left
                const ptop = parseInt(element.style.top.replace('px', ''));
                const imgElement = element.querySelector('img');//抓圖片物件
                const width = imgElement.style.width;
                const widthWithoutPx = width.replace('px', '');
                const height = imgElement.style.height;
                const heightWithoutPx = height.replace('px', '');
                const revise = parseInt(element.getAttribute('isrevise'));
                let imgX = 0;
                let imgY = 0;

                if (revise == 1) {
                    imgX = parseFloat(parseFloat(imgElement.getAttribute('data-x')).toFixed(2)) + pleft;
                    imgY = parseFloat(parseFloat(imgElement.getAttribute('data-y')).toFixed(2)) + ptop;
                }
                else {
                    imgX = parseFloat(parseFloat(imgElement.getAttribute('data-x')).toFixed(2));
                    imgY = parseFloat(parseFloat(imgElement.getAttribute('data-y')).toFixed(2));
                }
                let terms = {
                    "imgUsingId": parseInt(element.getAttribute('default-material-id')),//parseInt是轉成整數
                    "imageName": element.getAttribute('imageName'),
                    "webSource": parseInt(element.getAttribute('websource')),
                    "memSource": parseInt(element.getAttribute('memsource')),
                    "imgHeight": heightWithoutPx,
                    "imgWidth": widthWithoutPx,
                    "imgX": imgX,
                    "imgY": imgY,
                    //toFixed(2)會將數字四捨五入到小數點後兩位，返回的是一個字串。如果你需要它是數字型態而不是字串，可以再使用 parseFloat()
                }
                const put = async () => {
                    const response = await fetch(API_URL, {
                        method: 'PUT',
                        body: JSON.stringify(terms),
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
                put();
            });
        },
        //加入新素材更新回資料庫
        postsql() {
            const container = this.$refs.container;
            const elements = container.querySelectorAll('[data-material-id][websource][memsource]');

            elements.forEach(element => {
                const imageid = element.getAttribute('data-material-id');//新增在塗層的素材
                const imgElement = element.querySelector('img');
                const width = imgElement.style.width;
                const widthWithoutPx = width.replace('px', '');
                const height = imgElement.style.height;
                const heightWithoutPx = height.replace('px', '');
                let terms = {
                    "imgUsingId": 0,
                    "imageName": element.getAttribute('imageName'),
                    "webSource": parseInt(element.getAttribute('websource')),
                    "memSource": parseInt(element.getAttribute('memsource')),
                    "imgHeight": heightWithoutPx,
                    "imgWidth": widthWithoutPx,
                    "imgX": parseFloat(parseFloat(imgElement.getAttribute('data-x')).toFixed(2)),
                    "imgY": parseFloat(parseFloat(imgElement.getAttribute('data-y')).toFixed(2))//toFixed(2)會將數字四捨五入到小數點後兩位，返回的是一個字串。如果你需要它是數字型態而不是字串，可以再使用 parseFloat()
                }
                const post = async () => {
                    console.log(this.editingID);
                    const API_URL = `${BASE_URL}/ImgUsings?imageid=${imageid}&editingid=${this.editingID}`;
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        body: JSON.stringify(terms),
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
                post();
            });
        },
        handleSave() {
            // 呼叫 putsql 和 postsql
            this.captureScreenshot();
            this.screenpostsql();
        },
        //圖層所有元素順序添加進畫面
        defaultImg() {
            let i = 0;
            for (i = 0; i < this.ImgUsings.length; i++) {
                this.AddDefaultImage(this.ImgUsings[i].imgUsingId, this.ImgUsings[i].imageName, this.ImgUsings[i].webSource, this.ImgUsings[i].imgWidth, this.ImgUsings[i].imgHeight, this.ImgUsings[i].imgX, this.ImgUsings[i].imgY);
            }
        },
        //添加圖片的method(1)
        addImage(imagePath, width, height, materialId, name, source) {
            if (imagePath) {
                const newImageContainer = document.createElement('div');//創建一个容器来包裹图片和锁图标
                newImageContainer.style.position = 'absolute';
                newImageContainer.style.left = '0';
                newImageContainer.style.top = '0';
                newImageContainer.setAttribute('data-material-id', materialId); // 使用 materialId 標記容器
                newImageContainer.setAttribute('imageName', name);
                if (source == 1) {
                    newImageContainer.setAttribute('websource', 1);
                    newImageContainer.setAttribute('memsource', 0);
                }
                else {
                    newImageContainer.setAttribute('memsource', 1);
                    newImageContainer.setAttribute('websource', 0);
                }

                const newImage = document.createElement('img');
                newImage.src = imagePath;//圖片路徑
                newImage.classList.add('movable-image');
                newImage.style.transform = `translate(0px, 0px)`;
                newImage.style.width = `${width * 1.5}px`;
                newImage.style.height = `${height * 1.5}px`;
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
        AddDefaultImage(imgUsingId, imageName, webSource, width, height, imgX, imgY) {
            const newImageContainer = document.createElement('div');//創建一个容器来包裹图片和锁图标
            newImageContainer.style.position = 'absolute';
            newImageContainer.style.left = `${imgX}px`;
            newImageContainer.style.top = `${imgY}px`;
            newImageContainer.setAttribute('default-material-id', imgUsingId);//添加素材屬性,方便之後做put跟post
            newImageContainer.setAttribute('imageName', imageName);
            newImageContainer.setAttribute('isrevise', 0);

            const newImage = document.createElement('img');
            if (webSource) {//判斷素材的出處是會員還是本網站提供
                newImage.src = `/src/assets/images/Layer_WebImg/${imageName}`;//圖片路徑
                newImageContainer.setAttribute('websource', 1);
                newImageContainer.setAttribute('memsource', 0);
            } else {
                newImage.src = `/src/assets/images/Layer_MemImg/${imageName}`;
                newImageContainer.setAttribute('websource', 0);
                newImageContainer.setAttribute('memsource', 1);
            }
            newImage.classList.add('movable-image');
            newImage.style.transform = `translate(0px, 0px)`;
            newImage.style.width = `${width}px`;
            newImage.style.height = `${height}px`;
            newImage.setAttribute('data-x', imgX);
            newImage.setAttribute('data-y', imgY);

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
        //填滿背景功能
        fillup(){
            const container = this.$refs.container;
            const containerRect = container.getBoundingClientRect();

            this.selectedImage.style.width = `${containerRect.width}px`;
            this.selectedImage.style.height = `${containerRect.height}px`;

            this.selectedImage.style.transform = 'translate(0px, 0px)';
            this.selectedImage.setAttribute('data-x', 0);
            this.selectedImage.setAttribute('data-y', 0);

            this.saveDragState(this.selectedImage, 0, 0);
            const lockIcon = this.saveDragState.parentNode.querySelector('.lock-icon');
            if (lockIcon) {
                lockIcon.style.transform = `translate(${x}px, ${y}px)`; // 锁图标跟随图片移动
            }
        },
        // 调用 html2canvas 来截取 container 的截图
        captureScreenshot() {
            const container = this.$refs.container;
            html2canvas(container).then(canvas => {
                const imageData = canvas.toDataURL('image/png'); // 獲取 Base64 圖片數據
                const fileName = `screenshot_${Date.now()}.png`;
                this.screenshotname = fileName;
                this.timestamp = new Date().toISOString().split('.')[0];// "YYYY-MM-DDTHH:MM:SS" 格式
                this.uploadScreenshot(imageData,fileName);//先註解
            });
        },
        uploadScreenshot(imageData,fileName) {
            const base64Data = imageData.replace(/^data:image\/png;base64,/, ""); // 移除 base64 前綴

            // 發送 POST 請求到 Web API
            axios.post('https://localhost:7048/api/MemberMaterials/Screenshot', {
                imageBase64: base64Data,
                fileName: fileName
            })
            .then(response => {
                console.log('Image uploaded successfully:', response.data.filePath);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
            this.screenpostsql();
        },
        //Screenshot存回sql
        screenpostsql() {
            if(this.editingID==0){
                let terms = {//之後會換
                    "editingImgFileId": 0,
                    "memberId": this.memberID,
                    "editTime": this.timestamp,
                    "screenshot": this.screenshotname,
                    "imgEditingName": "圖層1"
                }
                const post = async () => {
                    const API_URL = `${BASE_URL}/EditingImgFiles`;
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        body: JSON.stringify(terms),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        await this.fetchEditingID(); // 等待 fetchEditingID 完成後更新 this.editingID
                        this.putsql(); // 然後執行 putsql
                        this.postsql(); // 最後執行 postsql
                    }
                }
                post();
                
            }
            else{
                let terms = {//之後會換
                    "editingImgFileId": this.editingID,
                    "memberId": this.memberID,
                    "editTime": this.timestamp,
                    "screenshot": this.screenshotname,
                    "imgEditingName": "圖層1"
                }
                const put = async () => {
                    const API_URL = `${BASE_URL}/EditingImgFiles/${this.editingID}`;
                    const response = await fetch(API_URL, {
                        method: 'PUT',
                        body: JSON.stringify(terms),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (response.ok) {
                        this.putsql(); // 更新後執行 putsql
                        this.postsql(); // 然後執行 postsql
                    }
                }
                put();
            }
            
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
            const flag = this.selectedImage.parentNode.getAttribute('default-material-id') || 0;
            const imgusingID = parseInt(flag);
            if (!0) {
                const deleteImg = async () => {
                    try {
                        const FindID_URL = `${BASE_URL}/ImgUsings/${imgusingID}`; // 正確的URL
                        const response = await fetch(FindID_URL, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            console.log('刪除成功');
                        } else {
                            console.error('刪除失敗', response.status);
                        }
                    } catch (error) {
                        console.error('Fetch error:', error);
                    }
                };
                deleteImg();
            }
            if (this.selectedImage) {
                const imageContainer = this.selectedImage.parentNode;
                console.log(imageContainer);
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
                                target.parentNode.setAttribute('isrevise', 1);

                                const imgRect = target.getBoundingClientRect(); // 取得圖片的邊界
                                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                                // 取得容器位置
                                const containerOffsetX = parseFloat(target.parentNode.style.left) || 0; // 取得 newImageContainer 的 left
                                const containerOffsetY = parseFloat(target.parentNode.style.top) || 0; // 取得 newImageContainer 的 top
                                // 限制 x 和 y 在容器內
                                x = Math.max(0 - containerOffsetX, Math.min(x, containerRect.width - imgRect.width - containerOffsetX));
                                y = Math.max(0 - containerOffsetY, Math.min(y, containerRect.height - imgRect.height - containerOffsetY));

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
                                x = Math.max(0 - containerOffsetX, Math.min(x, containerRect.width - newWidth - containerOffsetX));
                                y = Math.max(0 - containerOffsetY, Math.min(y, containerRect.height - newHeight - containerOffsetY));

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
WimgmenuComponent {
    position: relative;
    padding: 10px;
}

MimgmenuComponent {
    position: relative;
    padding: 10px;
}

.Mh3 {
    background-color: #F5F5DC;
    color: #6f8170;
    text-align: center;
    padding: 8px;
    position: sticky;
    /* 讓 h3 固定 */
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
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 50px;
    width: 100%;
}

/* .components-wrapper 緊跟在 .container 右邊 */
.components-wrapper {
    height: 626px;
    margin-right: 50px;
    display: flex;
    gap: 1px;
    /* 兩個 component 之間設置 3px 的間距 */
}

.center-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    /* 使內容在整個視窗中垂直置中 */
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
    max-width: 1020px;
    width: 1012px;
    height: 626px;
    background-color: #D8CAB8;
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
    padding-top: 20px;
    padding-bottom: 15px;
    border-bottom-left-radius: 10px;
    gap: 10px;
    text-align: center;
}

.controls input {
    margin-right: 10px;
}

.btn {
    position: relative;
    width: 100px;
    height: 50px;
    background: #d6cdcd;
    color: #7a7676;
    overflow: hidden;
    margin-right: 10px;
}

.btn div,
.btn:before {
    font-size: 1em;
    font-weight: bold;
    text-transform: uppercase;
    transition: all .2s ease-in-out;
}

.btn:before {
    content: attr(data-hover);
    position: absolute;
    left: 0;
    width: 100%;
    opacity: 0;
    transform: translate(-100%, 0);
}

.btn:hover {
    background: #98cded;
    color: #40779a;
}

.btn-red:hover {
    background: #d48989;
    color: #7d4040;

}

.btn-green:hover {
    background: #89d494;
    color: #407d4e;

}

.btn:hover div {
    opacity: 0;
    transform: translate(100%, 0)
}

.btn:hover:before {
    opacity: 1;
    transform: translate(0, 0);
}

.btn-up {
    position: relative;
    width: 150px;
    height: 50px;
    background: #625e5e;
    color: #dad0d0;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 5px;
}

.btn-up div,
.btn-up:before {
    font-size: 1em;
    font-weight: bold;
    text-transform: uppercase;
    transition: all .2s ease-in-out;
}

.btn-up:before {
    content: attr(data-hover);
    position: absolute;
    left: 0;
    width: 100%;
    opacity: 0;
    transform: translate(-100%, 0);
}

.btn-up:hover {
    background: #98cded;
    color: #40779a;
}

.btn-up:hover div {
    opacity: 0;
    transform: translate(100%, 0)
}

.btn-up:hover:before {
    opacity: 1;
    transform: translate(0, 0);
}

input[type="file"] {
    width: 250px;
    color: #625e5e;
    padding: 5px;
    border: 1px solid #6e6e6e;
    border-radius: 5px;
}

/* 調整尺寸的框 */
.menu {
    gap: 10px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    margin-left: 127px;
    padding: 10px;
    position: relative;
    width: 100px;
    height: 626px;
    background-color: #F5F5DC;
    color: #625e5e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.menu div {
    padding: 20px;
    cursor: pointer;
    text-align: center;
    background-color: #dad0d0;
    margin-bottom: 10px;
}

.menu div:hover {
    background-color: #a39c9c;
    color: black;
}
</style>