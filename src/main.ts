// 引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import config from './assets/js/config.ts'
import directive from './utils/directive.ts'
import elementPlus from './utils/elementPlus.ts'

// 静态资源
// import './assets/theme/light.scss'
// import 'element-plus/dist/index.css' // elementplus 样式
import './assets/iconfont/iconfont.js' // 图标
import './assets/iconfont/iconfont.css' // 图标
import './style.scss' // 自定义全局样式

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
