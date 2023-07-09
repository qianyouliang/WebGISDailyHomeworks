import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          component: () => import('../views/HomeView/components/NowPlaying.vue')//以下都是懒加载
        },
        {
          path: '/comingsoon',
          component: () => import('../views/HomeView/components/ComingSoon.vue')
        },
      ]

    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/DetailView/DetailView.vue')//以下都是懒加载
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView/RegisterView.vue')
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('../views/CityView/CityView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView/ProfileView.vue')
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
