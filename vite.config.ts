import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
  plugins: [
    vueJsx({
      babelPlugins: [
        [
          'component',
          {
            libraryName: 'element-plus',
            styleLibraryName: '~theme/lib'
          }
        ]
      ]
    })
  ],
  resolve: {
    alias: {
      '@platform': resolve(__dirname, 'src/base-platform'),
      '@plugin': resolve(__dirname, 'src/base-plugin')
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
  }
})
