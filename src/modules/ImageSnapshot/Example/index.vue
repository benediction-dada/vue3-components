<script lang="ts" setup>
/**
 * 截图组件 包裹内容 
 * 按下快捷键之后， 给插槽添加蒙版 用户可以画矩形进行截图 可以将图片置于页面之上也可以保存进剪贴板
 * 默认快捷键为 shift + x
 * 一个页面只用一个截图组件
 */

type SnapshotState = 'none' | 'start' // 初始状态 | 开始状态 | 

import { onMounted, onUnmounted, ref } from 'vue'
import Masking from './components/Masking.vue';

const _state = ref<SnapshotState>('start') // 截图运行状态

// 案件监听事件
const listenKeyDown = (event: KeyboardEvent) => {
  console.log(event.shiftKey && ['x', 'X'].includes(event.key))
  if(event.shiftKey && ['x', 'X'].includes(event.key)) {
    _state.value = 'start'
  }

  if(_state.value === 'start' && event.key === 'Escape') {
    _state.value = 'none'
  }
}

const init = () => {
  window.addEventListener('keydown', listenKeyDown)
}

const destroy = () => {
  window.removeEventListener('keydown', listenKeyDown)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})


</script>

<template>
  <div class="snapshot-container">
    <slot></slot>
    <Masking v-if="['start'].includes(_state)"></Masking>
  </div>
</template>

<style lang="scss" scoped> 
/**
 * 层级
    蒙版： 9999
    工具栏 提示等： 10000
 */

.snapshot-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>