/**
 * @author yuda
 * @description 返回添加页面级监听事件
 */
import { onMounted, onBeforeUnmount } from 'vue'
type Callback = (...args: any) => void


const addWindowResize = (callback: Callback) => {
  onMounted(() => {
    window.addEventListener('resize', callback)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', callback)
  })
}

const addWindowScroll = (callback: Callback) => {
  onMounted(() => {
    window.addEventListener('scroll', callback)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', callback)
  })
}

export default () => ({
  addWindowResize,
  addWindowScroll
})