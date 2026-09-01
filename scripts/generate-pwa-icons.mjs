import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

// App icon: an 8-cell "byte" grid (4 columns x 2 rows) on the app's dark page background, each
// cell a rounded square filled with a diagonal gradient sweeping from the brand accent (indigo)
// through violet to the "good"/affordable green — the same semantic hues already used throughout
// the app's own token palette (src/theme/tokens.js). Directly evokes the game's own first, most
// universal mechanic (tapping bits, combining exactly 8 of them into 1 Byte in the Byte Foundry)
// rather than a generic "10" text glyph, while the gradient also reads as growth/energy — apt for
// an incremental game themed entirely around powers of ten. Replaces an earlier plain serif "10"
// glyph — see docs/DESIGN_HISTORY.md for the icon redesign.
const BG = '#0c0d11'
const GRADIENT_STOPS = [
  { offset: '0%', color: '#7c9bff' }, // accent (indigo)
  { offset: '55%', color: '#b39bff' }, // violet
  { offset: '100%', color: '#57d98a' }, // good (green)
]

// `scale` shrinks the grid around the canvas center — used by the maskable variant so nothing
// important sits outside the ~80% "safe zone" circle an OS mask shape might clip to. At scale 1
// the grid's own corners sit right at the safe-zone edge; 0.82 keeps a comfortable margin inside
// it (verified against the maskable.app safe-zone guideline). `cols`/`rows` default to the full
// 4x2/8-cell "byte" grid; the favicon frames below use a simplified 2x2/4-cell version instead —
// at a true 16x16 rendered size, 8 thin cells blur into an illegible plaid, while 4 bigger cells
// still read clearly as a grid (checked by rendering both at 16x16 before settling on this split).
const gridSvg = (scale = 1, cols = 4, rows = 2) => {
  const cell = 84 * scale * (4 / cols)
  const gap = 20 * scale * (4 / cols)
  const width = cols * cell + (cols - 1) * gap
  const height = rows * cell + (rows - 1) * gap
  const left = 256 - width / 2
  const top = 256 - height / 2
  const rx = cell * 0.19

  const cells = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = left + col * (cell + gap)
      const y = top + row * (cell + gap)
      cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="${rx}" fill="url(#byteGradient)"/>`)
    }
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="byteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${GRADIENT_STOPS.map(({ offset, color }) => `<stop offset="${offset}" stop-color="${color}"/>`).join('\n      ')}
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="${BG}"/>
  ${cells.join('\n  ')}
</svg>
`
}

const targets = [
  { svg: gridSvg(1), size: 192, out: 'public/pwa-192x192.png' },
  { svg: gridSvg(1), size: 512, out: 'public/pwa-512x512.png' },
  { svg: gridSvg(0.82), size: 512, out: 'public/pwa-maskable-512x512.png' },
  { svg: gridSvg(1), size: 180, out: 'public/apple-touch-icon.png' },
]

for (const { svg, size, out } of targets) {
  const buffer = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
  writeFileSync(out, buffer)
  console.log(`wrote ${out} (${size}x${size})`)
}

// favicon.ico: a minimal hand-built ICO container (no dependency beyond sharp, already a
// devDependency for the PNG rasterization above) embedding modern-format PNG frames directly —
// supported since Windows Vista, far simpler than the legacy BMP+AND-mask encoding, and what every
// current browser expects anyway. One frame per standard favicon size.
const buildIco = frames => {
  const HEADER_SIZE = 6
  const DIR_ENTRY_SIZE = 16
  const header = Buffer.alloc(HEADER_SIZE)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = icon
  header.writeUInt16LE(frames.length, 4)

  const dirEntries = []
  const dataChunks = []
  let offset = HEADER_SIZE + DIR_ENTRY_SIZE * frames.length
  for (const { size, buffer } of frames) {
    const entry = Buffer.alloc(DIR_ENTRY_SIZE)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // color count (0 = no palette, true color)
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    dataChunks.push(buffer)
    offset += buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...dataChunks])
}

const faviconSizes = [16, 32, 48]
const faviconSvg = gridSvg(1, 2, 2)
const faviconFrames = await Promise.all(
  faviconSizes.map(async size => ({
    size,
    buffer: await sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer(),
  }))
)
writeFileSync('public/favicon.ico', buildIco(faviconFrames))
console.log(`wrote public/favicon.ico (${faviconSizes.join('/')})`)
