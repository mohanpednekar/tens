// Store-asset manifest (Play + App Store). Pure data + builders, no I/O, so manifest.test.js can
// pin every output size against the stores' rules. generate.mjs plays the seeds (seeds.mjs),
// captures the real app for each device × scene and writes fastlane's layout:
// fastlane/metadata/android/<locale>/images (supply) and fastlane/screenshots/<locale> (deliver,
// which picks the display slot from the pixel size). Play foldable screenshots have no supply
// image type yet, so they land in fastlane/play-foldable/<locale> for a Play Console upload.
export const LOCALE = 'en-US'

// width/height are CSS px (the device's real viewport); output = × scale. Captures are honest: each
// device renders the app exactly as it lays out there.
//   Play: 9:16 phone and tablet screenshots, 320–3840 px. Foldables (required from April 2027):
//         inner display 3:4 (4:3-class) and 1:1 (square-class), outer 10:16.
//   App Store (screenshot specifications): 6.3" 1206×2622 (required iPhone slot), 6.9" 1320×2868,
//         6.5" 1284×2778, iPhone Duo outer 1398×2034 + inner 2007×2853 (one "iPhone Duo" slot),
//         iPad 13" 2064×2752 (required: TARGETED_DEVICE_FAMILY includes iPad).
export const DEVICES = [
  { id: 'phone', store: 'play', dir: 'phoneScreenshots', width: 360, height: 640, scale: 3 },
  { id: 'tablet7', store: 'play', dir: 'sevenInchScreenshots', width: 603, height: 1072, scale: 2 },
  { id: 'tablet10', store: 'play', dir: 'tenInchScreenshots', width: 720, height: 1280, scale: 2 },
  { id: 'fold-inner-3x4', store: 'play-foldable', width: 690, height: 920, scale: 2.5 },
  { id: 'fold-inner-1x1', store: 'play-foldable', width: 720, height: 720, scale: 2.5 },
  { id: 'fold-outer-10x16', store: 'play-foldable', width: 400, height: 640, scale: 3 },
  { id: 'iphone63', store: 'appstore', width: 402, height: 874, scale: 3 },
  { id: 'iphone69', store: 'appstore', width: 440, height: 956, scale: 3 },
  { id: 'iphone65', store: 'appstore', width: 428, height: 926, scale: 3 },
  { id: 'duo-outer', store: 'appstore', width: 466, height: 678, scale: 3 },
  { id: 'duo-inner', store: 'appstore', width: 669, height: 951, scale: 3 },
  { id: 'ipad13', store: 'appstore', width: 1032, height: 1376, scale: 2 },
]

// Order = store display order. `page` is a capture.mjs NAVIGATION id; `seed` a seeds.mjs key.
// Achievement unlock toasts are hidden in every scene except the one that shows achievements.
export const SCENES = [
  { id: 'factory', page: 'game', seed: 'career', theme: 'dark' },
  { id: 'foundry', page: 'foundry', seed: 'foundry', theme: 'dark' },
  { id: 'challenges', page: 'challenges', seed: 'career', theme: 'dark' },
  { id: 'firmware', page: 'perks', seed: 'career', theme: 'dark' },
  { id: 'achievements', page: 'achievements', seed: 'achievementUnlock', theme: 'dark', showToasts: true },
  { id: 'factory-light', page: 'game', seed: 'career', theme: 'light' },
]

export const pixelSize = device => ({ width: Math.round(device.width * device.scale), height: Math.round(device.height * device.scale) })

export const screenshotPath = (device, scene, index) => {
  const name = `${index + 1}_${scene.id}.png`
  if (device.store === 'play') return `fastlane/metadata/android/${LOCALE}/images/${device.dir}/${name}`
  if (device.store === 'play-foldable') return `fastlane/play-foldable/${LOCALE}/${device.id}_${name}`
  return `fastlane/screenshots/${LOCALE}/${device.id}_${name}`
}

export const FEATURE_GRAPHIC = { width: 1024, height: 500, path: `fastlane/metadata/android/${LOCALE}/images/featureGraphic.png` }

// Icons are copied, not drawn: both come from `yarn gen-pwa-icons`. App Store Connect takes the
// icon from the build itself.
export const ICONS = [
  { from: 'public/pwa-512x512.png', to: `fastlane/metadata/android/${LOCALE}/images/icon.png` },
]

export const TOAST_SELECTOR = '[aria-label="achievement notifications"]'

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
