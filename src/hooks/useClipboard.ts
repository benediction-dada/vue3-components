/**
 * @author yuda
 * @description 返回复制板功能
 */

import useMessage from "./useMessage";

const { _message } = useMessage()

/**
 * @description 复制文字到剪贴板
 * 
 * @param {string} 需要复制到剪贴板的字符串
 * @return {string}
 */
const copyText = (text: string = ''): void =>{
  window.navigator.clipboard.writeText(text).then(() => {
    _message('success', '复制成功', '成功')
  }).catch(err => {
    console.error('useClipboard:', err)
  })
}

export default () => ({
  copyText
})
