import path from 'node:path'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export const FEATURES_MODULE_ID = 'virtual:tens-features'

/**
 * Which optional features this build compiles in. Ads and IAP need a native (Capacitor) build AND
 * their flag; cloud save needs a Firebase web config. Everything defaults to off.
 */
export const resolveFeatureFlags = ({ capacitor = false, env = {} } = {}) => ({
  IS_NATIVE_BUILD: capacitor,
  ADS_ENABLED: capacitor && env.VITE_TENS_ADS_ENABLED === 'true',
  IAP_ENABLED: capacitor && env.VITE_TENS_IAP_ENABLED === 'true',
  CLOUD_SAVE_ENABLED: Boolean(env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID && env.VITE_FIREBASE_APP_ID),
})

/**
 * Source of the `virtual:tens-features` module: the flags as literals plus one loader per optional
 * feature, emitted as a dynamic import only when that feature is on. A disabled feature's loader is
 * `null`, so its code (AdMob, RevenueCat, Firebase, the native splash plugin) is never referenced
 * and never bundled — dead-code elimination of `if (false) import()` alone still emits the chunk.
 */
const UNSAFE_IN_SCRIPT = { '<': '\\u003C', '>': '\\u003E', '/': '\\u002F', '\u2028': '\\u2028', '\u2029': '\\u2029' }

// JSON string literal that is also safe to splice into generated JS (no `</script>`, no raw line
// separators) — the module path comes from the filesystem, so treat it as untrusted text.
const toSafeStringLiteral = value => JSON.stringify(String(value)).replace(/[<>/\u2028\u2029]/g, char => UNSAFE_IN_SCRIPT[char])

export const buildFeaturesModule = (flags, srcPath) => {
  const lazy = (on, file) => (on ? `() => import(${toSafeStringLiteral(path.join(srcPath, file))})` : 'null')
  return [
    ...Object.entries(flags).map(([name, value]) => `export const ${name} = ${value === true}`),
    `export const loadAdsModule = ${lazy(flags.ADS_ENABLED, 'services/monetization/admobAdapter.js')}`,
    `export const loadIapModule = ${lazy(flags.IAP_ENABLED, 'services/monetization/revenueCatAdapter.js')}`,
    `export const loadCloudSaveModule = ${lazy(flags.CLOUD_SAVE_ENABLED, 'services/cloudSave/firebaseBackend.js')}`,
    `export const loadSplashScreenModule = ${flags.IS_NATIVE_BUILD ? "() => import('@capacitor/splash-screen')" : 'null'}`,
  ].join('\n')
}

const tensFeaturesPlugin = (flags, srcPath) => ({
  name: 'tens-features',
  resolveId: id => (id === FEATURES_MODULE_ID ? `\0${FEATURES_MODULE_ID}` : null),
  load: id => (id === `\0${FEATURES_MODULE_ID}` ? buildFeaturesModule(flags, srcPath) : null),
})

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
  devBuild = process.env.TENS_DEV_BUILD === '1',
  srcPath = path.resolve('src'),
  env = process.env,
} = {}) {
  const features = resolveFeatureFlags({ capacitor, env })
  // Dev build (`yarn build:dev`): a production-optimized bundle with `import.meta.env.DEV` forced
  // true, so Dev Mode ships in it. Served from `/tens/dev/` beside the production site; no service
  // worker, so it can never cache-shadow or be shadowed by the production PWA.
  return {
    base: capacitor ? './' : devBuild ? '/tens/dev/' : '/tens/',
    ...(devBuild ? { define: { 'import.meta.env.DEV': 'true' } } : {}),
    plugins: [
      react(),
      tensFeaturesPlugin(features, srcPath),
      ...(capacitor || devBuild
        ? []
        : [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
              // The policy pages are standalone documents, never the SPA shell.
              workbox: {
                navigateFallbackDenylist: [/\/privacy\.html$/, /\/terms\.html$/, /^\/tens\/dev\//],
              },
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
        services: path.join(srcPath, 'services'),
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
