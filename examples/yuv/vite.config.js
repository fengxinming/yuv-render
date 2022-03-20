import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir:  path.join(__dirname, '../../docs'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'yuv-view': path.join(__dirname, '../../src')
    },
  },
})
