import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  base: '/tens/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Tens',
        short_name: 'Tens',
        description: 'Tens incremental game — every mechanic themed around powers of ten.',
        display: 'standalone',
        theme_color: '#0c0d11',
        background_color: '#0c0d11',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      components: path.join(srcPath, 'components'),
      game: path.join(srcPath, 'game'),
      pages: path.join(srcPath, 'pages'),
      theme: path.join(srcPath, 'theme'),
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
