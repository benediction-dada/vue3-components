<!-- 
/**
 * @author yuda
 * @description 主要页面的根页面
 */ 
-->

<script setup lan="scss">
import TopNav from './componnets/TopNav.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <main>
    <!-- 导航条 -->
    <TopNav></TopNav>
    <!-- 主项目页面 -->
    <section v-if="!route.meta.isMiniServer">
      <router-view></router-view>
    </section>
    <!-- 微服务页面 -->
    <section v-if="route.meta.isMiniServer">
      <div id="frameContainer"></div>
    </section>
  </main>
</template>