<script setup lang="ts">
import useMainStore from '@/pinia/main'
import useComponentsStore from '@/pinia/components'
import { ThemeType } from './types/main';

const mainStore = useMainStore() // 主仓库
const componentsStore = useComponentsStore() // 组件仓库



// 初始化主仓库
mainStore.init()
// 初始化组件仓库
componentsStore.init()

watch(() => mainStore.themeType, (newVal) => {
  themeChange(newVal) // 主题切换
})

const themeChange = async (themeType:ThemeType) => {
  mainStore.toggleDark()
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
