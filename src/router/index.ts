import { createRouter, createWebHashHistory } from 'vue-router'
import HealthDiary from '@/views/HealthDiary/HealthDiary.vue'
import StoryClub from '@/views/StoryClub/StoryClub.vue'

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
    path: '/StoryClub',
    name: 'StoryClub',
    component: StoryClub,
    meta: {
      title: '故事吧',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
