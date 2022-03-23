import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/yuv-view/',
  build: {
    outDir: path.join(__dirname, '../../docs'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'yuv-view': path.join(__dirname, '../../src')
    },
  },
  server: {
    fs: {
      allow: [
        path.join(__dirname, '../..')
      ]
    }
  }
})
