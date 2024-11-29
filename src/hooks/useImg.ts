/**
 * @author yuda
 * @description 返回图片处理方法
 */
import type { Ref } from 'vue';

interface Rect {
  width: number,
  height: number
}
/**
 * @warninig async！！
 * @description 获取图片的原始尺寸
 * @param url {string}
 */
const setOriginRect = (url:string, obj: Ref<Rect>): Promise<Rect | undefined> => {
  return new Promise((resolve, reject) => {
    if(!url) reject(new Error('图片路径加载失败'))
    const img = new Image()
    img.src = url;
    img.onload = function () {
      obj.value = {
        width: img.naturalWidth || 0,
        height: img.naturalHeight || 0
      }
      resolve(obj)
    }
  })
}

export default () => {
  return { 
    setOriginRect
  }
}