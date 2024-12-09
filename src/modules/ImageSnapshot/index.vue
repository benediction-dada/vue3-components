<script setup lang="ts">
import moduleTitle from '../components/moduleTitle.vue'
import useComponnetsStore from '@/pinia/components'
import useMainStore from '@/pinia/main'
import Example from './Example/index.vue'

const mainStore = useMainStore()
const componentsStore = useComponnetsStore()
const activedItem = computed(() => componentsStore.activedItem)


</script>

<template>
  <moduleTitle type="h5" :title="activedItem?.label || '--'"></moduleTitle>
  
  <Example>
    <div class="contain"></div>
  </Example>
</template>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 600px;
  background-image: url('/page.png');
}
</style>