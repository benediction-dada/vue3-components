/**
 * @author yuda
 * @description 返回添加页面级监听事件
 */
import { onMounted, onBeforeUnmount } from 'vue'

type Callback = (...args: any) => void
type EventType = 'resize' | 'click' | 'scroll' | 'mousemove' | 'mouseup' | 'wheel'
type EventTar = Window | Document

const addEventListener = (tar:EventTar,  type: EventType, callback: Callback, options?: any) => {
  onMounted(() => {
    tar.addEventListener(type, callback)
  })
  onBeforeUnmount(() => {
    tar.removeEventListener(type, callback, options)
  })
}

export default () => ({
  addEventListener
})