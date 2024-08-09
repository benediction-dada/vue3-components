// 引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import config from './assets/js/config.ts'
import directive from './utils/directive.ts'

// 静态资源
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import './style.less'

// 组件
import App from './App.vue'

// 开始加载
const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$config = config
app.use(pinia)
app.use(router)

directive(app) // 注册指令

app.mount('#app')
