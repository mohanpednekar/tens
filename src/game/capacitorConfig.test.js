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
