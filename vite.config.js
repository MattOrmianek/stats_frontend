import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
