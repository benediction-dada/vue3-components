import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home/index.vue'
import Overview from '@/pages/Overview/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path:'/overview',
        component: Overview
      }
    ]
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
