/**
 * @author yuda
 * @description 返回字符串处理方法
 */

const EMPTY = '--'

/**
 * @description 字符展示
 */
const showText = (str: string | undefined) => {
  return str || EMPTY
}

/**
 * @description 字符串列表分割展示
 */
const showList = (list: Array<string> | undefined, split: string = ',') => {
  if(!list) return EMPTY
  return showText(list.join(split))
}

/**
 * @description 全小写
 */
const toUpperCase = (str: string | undefined) => {
  if(!str) return EMPTY
  return str.toUpperCase()
}

/**
 * @description 全大写
 */
const toLowerCase = (str: string | undefined) => {
  if(!str) return EMPTY
  return str.toLowerCase()
}

/**
 * @description 首字母大写
 */
const toFirstUpperCase = (str: string | undefined) => {
  if(!str) return EMPTY
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`
}

export default () => ({
  showText,
  showList,
  toUpperCase,
  toLowerCase,
  toFirstUpperCase
})