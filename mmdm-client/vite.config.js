import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  base: '/mmdm/',

  build: {
    rollupOptions: {
      external: [
        /^img\/.*/
      ],
    },
    outDir: '../static/mmdm',
  },
})
