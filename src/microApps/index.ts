import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from 'qiankun'
import apps from './apps.ts'
import useMessage from '@/hooks/useMessage'

const { _message } = useMessage()
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
  _message('error', '微服务加载失败', '错误')
})

export default start




