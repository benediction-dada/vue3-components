/**
 * @author yuda
 * @description 返回messagebox方法
 */
import { ElNotification, ElMessage } from 'element-plus'
import useMainStore from '@/pinia/main'

let mainStore: any // pinia<main仓库>
type messageType = 'error' | 'success' | 'warninig' | 'info' // 消息类型

/**
 * 
 * @description 消息提示方法
 * @param type {messageType}
 * @param message {string}
 * @param title {string}
 */
const _message =  (type: messageType, message:string, title?:string,) => {
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

export default () => ({
  _message
})