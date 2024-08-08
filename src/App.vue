<script setup lang="ts">
import { onUnmounted } from 'vue';
import useMainStore from './pinia/main'

const mainStore = useMainStore()


// 初始化菜单
mainStore.init()


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
