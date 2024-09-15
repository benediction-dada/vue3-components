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
        name: '组件',
        path: '/components',
        component: Components,
        meta: {
          isMiniServer: false
        },
      },
      {
        name: '3D尝试',
        path: '/threeDTry',
        meta: {
          isMiniServer: true
        },
        component: ThreeDTry
      }
    ]
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
