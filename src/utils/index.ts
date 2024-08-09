/**
 * @author yuda
 * @description 存放基础公共方法（无类型意义的方法）
 */

/**
 * @description 将文字拷贝进剪贴板
 * 
 * @param {string} 拷贝进剪贴板中的字符串
 * @return {void}
 */
export const copyText = async (text:string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    throw err
  }
}