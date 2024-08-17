<script lang="ts" setup>
  import useComponnetsStore from '@/pinia/components'
  import useMainStore from '@/pinia/main'
  const mainStore = useMainStore()
  const componentsStore = useComponnetsStore()
  

</script>
<template>
  <article>
    <section>

    </section>
    <aside >

    </aside>
  </article>
</template>

<style lang="scss" scoped>
  article {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 20px;
    color: var(--el-text-color-primary);
    display: flex;
    section {
      height: 100%;
      flex: 1;
    }
    aside {
      height: 100%;
      width: 300px;
      border: 1px solid;
    }
    @media (max-width: 1400px) {
      aside {
        display: none;
      }
    }
  }
</style>