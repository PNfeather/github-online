import { createRouter, createWebHistory } from 'vue-router'
import HealthDiary from '@/views/HealthDiary.vue'
import About from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'HealthDiary',
    component: HealthDiary,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
