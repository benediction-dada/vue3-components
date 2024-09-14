/**
 * @author yuda
 * @description pinia仓库（存放组件页面信息）
 */

import { defineStore } from 'pinia'
import { componentsStore, componentsItem } from '@/types/components'
import { v4 as uuid } from 'uuid'
import { markRaw } from 'vue'

import CssBaseCursor from '@/modules/cssBaseCursor/index.vue'

import AnimationTextExpand from '@/modules/AnimationTextExpand/index.vue'
import AnimationLoading from '@/modules/AnimationLoading/index.vue'

import ImagePreview from '@/modules/ImagePreview/index.vue'
import ImageSnapshot from '@/modules/ImageSnapshot/index.vue'

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
          name: 'css_base',
          label: 'css基础',
          children: [
            {
              id: uuid(),
              name: 'css_base_cursor',
              label: '鼠标手势',
              component: markRaw(CssBaseCursor)
            }
          ]
        },
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
            },
            {
              id: uuid(),
              name: 'image_snapshot',
              label: '截图组件',
              component: markRaw(ImageSnapshot)
            },
          ]
        },
        {
          id: uuid(),
          name: 'animation',
          label: '动画',
          children: [
            {
              id: uuid(),
              name: 'animation-text',
              label: '文字',
              component: markRaw(AnimationTextExpand)
            },
            {
              id: uuid(),
              name: 'animation-loading',
              label: 'Loading',
              component: markRaw(AnimationLoading)
            },
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