import BudgetChartComponent from '@/components/BudgetChartComponent.vue'
import CakeView from '@/views/CakeView.vue'
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
  ]
})

export default router
