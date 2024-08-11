<script lang="ts" setup>
  import TopNav from './componets/TopNav.vue';
  import LeftMenu from './componets/LeftMenu/index.vue';
  import Content from './componets/Content/index.vue'

</script>

<template>
  <!-- 导航条 -->
  <top-nav></top-nav>

  <!-- 内容部分 -->
  <main>
    <LeftMenu></LeftMenu>
    <Content></Content>
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: calc(100vh - 55px);
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
</style>