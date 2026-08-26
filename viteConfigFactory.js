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
 *
 * `netlifyStaging` (from `VITE_ENABLE_DEV_MODE`, read by `yarn build:staging` — see
 * CLAUDE.md's "Dev Mode" section) produces the dev-mode-enabled staging build deployed
 * separately to Netlify (own domain, own HTTP Basic Auth via a Netlify Edge Function —
 * see netlify.toml/netlify/edge-functions/), not a GitHub Pages subpath — Netlify serves
 * from its own root, so base is `/`, not `/tens/`. The staging build's own manifest
 * name/theme differ so an installed PWA icon doesn't look identical to the real app's on
 * a phone home screen.
 */
export function createViteConfig({
  capacitor = process.env.CAPACITOR === '1',
  netlifyStaging = process.env.VITE_ENABLE_DEV_MODE === 'true',
  srcPath = path.resolve('src'),
} = {}) {
  const base = capacitor ? './' : netlifyStaging ? '/' : '/tens/'
  return {
    base,
    plugins: [
      react(),
      ...(capacitor
        ? []
        : [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
              manifest: {
                name: netlifyStaging ? 'Tens (Dev)' : 'Tens',
                short_name: netlifyStaging ? 'Tens Dev' : 'Tens',
                description: 'Tens incremental game — every mechanic themed around powers of ten.',
                display: 'standalone',
                theme_color: netlifyStaging ? '#7c2d12' : '#0c0d11',
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
