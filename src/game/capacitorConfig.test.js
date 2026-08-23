import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

describe('Capacitor foundation (#70)', () => {
  it('ships a capacitor.config.json aimed at the Vite dist/ output', () => {
    const config = JSON.parse(readFileSync(join(root, 'capacitor.config.json'), 'utf8'))
    expect(config.appId).toBe('com.mohanpednekar.tens')
    expect(config.appName).toBe('Tens')
    expect(config.webDir).toBe('dist')
  })
})
