/**
 * @author yuda
 * @description pinia仓库（存放组件页面信息）
 */

import { defineStore } from 'pinia'
import { componentsStore, componentsItem } from '@/types/components'
import { v4 as uuid } from 'uuid'
import { markRaw } from 'vue'

import AnimationTextExpand from '@/modules/AnimationTextExpand/index.vue'
import ImagePreview from '@/modules/ImagePreview/index.vue'

const useComponnetsStore = defineStore('components', {
  state: ():componentsStore => ({
    menus: [], // 组件菜单列表
    actived: '', // 选中的菜单_id
    activedItem: null
  }),
  getters: {
    get_menus: state => state.menus,
    get_activedItem: state => state.activedItem
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
              component: markRaw(ImagePreview)
            }
          ]
        },
        {
          id: uuid(),
          name: 'animation',
          label: '动画',
          children: [
            {
              id: uuid(),
              name: 'animation-text-expand',
              label: '文字展开',
              component: markRaw(AnimationTextExpand)
            }
          ]
        }

      ]
      this.actived = this.menus[0]?.children[0]?.id || ''
      this.activedItem = this.menus[0]?.children[0] || null
    },

    set_actived(item: componentsItem) {
      this.actived =item.id
      this.activedItem = item
    }
  }
})

export default useComponnetsStore