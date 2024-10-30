
import BudgetPlanView from '@/views/BudgetPlanView.vue'
import AllShopView from '@/views/AllShopView.vue'
import CakeView from '@/views/CakeView.vue'
import CarView from '@/views/CarView.vue'
import DishesView from '@/views/DishesView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ImageLayerManager from '@/views/ImageLayerManager.vue'
import ShopView from '@/views/ShopView.vue'
import WeddingPlanView from '@/views/WeddingPlanView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CakeItemView from '@/views/CakeItemView.vue'
import CarItemView from '@/views/CarItemView.vue'
import DishItemView from '@/views/DishItemView.vue'
import ShopDetailView from '@/views/ShopDetailView.vue'
import EventsView from '@/views/EventsView.vue'
import ToDoView from '@/views/ToDoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    { //首頁
      path: '/',
      name: 'home',
      component: HomeView
    },
    { //待辦事項
      path: '/todo',
      name: 'todo',
      component: ToDoView
    },
    { //預算
      path: '/budgetplan',
      name: 'budgetplan',
      component: BudgetPlanView
    },
    { //婚禮企劃書
      path: '/weddingplan',
      name: 'weddingplan',
      component: WeddingPlanView
    },
    { //商家預選畫面
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    { //喜餅頁面
      path: '/cake',
      name: 'cake',
      component: CakeView,
    },
    { //登入頁面
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { //註冊頁面
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    { //我的檔案
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    { //桌菜頁面
      path: '/dish',
      name: 'dish',
      component: DishesView
    },
    { //車輛頁面
      path: '/car',
      name: 'car',
      component: CarView
    },
    { //所有商家頁面
      path: '/allshop',
      name: 'allShop',
      component: AllShopView
    },
    { //所有商家頁面
      path: '/event',
      name: 'event',
      component: EventsView
    },
    { //圖層頁面
      path: '/LayerSimulation',
      name: 'layers',
      component: ImageLayerManager
    }
  ]
})

export default router
