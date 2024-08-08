// 引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
// 静态资源
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import './style.less'
import config from './assets/js/config.js'

// 组件
import App from './App.vue'

// 开始加载
const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$config = config
app.use(pinia)
app.use(router)

app.mount('#app')
