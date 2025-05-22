import { createRouter, createWebHistory } from 'vue-router'
import HealthDiary from '@/views/HealthDiary.vue'
import About from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'HealthDiary',
    component: HealthDiary,
    meta: {
      title: '健康日记',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
