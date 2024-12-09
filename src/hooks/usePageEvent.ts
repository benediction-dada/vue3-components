/**
 * @author yuda
 * @description 返回添加页面级监听事件
 */

type Callback = (...args: any[]) => void
type EventType = 'resize' | 'click' | 'scroll' | 'mousemove' | 'mouseup' | 'wheel'
type EventTar = Window | Document
interface Args {
  tar:EventTar,
  type: EventType,
  callback: Callback,
  options?: any
}


export default () => {
  const list: Array<Args> = []
  /**
   * @description 给页面window或者document添加事件
   * @params tar {EventTar}
   * @params type {EventType}
   * @params callback {Callback}
   * @params options {any}
   * 
   */
  const addEventListener = (tar:EventTar,  type: EventType, callback: Callback, options?: any) => {
    tar.addEventListener(type, callback) 
    list.push({
      tar,
      type,
      callback,
      options,
    })
  }
  onBeforeUnmount(() => {
    // 事件销毁
    list.forEach(({tar, type, callback, options}) => {
      tar.removeEventListener(type, callback, options)
    })
    list.length = 0
  })
  return {
    addEventListener
  }
}