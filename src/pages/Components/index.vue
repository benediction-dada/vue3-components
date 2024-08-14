

<script lang="ts" setup>
  import LeftMenu from './componets/LeftMenu/index.vue';
  import Content from './componets/Content/index.vue'

</script>

<template>
  <!-- 组件内容部分 -->
  <article>
    <LeftMenu></LeftMenu>
    <Content></Content>
  </article>
</template>
<style lang="scss" scoped>
  article {
    height: calc(100vh - 55px);
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
</style>