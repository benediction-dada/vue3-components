/**
 * @author yuda
 * @description pinia仓库（存放组件页面信息）
 */

import { defineStore } from 'pinia'
import { componentsStore } from '@/types/components'
import { v4 as uuid } from 'uuid'
export default defineStore('components', {
  state: ():componentsStore => ({
    components: []
  }),
  getters: {
    get_components: state => state.components
  },
  actions: {
    // 初始化
    init() {
      this.init_components()
    },
    // 初始化组件列表
    init_components() {
      this.components = [
        {
          id: uuid(),
          name: 'image',
          label: '图片组件',
          children: [
            {
              id: uuid(),
              name: 'image_preview',
              label: '图片预览'
            }
          ]
        }
      ]
    }
  }
})

