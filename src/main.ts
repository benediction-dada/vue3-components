// 引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
// 静态资源
import './style.less'

// 组件
import App from './App.vue'

// 开始加载
const app = createApp(App)
const pinia = createPinia

app.use(pinia)
app.use(router)

app.mount('#app')
