import { createRouter, createWebHistory } from 'vue-router'
import CityView from "../views/City/CityView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/Home/HomeView.vue")
    },
    {
      path: '/city',
      name: 'city',
      component: CityView
    }
  ]
})

export default router