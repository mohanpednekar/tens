import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import capacitorConfig, { ADS_PLUGIN, IAP_PLUGIN, buildIncludePlugins } from '../../capacitor.config.js'
import { buildFeaturesModule, createViteConfig, resolveFeatureFlags } from '../../viteConfigFactory.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

function pluginNames(config) {
  return config.plugins.flat(Infinity).map((plugin) => plugin && plugin.name)
}

describe('Capacitor foundation (#70)', () => {
  it('ships a capacitor.config.js aimed at the Vite dist/ output', () => {
    expect(capacitorConfig.appId).toBe('com.mohanpednekar.tens')
    expect(capacitorConfig.appName).toBe('Tens')
    expect(capacitorConfig.webDir).toBe('dist')
    expect(capacitorConfig.plugins.SystemBars.insetsHandling).toBe('native')
  })

  it('only syncs the AdMob / RevenueCat native SDKs when their flag is on', () => {
    expect(buildIncludePlugins({})).toEqual(['@capacitor/splash-screen'])
    expect(buildIncludePlugins({ VITE_TENS_ADS_ENABLED: 'true' })).toContain(ADS_PLUGIN)
    expect(buildIncludePlugins({ VITE_TENS_ADS_ENABLED: 'true' })).not.toContain(IAP_PLUGIN)
    expect(buildIncludePlugins({ VITE_TENS_IAP_ENABLED: 'true' })).toEqual(['@capacitor/splash-screen', IAP_PLUGIN])
  })

  it('uses a relative base and omits VitePWA when capacitor builds are requested', () => {
    const pages = createViteConfig({ capacitor: false })
    const native = createViteConfig({ capacitor: true })

    expect(pages.base).toBe('/tens/')
    expect(pluginNames(pages)).toContain('vite-plugin-pwa')

    expect(native.base).toBe('./')
    expect(pluginNames(native)).not.toContain('vite-plugin-pwa')
  })

  it('keeps the apple-touch-icon href base-relative so CAPACITOR builds resolve it', () => {
    const html = readFileSync(join(root, 'index.html'), 'utf8')
    expect(html).toMatch(/href="\.\/apple-touch-icon\.png"/)
    expect(html).not.toMatch(/href="\/tens\/apple-touch-icon\.png"/)
  })

  it('never enables ads or purchases outside a Capacitor build', () => {
    const env = { VITE_TENS_ADS_ENABLED: 'true', VITE_TENS_IAP_ENABLED: 'true' }
    expect(resolveFeatureFlags({ capacitor: false, env })).toMatchObject({ ADS_ENABLED: false, IAP_ENABLED: false })
    expect(resolveFeatureFlags({ capacitor: true, env })).toMatchObject({ ADS_ENABLED: true, IAP_ENABLED: true })
    expect(resolveFeatureFlags({ capacitor: true, env: {} })).toMatchObject({ ADS_ENABLED: false, IAP_ENABLED: false, CLOUD_SAVE_ENABLED: false })
  })

  it('emits no import of a disabled feature', () => {
    const off = buildFeaturesModule(resolveFeatureFlags({ capacitor: false }), '/src')
    expect(off).not.toMatch(/import\(/)
    expect(off).toContain('export const loadAdsModule = null')
    const on = buildFeaturesModule(resolveFeatureFlags({
      capacitor: true,
      env: { VITE_TENS_ADS_ENABLED: 'true', VITE_FIREBASE_API_KEY: 'k', VITE_FIREBASE_PROJECT_ID: 'p', VITE_FIREBASE_APP_ID: 'a' },
    }), '/src')
    expect(on).toContain('admobAdapter.js')
    expect(on).toContain('firebaseBackend.js')
    expect(on).toContain('export const loadIapModule = null')
  })
})

describe('Android release configuration', () => {
  const read = file => readFileSync(join(root, file), 'utf8')

  it('targets and compiles against API 36', () => {
    const vars = read('android/variables.gradle')
    expect(vars).toMatch(/compileSdkVersion = 36/)
    expect(vars).toMatch(/targetSdkVersion = 36/)
  })

  it('minifies release builds and signs them only from externally supplied credentials', () => {
    const gradle = read('android/app/build.gradle')
    expect(gradle).toMatch(/release \{\s*minifyEnabled true\s*shrinkResources true/)
    for (const key of ['TENS_UPLOAD_STORE_FILE', 'TENS_UPLOAD_STORE_PASSWORD', 'TENS_UPLOAD_KEY_ALIAS', 'TENS_UPLOAD_KEY_PASSWORD']) {
      expect(gradle).toContain(`releaseSetting('${key}')`)
    }
    const ignored = read('.gitignore')
    for (const pattern of ['*.keystore', '*.jks', 'android/keystore.properties']) expect(ignored).toContain(pattern)
  })

  it('declares no permission beyond INTERNET', () => {
    const manifest = read('android/app/src/main/AndroidManifest.xml')
    expect([...manifest.matchAll(/<uses-permission android:name="([^"]+)"/g)].map(m => m[1])).toEqual(['android.permission.INTERNET'])
  })
})


describe('Dev build config', () => {
  it('serves from /tens/dev/, forces DEV on, and skips the service worker', () => {
    const dev = createViteConfig({ capacitor: false, devBuild: true })
    expect(dev.base).toBe('/tens/dev/')
    expect(dev.define).toEqual({ 'import.meta.env.DEV': 'true', 'import.meta.env.VITE_TENS_STORAGE_PREFIX': '"dev:"', 'import.meta.env.VITE_TENS_DEV_BUILD': '"1"' })
    expect(pluginNames(dev)).not.toContain('vite-plugin-pwa')
  })

  it('leaves the production build untouched and keeps its service worker off /tens/dev/', () => {
    const prod = createViteConfig({ capacitor: false, devBuild: false })
    expect(prod.base).toBe('/tens/')
    expect(prod.define).toBeUndefined()
    expect(pluginNames(prod)).toContain('vite-plugin-pwa')
  })
})
