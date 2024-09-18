import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from 'qiankun'
import apps from './apps.ts'

// 注册apps
registerMicroApps(apps, {
  beforeLoad: (app: any) => {
    console.log('开始')
    return Promise.resolve()
  },
  afterMount: (app: any) => {
    console.log('加载完成')
    return Promise.resolve()
  }
})
// 添加全局微服务异常处理
addGlobalUncaughtErrorHandler((event: Event | string) => {
  console.log(event)
  window.$notify('错误', '微服务加载失败', 'error')
})

export default start




