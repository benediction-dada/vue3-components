<script setup>
import moduleTitle from '../components/moduleTitle.vue'
import Example from './Example/index.vue'
import useComponnetsStore from '@/pinia/components'
import useMainStore from '@/pinia/main'
const mainStore = useMainStore()
const componentsStore = useComponnetsStore()
let activedItem = componentsStore.activedItem
</script>
<template>
    <moduleTitle type="h5" :title="activedItem.label"></moduleTitle>

    <!-- 使用案例 -->
    <Example></Example>
</template>

<style>

</style>