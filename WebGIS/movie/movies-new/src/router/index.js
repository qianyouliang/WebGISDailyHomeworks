import HomeView from "../views/HomeView.vue"
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, //预加载，方便缓存
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import("../views/DetailView.vue") //懒加载
    }
  ],
  /* 实现全局监听滚动行为 */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router