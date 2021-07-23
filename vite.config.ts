import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import componentImport from 'vite-plugin-imp'
import { resolve } from 'path'

const host = 'localhost'
const port = 3000
const baseUrl = '/'
const outputDir = 'dist'

const proxy = {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  envDir: resolve(__dirname, 'env'),
  plugins: [
    vue(),
    vueJsx(),
    componentImport({
      libList: [
        {
          libName: 'element-plus',
          style(name) {
            return `theme/lib/${name}.css`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@platform': resolve(__dirname, 'src/base-platform'),
      '@plugin': resolve(__dirname, 'src/base-plugin'),
      theme: resolve(__dirname, 'theme')
    }
  },
  base: baseUrl,
  server: {
    host,
    port,
    proxy
  },
  build: {
    outDir: outputDir
  },
  define: {
    process: {
      env: { ...process.env }
    }
  }
})
