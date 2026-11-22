import { DEVICES, FEATURE_GRAPHIC, SCENES, pixelSize, screenshotPath } from './manifest.mjs'
import { playFreshSave, withPendingAchievement } from './seeds.mjs'
import { NAVIGATION } from '../lib/capture.mjs'
import { isAchievementConditionMet } from '../../src/game/engine.js'
import { ACHIEVEMENT_DEFINITIONS } from '../../src/game/layers.js'

// Store rules the generated images must satisfy (Play Console / App Store Connect upload checks).
const APP_STORE_SIZES = {
  iphone63: [1206, 2622], iphone69: [1320, 2868], iphone65: [1284, 2778],
  'duo-outer': [1398, 2034], 'duo-inner': [2007, 2853], ipad13: [2064, 2752],
}
const FOLDABLE_RATIOS = { 'fold-inner-3x4': 3 / 4, 'fold-inner-1x1': 1, 'fold-outer-10x16': 10 / 16 }
const SEED_KEYS = ['foundry', 'career', 'achievementUnlock']

describe('store-assets manifest', () => {
  test.each(DEVICES.filter(device => device.store === 'play'))('Play $id screenshots are 9:16 within Play limits', device => {
    const { width, height } = pixelSize(device)
    expect(width * 16).toBe(height * 9)
    for (const side of [width, height]) {
      expect(side).toBeGreaterThanOrEqual(1080) // ≥ 1080 px keeps the listing eligible for featuring
      expect(side).toBeLessThanOrEqual(3840)
    }
  })

  test.each(DEVICES.filter(device => device.store === 'play-foldable'))('Play foldable $id has its required aspect ratio', device => {
    const { width, height } = pixelSize(device)
    expect(width / height).toBeCloseTo(FOLDABLE_RATIOS[device.id], 6)
    expect(Math.max(width, height)).toBeLessThanOrEqual(3840)
  })

  test.each(DEVICES.filter(device => device.store === 'appstore'))('App Store $id screenshots are an accepted size', device => {
    expect(Object.values(pixelSize(device))).toEqual(APP_STORE_SIZES[device.id])
  })

  test('every device renders at whole pixels from its real viewport', () => {
    for (const device of DEVICES) {
      expect(Number.isInteger(device.width * device.scale)).toBe(true)
      expect(Number.isInteger(device.height * device.scale)).toBe(true)
    }
  })

  test('3–8 scenes (Play: 2–8 phone, 3 foldable; App Store ≤ 10), each reachable with a known seed', () => {
    expect(SCENES.length).toBeGreaterThanOrEqual(3)
    expect(SCENES.length).toBeLessThanOrEqual(8)
    for (const scene of SCENES) {
      expect(NAVIGATION[scene.page]).toBeDefined()
      expect(SEED_KEYS).toContain(scene.seed)
    }
  })

  test('only the achievements scene shows unlock toasts', () => {
    expect(SCENES.filter(scene => scene.showToasts).map(scene => scene.page)).toEqual(['achievements'])
  })

  test('paths follow fastlane supply / deliver layouts and never collide', () => {
    const paths = DEVICES.flatMap(device => SCENES.map((scene, index) => screenshotPath(device, scene, index)))
    expect(new Set(paths).size).toBe(paths.length)
    expect(screenshotPath(DEVICES[0], SCENES[0], 0)).toBe('fastlane/metadata/android/en-US/images/phoneScreenshots/1_factory.png')
    expect(FEATURE_GRAPHIC).toMatchObject({ width: 1024, height: 500 })
  })
})

describe('store-assets seeds', () => {
  test('a played fresh save is a real, current-schema save past the first Ping', () => {
    const state = playFreshSave(120)
    expect(state.saveSchemaVersion).toBe(3)
    expect(state.intro.capacity).toBeGreaterThan(0)
  })

  test('withPendingAchievement un-earns the latest earned achievement whose condition still holds', () => {
    const state = playFreshSave(1500)
    const earned = Object.keys(state.achievements.earned)
    const byId = Object.fromEntries(ACHIEVEMENT_DEFINITIONS.map(def => [def.id, def]))
    const qualifying = earned.filter(id => byId[id] && isAchievementConditionMet(state, byId[id].condition))
    expect(qualifying.length).toBeGreaterThan(0)
    const pending = withPendingAchievement({ state, earnedOrder: earned })
    const removed = earned.filter(id => !pending.achievements.earned[id])
    expect(removed).toEqual([qualifying.at(-1)])
  })
})
