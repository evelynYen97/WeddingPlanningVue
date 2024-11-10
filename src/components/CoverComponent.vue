<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

function wrapChars(element) {
    element.innerHTML = element.textContent
        .split('')
        .map(char => `<span class="char" data-char="${char}">${char}</span>`)
        .join('');
}

onMounted(() => {
    const elements = ['.text-lead'];
    elements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) wrapChars(el);
    });

    // 儲存當前的動畫時間軸
    let currentAnimation = null;

    // 重置動畫狀態的函數
    function resetAnimationState() {
        // 如果有正在進行的動畫，先把它清除掉
        if (currentAnimation) {
            currentAnimation.kill();
            currentAnimation = null;
        }

        // 強制重置所有元素的狀態
        gsap.set(['.fade-in:nth-child(1)', '.fade-in:nth-child(2)'], {
            clearProps: 'all'  // 清除所有 GSAP 屬性
        });
        
        // 重新設置初始狀態
        gsap.set('.fade-in:nth-child(1)', {
            opacity: 0,
            y: -20,
            immediate: true
        });
        gsap.set('.fade-in:nth-child(2)', {
            opacity: 0,
            y: -20,
            immediate: true
        });
        
        // 重置文字動畫
        const chars = document.querySelectorAll('.text-lead .char');
        gsap.set(chars, {
            clearProps: 'all'  // 清除所有之前的動畫屬性
        });
        gsap.set(chars, {
            opacity: 0,
            y: -50,
            rotateX: 90,
            immediate: true
        });
    }

    // 創建動畫序列
    function createAnimation() {
        // 先重置所有狀態
        resetAnimationState();
        
        // 創建新的時間軸
        currentAnimation = gsap.timeline();
        
        // 設置動畫序列
        currentAnimation
            .to('.fade-in:nth-child(1)', {
                opacity: 1,
                y: 0,
                duration: 1
            })
            .to('.fade-in:nth-child(2)', {
                opacity: 1,
                y: 0,
                duration: 1
            }, '-=0.5')
            .to('.text-lead .char', {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.6,
                stagger: 0.04
            });

        return currentAnimation;
    }

    // 設置 IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 當元素進入視圖時，創建並播放新的動畫
                createAnimation();
            } else {
                // 當元素離開視圖時，確保完全重置狀態
                resetAnimationState();
            }
        });
    }, {
        threshold: 0.2,  // 設置為0.2，表示元素出現20%時就觸發
        rootMargin: '0px'  // 調整觀察範圍
    });

    // 開始觀察目標元素
    const target = document.querySelector('.text-lead');
    if (target) {
        observer.observe(target);
    }

    // 初始化時重置狀態
    resetAnimationState();
});
</script>




  <template>
    <div class="cover">
      <div class="cover-overlay"></div>

      <div class="cover-content">
        <h1 class="fade-in" >Two Hearts, One Love</h1>
        <p class="fade-in" style="font-size: 1.8em;">我們的故事從這裡開始</p>

        <div class="text-box">
          <div class="" style="margin-top: 60px;">
            <div class="">
              <p class="text-lead my-10">
                極光如愛情，獨特且無法複製，每段婚禮都是兩人共同書寫的奇蹟。打造屬於彼此的回憶，讓它永遠閃爍在心底。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

    <style lang="css" scoped>
    
    /* 確保文字容器不會因為動畫而改變佈局 */

    .fade-in {
      opacity: 0;
      transform: translateY(-20px);
      
    }
    .text-lead {
      font-size: 1.3em; /* 減小字體大小 */
    }
    
    /* .text-lead {
      font-size: 1.3rem;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3)); 
      padding: 10px 20px; 
      backdrop-filter: blur(10px); 
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    } */
     
    .text-box {
          visibility: visible;
          position: relative;
      }

    .char {
          display: inline-block;
          backface-visibility: hidden;
          perspective: 1000px;
    }

    .cover-content {
      margin-top: 145px;
    }

    .cover {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column; /* 改為垂直排列 */
      justify-content: center;
      align-items: center;
      color: white;
      animation: zoom 15s ease-in-out infinite alternate;
    }

    @keyframes zoom {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.05);
      }
    }

    .cover::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url('/src/assets/images/navImage3.jpg');
      background-size: cover;
      background-position: center;
      filter: blur(4px);
      transition: filter 0.8s ease;
    }

    .cover:hover::before {
      filter: blur(0);
    }

    .cover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2));
      z-index: 1;
    }

    .cover-content {
      position: relative;
      z-index: 2;
      text-align: center;
      margin-bottom: 30px; /* 添加底部間距，確保與 text-box 有空隙 */
    }


    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      transform: translateY(-20px);
    }

    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      transform: translateY(-20px);
    }

    .cover-button {
      padding: 0.5rem 1.5rem; /* 縮小 padding */
      font-size: 1rem; /* 縮小字體 */
      color: white;
      background-color: rgba(255, 255, 255, 0.3);
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .cover-button:hover {
      background-color: rgba(255, 255, 255, 0.5);
      transform: scale(1.05);
    }
    </style>