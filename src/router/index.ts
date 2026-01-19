import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '../views/BoardView.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BoardView
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
