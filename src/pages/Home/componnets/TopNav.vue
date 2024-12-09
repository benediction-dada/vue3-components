<script lang="ts" setup>
  import useMainStore from '@/pinia/main.ts'
  import { MenuItem } from '@/types/main.ts'
  const mainStore = useMainStore()
  const router = useRouter()

  const menuList = mainStore.menuList
  
  const changeMenu = (item: MenuItem) => {
    mainStore.activeMenu = item
    router.push({ path: item.path })
  }
</script>
<template>
  <nav>
    <div class="left"></div>
    <div class="right">
      <!-- 菜单 -->
      <div 
      v-for="menu in menuList"
      :key="menu.id"
      class="item"
      :class="{actived: mainStore?.activeMenu?.path === menu.path}"
      @click="changeMenu(menu)">
        {{ menu.label }}
      </div>
      <!-- 主题开关 -->
      <el-switch
        v-model="mainStore.themeType"
        active-value="light"
        inactive-value="dark">
        <!-- light -->
        <template #active-action>
          <i class="iconfont icon-sun"></i>
        </template>
        <!-- dark -->
        <template #inactive-action>
          <i class="iconfont icon-moono"></i>
        </template>
      </el-switch>
      <!-- github链接 -->
      <div class="btn">
        <i class="iconfont icon-github"></i>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 55px;
  border-bottom: 1px solid var(--grey-b);
  color: var(--grey-7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  color: var(--el-text-color-primary);
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
      white-space: nowrap;
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
    .el-switch {
      height: 100%;
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
