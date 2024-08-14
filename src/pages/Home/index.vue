<!-- 
/**
 * @author yuda
 * @description 主要页面的根页面
 */ 
-->

<script setup lan="scss">
import TopNav from './componnets/TopNav.vue';
</script>
<template>
  <main>
    <!-- 导航条 -->
    <TopNav></TopNav>
    <router-view></router-view>
  </main>
</template>