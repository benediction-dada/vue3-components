// 引入
import router from './router'
import directive from './utils/directive.ts'
import microApps from '@/microApps/index.ts'
import piniaPresist from 'pinia-plugin-persistedstate'

// 静态资源
import './assets/theme/dark.css' // 自定义暗黑样式
import './style.scss' // 自定义全局样式
import './assets/iconfont/iconfont.js' // 图标
import './assets/iconfont/iconfont.css' // 图标
import '@/assets/theme/light_v1.scss' // elementplus 样式
import 'element-plus/theme-chalk/dark/css-vars.css' // elementplus暗黑模式

// 组件
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPresist)
// 开始加载
const app = createApp(App)

directive(app) // 注册指令
microApps() // 注册微服务

app.use(pinia).use(router)

router.isReady().then(() => {
  app.mount('#app')
})
