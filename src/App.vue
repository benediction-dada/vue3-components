<script setup lang="ts">
import { onUnmounted } from 'vue';
import useMainStore from '@/pinia/main'
import useComponentsStore from '@/pinia/components'

const mainStore = useMainStore()
const componentsStore = useComponentsStore()



// 初始化主仓库
mainStore.init()
// 初始化组件仓库
componentsStore.init()


// 销毁
onUnmounted(() => {
  mainStore.destroyed()
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
