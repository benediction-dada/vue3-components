<!-- 
/**
 * @author yuda
 * @description 主要页面的根页面
 */ 
-->

<script setup lan="scss">
import TopNav from './componnets/TopNav.vue';
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
      <div id="3d-frame-container"></div>
    </section>
  </main>
</template>