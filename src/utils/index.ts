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
    window.$notify('成功', '复制成功。', 'success')
  } catch (err) {
    window.$notify('失败', '复制失败，请重试。', 'error')
    throw err
  }
}