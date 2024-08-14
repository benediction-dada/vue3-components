<script setup lang="ts">
import { onUnmounted,watch } from 'vue';
import useMainStore from '@/pinia/main'
import useComponentsStore from '@/pinia/components'
import { ThemeType } from './types/main';
import '@/assets/theme/light.scss'

const mainStore = useMainStore()
const componentsStore = useComponentsStore()

// 初始化主仓库
mainStore.init()
// 初始化组件仓库
componentsStore.init()

watch(() => mainStore.themeType, (newVal) => {
  themeChange(newVal) // 主题切换
})

const themeChange = async (themeType:ThemeType) => {
  // 这里写主题更换代码
}


// 销毁
onUnmounted(() => {
  mainStore.destroyed()
})
</script>

<template>
    <router-view></router-view>
</template>

<style scoped lang="scss">
</style>
