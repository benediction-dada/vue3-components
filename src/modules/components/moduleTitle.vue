<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: 'h5' // h1 h2 h3 h4 h5
    },
    title: {
      type: String,
      default: '--'
    }
  })

</script>

<template>
  <div class="module-title" :class="{ [props.type]: true }">{{ props.title }}</div>
</template>

<style lang="scss">
.module-title {
  font-size: 36px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.h5 {
  font-size: 32px;
}
</style>