<script lang="ts" setup>
  import useMainStore from '@/pinia/main'
  import { MenuItem } from '@/types/main.ts'
  const mainStore = useMainStore()
  const menuList = mainStore.menuList

  // 默认选中菜单
  let activeMenu = menuList.find((menu:MenuItem) => menu.router === '/overview')
</script>
<template>
  <header>
    <div class="left"></div>
    <div class="right">
      <div 
      v-for="menu in menuList" :key="menu.id" class="item" :class="{actived: activeMenu.router === menu.router}">
        {{ menu.label }}
      </div>
      <div class="btn">
        <i class="iconfont icon-github"></i>
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  height: 55px;
  border: 1px solid var(--grey-7);
  border-left: 0;
  border-right: 0;
  color: var(--grey-7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  .left {
    min-width: 300px;
    height: 100%;
  }
  .right {
    height: 100%;
    display: flex;
    .item {
      display: flex;
      flex-shrink: 1;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: fit-content;
      padding: 12px;
      cursor: pointer;
      position: relative;
      &:hover {
        color: var(--primary);
      }
    }
    .actived {
      color: var(--primary);
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 100%;
        border-bottom: 3px solid var(--primary);
      }
    }
    .btn {
      display: flex;
      height: 100%;
      max-width: calc(100vw - 100px);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 0 12px;
      &:hover {
        color: var(--primary);
      }
    }
  }
}
</style>
