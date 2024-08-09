/**
 * @author yuda
 * @description 存放所有全局指令
 */


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
    el['__click_outside__'] = self
  },
  unmounted(el:any) {
    if(el['__click_outside__']) {
      document.removeEventListener('click', el['__click_outside__'].clickHandler)
    }
  }
}

interface ClickOutsideSelf  {
  clickHandler?: (event: MouseEvent) => void
}