import path from 'node:path'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Build the Vite config object. Kept separate from `vite.config.js` so tests can
 * pin the CAPACITOR=1 behavior (relative base, no VitePWA) without loading Vite's
 * config entry (whose `import.meta.url` is not a file: URL under Vitest).
 *
 * Capacitor wraps `dist/` under a capacitor:// / https-local origin. The GitHub Pages
 * base (`/tens/`) and the Workbox service worker are wrong for that shell — use a
 * relative base and skip the PWA plugin when capacitor is true (native already ships
 * assets locally; see #70).
 */
export function createViteConfig({
  capacitor = process.env.CAPACITOR === '1',
  srcPath = path.resolve('src'),
} = {}) {
  return {
    base: capacitor ? './' : '/tens/',
    plugins: [
      react(),
      ...(capacitor
        ? []
        : [
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
          ]),
    ],
    resolve: {
      alias: {
        components: path.join(srcPath, 'components'),
        game: path.join(srcPath, 'game'),
        pages: path.join(srcPath, 'pages'),
        theme: path.join(srcPath, 'theme'),
        'save-migration': path.join(srcPath, 'save-migration'),
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
  }
}
