import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home/index.vue'
import Components from '@/pages/Components/index.vue'
import ThreeDTry from '@/pages/ThreeDTry/index.vue'

const routes = [
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/',
    component: Home,
    redirect: '/components',
    children: [
      {
        path: '/components',
        component: Components
      },
      {
        path: '/threeDTry',
        component: ThreeDTry
      }
    ]
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
