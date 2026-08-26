import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { createViteConfig } from '../../viteConfigFactory.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

function pluginNames(config) {
  return config.plugins.flat(Infinity).map((plugin) => plugin && plugin.name)
}

describe('Capacitor foundation (#70)', () => {
  it('ships a capacitor.config.json aimed at the Vite dist/ output', () => {
    const config = JSON.parse(readFileSync(join(root, 'capacitor.config.json'), 'utf8'))
    expect(config.appId).toBe('com.mohanpednekar.tens')
    expect(config.appName).toBe('Tens')
    expect(config.webDir).toBe('dist')
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
})

describe('Dev Mode staging build (see CLAUDE.md "Dev Mode")', () => {
  it('serves the staging build from root (Netlify\'s own domain), not the GitHub Pages /tens/ base', () => {
    const plain = createViteConfig({ netlifyStaging: false })
    const staging = createViteConfig({ netlifyStaging: true })

    expect(plain.base).toBe('/tens/')
    expect(staging.base).toBe('/')
    // VitePWA still loads for the staging build (only capacitor builds skip it) — its manifest
    // identity is verified by inspecting the actual built dist-staging/manifest.webmanifest
    // (see docs/PWA_REFERENCE.md), not by reaching into vite-plugin-pwa's internal plugin state,
    // which doesn't expose the raw options synchronously.
    expect(pluginNames(staging)).toContain('vite-plugin-pwa')
  })

  it('defaults to the plain /tens/ base when the flag is unset', () => {
    expect(createViteConfig({ netlifyStaging: false }).base).toBe('/tens/')
    expect(createViteConfig({ netlifyStaging: undefined }).base).toBe('/tens/')
  })

  it('capacitor still wins over the staging flag (never combined in practice, but capacitor takes priority)', () => {
    const config = createViteConfig({ capacitor: true, netlifyStaging: true })
    expect(config.base).toBe('./')
  })
})
