// Store-asset manifest (Play + App Store). Pure data + builders, no I/O, so manifest.test.js can
// pin every output size against the stores' rules. generate.mjs captures the real app for each
// device × scene and writes into fastlane's layout (fastlane/metadata/android/…/images for supply,
// fastlane/screenshots/<locale> for deliver, which detects the device class from the pixel size).
import { detectAchievements } from '../../src/game/engine.js'
import { SEEDS } from '../large-screen-mockups/manifest.mjs'

export const LOCALE = 'en-US'

// width/height are CSS px; output = × scale. Tablets use a narrow CSS viewport at a high scale:
// the app is a single phone-width column, so a true tablet viewport leaves it small and centered.
// Sizes are the stores' current required/accepted ones:
// Play: 320–3840 px, long side ≤ 2× short side; App Store: 6.9" 1320×2868 (required for iPhone),
// 6.5" 1284×2778, 13" iPad 2064×2752 (required because TARGETED_DEVICE_FAMILY includes iPad).
export const DEVICES = [
  { id: 'phone', store: 'play', dir: 'phoneScreenshots', width: 360, height: 640, scale: 3 },
  { id: 'tablet7', store: 'play', dir: 'sevenInchScreenshots', width: 400, height: 640, scale: 3 },
  { id: 'tablet10', store: 'play', dir: 'tenInchScreenshots', width: 480, height: 768, scale: 3 },
  { id: 'iphone69', store: 'appstore', width: 440, height: 956, scale: 3 },
  { id: 'iphone65', store: 'appstore', width: 428, height: 926, scale: 3 },
  { id: 'ipad13', store: 'appstore', width: 516, height: 688, scale: 4 },
]

// `store` = the large-screen `mid` save plus a populated Power ladder, so that screen shows a game in progress rather than empty rows. Plain values a real save can hold.
const STORE_SEEDS = {
  ...SEEDS,
  store: () => {
    const state = SEEDS.mid()
    return {
      ...state,
      intro: { ...state.intro, computeCores: 7, computeCoresEverEarned: 60, computeNodes: 5, computeClusters: 3, computeNetworks: 1 },
    }
  },
}

// Order = store display order. `page` is a capture.mjs NAVIGATION id; `seed` a STORE_SEEDS id.
export const SCENES = [
  { id: 'factory', page: 'game', seed: 'store', theme: 'dark' },
  { id: 'foundry', page: 'foundry', seed: 's2', theme: 'dark' },
  { id: 'power', page: 'boosters', seed: 'store', theme: 'dark' },
  { id: 'compute', page: 'compute', seed: 'store', theme: 'dark' },
  { id: 'achievements', page: 'achievements', seed: 'store', theme: 'dark' },
  { id: 'factory-light', page: 'game', seed: 'store', theme: 'light' },
]

// Pre-earn whatever the seed already qualifies for, so no unlock toasts cover the capture.
export const seedFor = scene => detectAchievements(STORE_SEEDS[scene.seed]())

export const pixelSize = device => ({ width: device.width * device.scale, height: device.height * device.scale })

export const screenshotPath = (device, scene, index) => {
  const name = `${index + 1}_${scene.id}.png`
  return device.store === 'play'
    ? `fastlane/metadata/android/${LOCALE}/images/${device.dir}/${name}`
    : `fastlane/screenshots/${LOCALE}/${device.id}_${name}`
}

export const FEATURE_GRAPHIC = { width: 1024, height: 500, path: `fastlane/metadata/android/${LOCALE}/images/featureGraphic.png` }

// Icons are copied, not drawn: both come from `yarn gen-pwa-icons`. App Store Connect takes the
// icon from the build itself; the copy is only for reference/marketing.
export const ICONS = [
  { from: 'public/pwa-512x512.png', to: `fastlane/metadata/android/${LOCALE}/images/icon.png` },
]

export const featureGraphicHtml = ({ fontDir, iconUrl }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Space Grotesk';font-weight:700;src:url('${fontDir}/space-grotesk/files/space-grotesk-latin-700-normal.woff2')}
@font-face{font-family:Inter;font-weight:400;src:url('${fontDir}/inter/files/inter-latin-400-normal.woff2')}
*{margin:0;box-sizing:border-box}
body{width:${FEATURE_GRAPHIC.width}px;height:${FEATURE_GRAPHIC.height}px;overflow:hidden;background:radial-gradient(circle at 78% 50%,#1d2140 0,#0c0d11 62%);color:#e8eaf0;font-family:Inter,sans-serif;display:flex;align-items:center;padding:0 72px;gap:56px}
img{width:300px;height:300px;border-radius:64px;box-shadow:0 18px 60px rgba(124,155,255,.25)}
h1{font:700 128px/1 'Space Grotesk',sans-serif;letter-spacing:-2px;background:linear-gradient(120deg,#7c9bff,#b39bff 55%,#57d98a);-webkit-background-clip:text;color:transparent}
p{font-size:34px;color:#b8bdcc;margin-top:18px;line-height:1.25}
.pow sup{font-size:.62em}
.pow{font:700 26px 'Space Grotesk',sans-serif;color:#7c9bff;margin-top:26px;letter-spacing:1px}
</style></head><body><img src="${iconUrl}" alt=""><div><h1>Tens</h1><p>An idle game where every<br>upgrade is a power of ten.</p><div class="pow">10<sup>1</sup> · 10<sup>2</sup> · 10<sup>3</sup> · … · 10<sup>100</sup></div></div></body></html>`
