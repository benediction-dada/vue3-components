import ElementPlus, { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import useMainStore from '@/pinia/main'
import { Store } from 'pinia'


let mainStore: any


// 提示信息
const notify = (title:string, message:string, type: NotifyType) => {
  if(!mainStore) {
    mainStore = useMainStore()
  }
  if(mainStore.isSmallScreen) {
    ElMessage({
      message,
      type
    })
  } else {
    ElNotification({
      title,
      message,
      type
    })
  }
}

export default (app:any) => {
  app.use(ElementPlus)
  window.$notify = notify
  window.$messageBox = ElMessageBox
}

export type NotifyType = 'error' | 'warning' | 'info' | 'success'