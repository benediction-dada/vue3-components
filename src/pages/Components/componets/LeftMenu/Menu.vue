<script setup lang="ts">
import useComponnetsStore from '@/pinia/components';
import { componentsItem } from '@/types/components';
const componentsStore = useComponnetsStore()
const menus = componentsStore.menus

const changeModule = (item:componentsItem) => {
  componentsStore.set_actived(item.id)
}

</script>
<template>
  <!-- 菜单列表（不折叠， 组名不可点击） -->
  <div class="menu-list">
    <div v-for="componentsGroup in menus" :key="componentsGroup.id" class="group">
      <!-- 标题 -->
      <div class="title">
        <span>{{ componentsGroup.label }}</span>
        <span>（{{ componentsGroup.name }}）</span>
      </div>
      <!-- 列表 -->
       <div class="item"
        :class="{ 'active_item': component.id === componentsStore.actived }"
        v-for="component in componentsGroup.children" :key="component.id"
        @click="() => changeModule(component)">
        <span>{{ component.label }}</span>
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
        color: var(--el-text-color-primary);
        font-size: var(--ft_large);
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 24px;
      }
      .item {
        padding: 10px 16px;
        line-height: 1.5;
        font-size: var(--ft_normal);
        color: var(--el-text-color-primary);
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