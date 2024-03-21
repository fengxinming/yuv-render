import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/yuv-render/',
  build: {
    outDir: path.join(__dirname, '../../docs'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'yuv-render': path.join(__dirname, '../../src')
    }
  },
  server: {
    fs: {
      allow: [
        path.join(__dirname, '../..')
      ]
    }
  }
});
