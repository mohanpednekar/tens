import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  base: '/tens/',
  plugins: [react()],
  resolve: {
    alias: {
      components: path.join(srcPath, 'components'),
      game: path.join(srcPath, 'game'),
      pages: path.join(srcPath, 'pages'),
    },
  },
  server: {
    host: '127.0.0.1',
  },
  preview: {
    host: '127.0.0.1',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
