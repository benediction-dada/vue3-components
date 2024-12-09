import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import { resolve } from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'// 指定api 避免The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      }
    },
  },
  plugins: [
    // vue 语法
    vue(),
    // 自动按需导入 API
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/types/auto/auto-imports.d.ts"
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  server: {
    port: 7012
  },
})
