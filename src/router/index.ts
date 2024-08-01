import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})