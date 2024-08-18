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
</template>

<style lang="scss" scoped> 

</style>