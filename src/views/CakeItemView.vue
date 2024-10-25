<script>
import SampleComponent from '@/components/SampleComponent.vue';
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router'; // 引入 useRoute

const cake = ref({}); // 用於儲存蛋糕詳細資料
export default {
  setup() {
    const route = useRoute(); // 獲取路由
    const cakeID = ref(route.params.id); // 取得傳遞的 ID

    const loadCakeDetail = async () => {
      try {
        const response = await fetch(`https://localhost:7048/api/Cakes/${cakeID.value}`);
        cake.value = await response.json();
      } catch (error) {
        console.error('載入蛋糕詳情失敗:', error);
      }
    };

    onMounted(loadCakeDetail); // 載入蛋糕詳細資料

    return { cakeID, cake }; // 回傳 ID 和詳細資料
  },
};

</script>

<template>
    <div>
        <SampleComponent><div class="slide" style="background: url(/src/assets/images/servicebg.jpg) no-repeat;background-size: cover;"></div></SampleComponent>

        <section id="latest-blog" class="py-5">
    <div class="container-fluid">
      <div>
        <div class="section-header d-flex align-items-center justify-content-between my-5">
          <h2 class="section-title ">商品內頁</h2>
          <div class="btn-wrap align-right">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-12" >
          <article class="post-item card border-0 shadow-sm p-3">
            <div class="image-holder zoom-effect">
              <a href="#">
                <img src="../assets/images/post-thumb-1.jpg" alt="post" class="card-img-top">
              </a>
            </div>
            <div class="card-body">
              <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                <div class="meta-date"><svg width="16" height="16">
                    <use xlink:href="#calendar"></use>
                  </svg>22 Aug 2021{{ cakes.cakeName}}</div>
                <div class="meta-categories"><svg width="16" height="16">
                    <use xlink:href="#category"></use>
                  </svg>tips & tricks</div>
              </div>
              <div class="post-header">
                <h3 class="post-title">
                  <a href="#" class="text-decoration-none">Top 10 casual look ideas to dress up your kids</a>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec
                  quam. A in arcu, hendrerit neque dolor morbi...</p>
              </div>
            </div>
          </article>
        </div>
        <div class="col-lg-6 col-md-12" >
          <article class="post-item card border-0 shadow-sm p-3">
            <div class="image-holder zoom-effect">
            </div>
            <div class="card-body">
              <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                <div class="meta-date"><svg width="16" height="16">
                    <use xlink:href="#calendar"></use>
                  </svg>28 Aug 2021</div>
                <div class="meta-categories"><svg width="16" height="16">
                    <use xlink:href="#category"></use>
                  </svg>inspiration</div>
              </div>
              <div class="post-header">
                <h3 class="post-title">
                  <a href="#" class="text-decoration-none"></a>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec
                  quam. A in arcu, hendrerit neque dolor morbi...</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

    </div>
</template>

<style lang="css" scoped>
@import '../assets/css/shop.css'; /* 引用 CSS 文件 */

</style>