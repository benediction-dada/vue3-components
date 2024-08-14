<script setup lang="ts">
import useComponnetsStore from '@/pinia/components';
const mainStore = useComponnetsStore()
const menus = mainStore.menus

</script>
<template>
  <!-- 菜单列表（不折叠， 组名不可点击） -->
  <div class="menu-list">
    <div v-for="menuGroup in menus" :key="menuGroup.id" class="group">
      <!-- 标题 -->
      <div class="title">
        <span>{{ menuGroup.label }}</span>
        <span>（{{ menuGroup.name }}）</span>
      </div>
      <!-- 列表 -->
       <div class="item" :class="{ 'active_item': menu.id === mainStore.actived }" v-for="menu in menuGroup.children" :key="menu.id">
        <span>{{ menu.label }}</span>
       </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menu-list {
    color: var(--el-color-black);
    padding: 10px 20px;
    .group {
      padding-top: 24px;
      .title {
        font-size: var(--ft_large);
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 24px;
      }
      .item {
        padding: 10px 16px;
        line-height: 1.5;
        font-size: var(--ft_normal);
        cursor: pointer;
        &:hover {
          color: var(--primary);
        }
      }
      .active_item {
        color: var(--primary);
      }
    }
  }
</style>