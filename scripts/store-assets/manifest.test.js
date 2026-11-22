import { DEVICES, FEATURE_GRAPHIC, SCENES, pixelSize, screenshotPath, seedFor } from './manifest.mjs'
import { NAVIGATION } from '../lib/capture.mjs'

// Store rules the generated images must satisfy (Play Console / App Store Connect upload checks).
const APP_STORE_SIZES = { iphone69: [1320, 2868], iphone65: [1284, 2778], ipad13: [2064, 2752] }

describe('store-assets manifest', () => {
  test.each(DEVICES.filter(device => device.store === 'play'))('Play $id screenshots fit Play limits', device => {
    const { width, height } = pixelSize(device)
    for (const side of [width, height]) {
      expect(Number.isInteger(side)).toBe(true)
      expect(side).toBeGreaterThanOrEqual(1080) // ≥ 1080 px keeps the listing eligible for featuring
      expect(side).toBeLessThanOrEqual(3840)
    }
    expect(Math.max(width, height) / Math.min(width, height)).toBeLessThanOrEqual(2)
  })

  test.each(DEVICES.filter(device => device.store === 'appstore'))('App Store $id screenshots are an accepted size', device => {
    const { width, height } = pixelSize(device)
    expect([width, height]).toEqual(APP_STORE_SIZES[device.id])
  })

  test('Play needs 2–8 screenshots per device and App Store up to 10', () => {
    expect(SCENES.length).toBeGreaterThanOrEqual(2)
    expect(SCENES.length).toBeLessThanOrEqual(8)
  })

  test('every scene has a reachable page and a valid save', () => {
    for (const scene of SCENES) {
      expect(NAVIGATION[scene.page]).toBeDefined()
      expect(seedFor(scene).saveSchemaVersion).toBe(3)
    }
  })

  test('paths follow fastlane supply / deliver layouts and never collide', () => {
    const paths = DEVICES.flatMap(device => SCENES.map((scene, index) => screenshotPath(device, scene, index)))
    expect(new Set(paths).size).toBe(paths.length)
    expect(screenshotPath(DEVICES[0], SCENES[0], 0)).toBe('fastlane/metadata/android/en-US/images/phoneScreenshots/1_factory.png')
    expect(FEATURE_GRAPHIC).toMatchObject({ width: 1024, height: 500 })
  })
})
