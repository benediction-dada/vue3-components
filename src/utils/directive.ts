/**
 * @author yuda
 * @description 存放所有全局指令
 */

import { App } from 'vue'

/**
 * @description 点击外部指令
 * @param {function} 点击元素外部运行的回调函数
 */
export const click_outside = {
  mounted(el:any, binding: any) {
    const self:ClickOutsideSelf = {}
    self['clickHandler'] = function clickHandler(event:MouseEvent): any {
      // 点击元素是自身或者自身子节点 运行绑定函数
      if(!( el === event.target || el.contains(event.target))) {
        binding.value(event) // 运行绑定函数
      }
    }
    document.addEventListener('click', self.clickHandler)
    el['__click_outside__'] = self // 将函数存在元素上方便卸载
  },
  unmounted(el:any) {
    if(el['__click_outside__']) {
      document.removeEventListener('click', el['__click_outside__'].clickHandler)
      delete el['__click_outside__']
    }
  }
}

interface ClickOutsideSelf  {
  clickHandler?: (event: MouseEvent) => void
}

export default (vue: App) => {
  vue.directive('click_outside', click_outside)
}