<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import moduleTitle from '../components/moduleTitle.vue'
import useComponnetsStore from '@/pinia/components'
import useMainStore from '@/pinia/main'
import { v4 as uuid } from 'uuid'

const mainStore = useMainStore()
const componentsStore = useComponnetsStore()
let activedItem = computed(() => componentsStore.activedItem)

const list = [
  { _id: uuid(), title: 'ew-resize', des: '水平' },
  { _id: uuid(), title: 'ns-resize', des: '垂直' },
  { _id: uuid(), title: 'nwse-resize', des: '右斜' },
  { _id: uuid(), title: 'nesw-resize', des: '左斜' },
  { _id: uuid(), title: 'move', des: '拖拽' },
  { _id: uuid(), title: 'n-resize', des: '上' },
  { _id: uuid(), title: 'e-resize', des: '右' },
  { _id: uuid(), title: 's-resize', des: '下' },
  { _id: uuid(), title: 'w-resize', des: '左' },
  { _id: uuid(), title: 'nw-resize', des: '左上' },
  { _id: uuid(), title: 'ne-resize', des: '右上' },
  { _id: uuid(), title: 'sw-resize', des: '左下' },
  { _id: uuid(), title: 'se-resize', des: '右下' },
  { _id: uuid(), title: 'pointer', des: '✋🏻' },
  { _id: uuid(), title: 'not-allowed', des: '禁止' },
]

</script>
<template>
  <moduleTitle type="h5" :title="activedItem?.label || ''"></moduleTitle>
  <div class="container">
    <div v-for="item in list" :key="item._id" class="item">
      <span class="title">{{ item.title }}({{ item.des }})</span>
      <div class="hover-area" :style="{cursor: item.title}"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    .item {
      user-select: none;
      flex-shrink: 0;
      margin: 0 20px 20px 0;
      .title {
        font-size: 16px;
        font-weight: 600;
      }
      .hover-area {
        width: 100px;
        height: 100px;
        border: 1px solid;
      }
    }
    
  }
</style>