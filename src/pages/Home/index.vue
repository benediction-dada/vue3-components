<!-- 
/**
 * @author yuda
 * @description 主要页面的根页面
 */ 
-->

<script setup lan="scss">
import TopNav from './componnets/TopNav.vue';
import { useRoute } from 'vue-router'
</script>
<template>
  <main>
    <!-- 导航条 -->
    <TopNav></TopNav>
    <section>
      <router-view></router-view>
    </section>
  </main>
</template>