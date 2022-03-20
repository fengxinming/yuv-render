import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'yuv-view': path.join(__dirname, '../../src')
    },
  },
  plugins: [vue()]
})
