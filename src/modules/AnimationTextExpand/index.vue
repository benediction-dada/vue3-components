<script setup lang="ts">
import { computed } from 'vue';
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
    <div class="text">文字展开</div>
  </div>
</template>

<style lang="scss" scoped> 
.papper {
  background-color: var(--el-text-color-primary);
  padding: 12px;

  .text {
    color: var(--el-bg-color-page);
    font-size: 32px;
    display: flex;
    justify-content: center;
    animation: text-expand 2s forwards infinite;
  }

  @keyframes text-expand {
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
</style>