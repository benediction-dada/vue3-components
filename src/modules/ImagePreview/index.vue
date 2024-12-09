<script setup lang="ts">
import { Plus, ZoomIn } from '@element-plus/icons-vue'
import moduleTitle from '../components/moduleTitle.vue'
import Example from './Example/index.vue'
import useComponnetsStore from '@/pinia/components'
import useMainStore from '@/pinia/main'
const mainStore = useMainStore()
const componentsStore = useComponnetsStore()
let activedItem = componentsStore.activedItem


//  举例
const dialog = reactive({
  show: false,
  title: '预览图片',
  url: ''
})
const preview = (file: any) => {
  dialog.show = true
  dialog.url = file.url
}

</script>
<template>
  <moduleTitle type="h5" :title="activedItem?.label"></moduleTitle>
  <!-- 使用案例 -->
  <!-- 外层给个容器(图片预览块跟随容器大小改变) -->
  <div style="height: 400px; margin-bottom: 24px;">
    <Example></Example>
  </div>
  <hr>
  <moduleTitle type="h4" title="使用案例"></moduleTitle>
  <!-- 使用案例 -->
  <el-upload action="#" list-type="picture-card" :auto-upload="false">
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="preview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialog.show" title="图片预览" width="60%">
    <div style="height: 60vh;" v-if="dialog.show">
      <Example :imageUrl="dialog.url"></Example>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>