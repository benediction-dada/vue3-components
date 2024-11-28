import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'// 指定api 避免The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      }
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  server: {
    port: 7012
  },
})
