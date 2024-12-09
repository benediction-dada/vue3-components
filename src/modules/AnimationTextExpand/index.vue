<script setup lang="ts">
import moduleTitle from '../components/moduleTitle.vue'
import useComponnetsStore from '@/pinia/components'
import useMainStore from '@/pinia/main'

const mainStore = useMainStore()
const componentsStore = useComponnetsStore()
const activedItem = computed(() => componentsStore.activedItem)
</script>

<template>
  <moduleTitle type="h5" :title="activedItem?.label || '--'"></moduleTitle>
  <div class="papper">
    <div class="text1">文字展开</div>
  </div>
  <div class="papper">
    <div class="text2">
      <span>氖</span>
      <span class="delay1">灯</span>
      <span class="delay2">效果</span>
    </div>
  </div>
</template>

<style lang="scss" scoped> 
.papper {
  background-color: var(--el-text-color-primary);
  padding: 12px;
  margin-bottom: 20px;
  .text1 {
    color: var(--el-bg-color-page);
    font-size: 32px;
    display: flex;
    justify-content: center;
    animation: text1-expand 2s forwards infinite;
    @keyframes text1-expand {
      0% {
        letter-spacing: -30px;
        filter: blur(10px);
      }
      100% {
        letter-spacing: 10px;
        filter: blur(0);
      }
    }
  }

  .text2 {
    color: var(--el-bg-color-page);
    font-size: 32px;
    display: flex;
    justify-content: center;
    span {
      animation: text2_anim 2s linear forwards;
    }
    .delay1 {
      animation-delay: .2s;
    }
    .delay2 {
      animation-delay: .6s;
    }
    @keyframes text2_anim {
      0% {
        color: #333;
      }
      5%, 15%, 25%, 100% {
        color: var(--el-bg-color-page);
        text-shadow:
          0px 0px 5px #42fff6,
          0px 0px 10px #42fff6,
          0px 0px 20px #42fff6,
          0px 0px 50px #42fff6;
      }
      10%, 20% {
        color: #333;
        text-shadow: none;
      }
    }
  }

}
</style>