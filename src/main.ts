// 引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import config from './assets/js/config.ts'
import directive from './utils/directive.ts'
import elementPlus from './utils/elementPlus.ts'

// 静态资源
import 'element-plus/dist/index.css'
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
elementPlus(app)// 注册Element-plus配置

app.mount('#app')
