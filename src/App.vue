<script setup lang="ts">
import useMainStore from './pinia/main'

const mainStore = useMainStore()

mainStore.init_menuList()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
