/**
 * @author yuda
 * @description pinia仓库（存放组件页面信息）
 */

import { defineStore } from 'pinia'
import { componentsStore } from '@/types/components'
import { v4 as uuid } from 'uuid'
export default defineStore('components', {
  state: ():componentsStore => ({
    menus: [], // 组件菜单列表
    actived: '', // 选中的菜单_id
  }),
  getters: {
    get_menus: state => state.menus
  },
  actions: {
    // 初始化
    init() {
      this.init_menus()
    },
    // 初始化组件列表
    init_menus() {
      this.menus = [
        {
          id: uuid(),
          name: 'image',
          label: '图片组件',
          children: [
            {
              id: uuid(),
              name: 'image_preview',
              label: '图片预览',
            }
          ]
        }
      ]
      this.actived = this.menus[0]?.children[0]?.id || ''
    },

    set_actived(_id:string) {
      this.actived =_id
    }
  }
})

