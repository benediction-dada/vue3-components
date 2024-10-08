<script lang="ts" setup>
import Menu from './Menu.vue';
import useMainStore from '@/pinia/main'
import { ref, watch } from 'vue';

const mainStore = useMainStore()


let disableClickOut = true; // 防止展开按钮展开也触发clickout
const showLeftMenu = ref(true) // 初始进入小屏幕状态是隐藏侧边栏（为了隐藏css变化过程）
const expandMenu = ref(false) // 侧边栏折叠状态

// 初始化
const init = () => {
  showLeftMenu.value = !mainStore.isSmallScreen
}

// 侧边栏开关
const menuExpandClick = () => {
  showLeftMenu.value = true
  expandMenu.value = !expandMenu.value

  setTimeout(() => {
    disableClickOut = false
  }, 200)
}

// 点击侧边栏外部要折叠
const clickOutsideHandler = () => {
  if(!disableClickOut && expandMenu.value) {
    expandMenu.value = false
    disableClickOut = true
  }
}

// 窗口监听
watch(() => mainStore.isSmallScreen, (newVal) => {
  if(newVal) {
    // 小屏幕初始化
    showLeftMenu.value = false
    expandMenu.value = false
    disableClickOut = true
  } else {
    // 大屏幕初始化
    showLeftMenu.value = true
  }
})

init()
</script>
<template>
  <!-- 侧边栏 -->
  <aside v-show="showLeftMenu" v-click_outside="clickOutsideHandler" :class="{
    'aside-fold': mainStore.isSmallScreen,
    'aside-animation-fold': !expandMenu && mainStore.isSmallScreen,
    'aside-animation-expand': expandMenu && mainStore.isSmallScreen,
    }">
    <Menu></Menu>
  </aside>
  <!-- 侧边栏小屏幕展开按钮块 -->
  <section v-if="mainStore.isSmallScreen">
    <div class="item" @click="menuExpandClick">
      <i class="iconfont icon-menu-menu"></i>
      <span>菜单</span>
    </div>
  </section>
  
</template>

<style lang="scss" scoped>
  // 侧边栏基础样式
  aside {
    flex-shrink: 0;
    width: var(--aside-bar-width);
    height: 100%;
    background-color: var(--nav-bg-fill);
    transform: translateX(0);
    z-index: 1;
  }
  // 侧边栏收起样式（小屏幕初始化）
  // .aside-fold {
  //   transform: translateX(-600px)
  // }
  
  // 侧边栏折叠动画
  .aside-animation-fold {
    animation: leftmenu_fold;
    animation-fill-mode: forwards;
    animation-duration: .5s;
  }
  // 侧边栏展开动画
  .aside-animation-expand {
    animation: leftmenu_expand;
    animation-fill-mode: forwards;
    animation-duration: .5s;
  }

  // 侧边栏收起样式 （包含600px）(侧边栏浮起样式)
  @media (max-width: 600px) {
    aside {
      position: fixed;
      top: 0;
      height: 100vh;
      transform: translateX(-600px);
      box-shadow: var(--box-showdow-right-bottom);
    }
  }

  // 侧边栏收起动画
  @keyframes leftmenu_fold {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-600px);
    }
  }
  // 侧边栏收起动画
  @keyframes leftmenu_expand {
    0% {
      transform: translateX(-600px);
    }
    100% {
      transform: translateX(0);
    }
  }

  section {
    flex-shrink: 0;
    height: 50px;
    width: 100%;
    border: 1px solid var(--grey-7);
    display: flex;
    align-items: center;
    padding: 0 32px;
    .item {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
      i {
        display: inline-block;
        width: 30px;
      }
    }
  }
</style>