/**
 * @author yuda
 * @description 返回图片处理方法
 */

/**
 * @description 返回项目主题色
 */
const getThemeColor = () => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()

export default () => ({
  getThemeColor
})