import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const BG = '#0c0d11'
const ACCENT = '#7c9bff'

// Standard icon: centered "10" glyph on the app's dark page background.
const standardSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <text x="256" y="326" font-family="Georgia, 'Times New Roman', serif" font-size="260"
    font-weight="700" fill="${ACCENT}" text-anchor="middle">10</text>
</svg>
`

// Maskable icon: same glyph, but confined to the ~80% "safe zone" circle so
// nothing important is clipped when an OS applies its own mask shape.
const maskableSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <text x="256" y="296" font-family="Georgia, 'Times New Roman', serif" font-size="180"
    font-weight="700" fill="${ACCENT}" text-anchor="middle">10</text>
</svg>
`

const targets = [
  { svg: standardSvg(512), size: 192, out: 'public/pwa-192x192.png' },
  { svg: standardSvg(512), size: 512, out: 'public/pwa-512x512.png' },
  { svg: maskableSvg(), size: 512, out: 'public/pwa-maskable-512x512.png' },
  { svg: standardSvg(512), size: 180, out: 'public/apple-touch-icon.png' },
]

for (const { svg, size, out } of targets) {
  const buffer = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
  writeFileSync(out, buffer)
  console.log(`wrote ${out} (${size}x${size})`)
}
