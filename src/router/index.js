import BudgetChartComponent from '@/components/BudgetChartComponent.vue'
import AllShopView from '@/views/AllShopView.vue'
import CakeView from '@/views/CakeView.vue'
import CarView from '@/views/CarView.vue'
import DishesView from '@/views/DishesView.vue'
import ShopView from '@/views/ShopView.vue'
import { createRouter, createWebHistory } from 'vue-router'


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
    { //預算
      path: '/budgetplan',
      name: 'budgetplan',
      component: BudgetChartComponent
    },
    { //商家預選畫面
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    { //喜餅頁面
      path: '/cake',
      name: 'cake',
      component: CakeView
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

  ]
})

export default router
