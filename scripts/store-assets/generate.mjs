#!/usr/bin/env node
// Generates every Play / App Store image into fastlane's layout (see manifest.mjs):
//
//   node scripts/store-assets/generate.mjs [--base-url URL] [--port N] [--only scene,scene] [--devices id,id]
//
// Screenshots are real captures of the app (chromium via Playwright) loaded with saves the
// simulation bot actually played (seeds.mjs, ~30 s to play), saved as opaque RGB PNGs (both stores
// reject alpha). Without --base-url it starts `yarn dev`
// (--port, default 5198). PW_CHROMIUM_PATH overrides the browser, as for the e2e suite.
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { chromium } from 'playwright'
import { NAVIGATION, launchOptions, parseArgs, startDevServer } from '../lib/capture.mjs'
import { DEVICES, FEATURE_GRAPHIC, ICONS, SCENES, TOAST_SELECTOR, featureGraphicHtml, pixelSize, screenshotPath } from './manifest.mjs'
import { buildSeeds } from './seeds.mjs'

const args = parseArgs(process.argv.slice(2))
const only = args.only ? new Set(args.only.split(',')) : null
const onlyDevices = args.devices ? new Set(args.devices.split(',')) : null
const PORT = Number(args.port ?? 5198)

const writeOpaquePng = async (buffer, path) => {
  mkdirSync(dirname(path), { recursive: true })
  await sharp(buffer).flatten({ background: '#0c0d11' }).removeAlpha().png().toFile(path)
}

const captureScene = async (browser, baseUrl, seeds, device, scene, index) => {
  const page = await browser.newPage({ viewport: { width: device.width, height: device.height }, deviceScaleFactor: device.scale, hasTouch: true, isMobile: true })
  await page.addInitScript(([save, theme]) => {
    window.localStorage.clear()
    window.localStorage.setItem('tens_theme_preference', theme)
    window.localStorage.setItem('tens_game_state', save)
  }, [JSON.stringify(seeds[scene.seed]), scene.theme])
  await page.goto(baseUrl)
  await page.waitForFunction(() => document.fonts.status === 'loaded')
  await page.waitForTimeout(700)
  for (const label of NAVIGATION[scene.page]) {
    await page.getByRole('button', { name: label }).click()
    await page.waitForTimeout(400)
  }
  if (scene.showToasts) {
    // The seed leaves one qualifying achievement un-earned: wait for the game's own unlock toast.
    await page.locator(`${TOAST_SELECTOR} > *`).first().waitFor({ state: 'visible', timeout: 10_000 })
  } else {
    await page.addStyleTag({ content: `${TOAST_SELECTOR}{display:none!important}` })
  }
  await page.waitForTimeout(300)
  const { width, height } = pixelSize(device)
  const buffer = await page.screenshot()
  const meta = await sharp(buffer).metadata()
  if (meta.width !== width || meta.height !== height) throw new Error(`${device.id}/${scene.id}: got ${meta.width}×${meta.height}, want ${width}×${height}`)
  await writeOpaquePng(buffer, resolve(screenshotPath(device, scene, index)))
  await page.close()
}

const renderFeatureGraphic = async browser => {
  const page = await browser.newPage({ viewport: { width: FEATURE_GRAPHIC.width, height: FEATURE_GRAPHIC.height } })
  // Loaded from a file: URL (not setContent's about:blank) so the bundled font files resolve.
  const dir = mkdtempSync(join(tmpdir(), 'tens-feature-'))
  const htmlPath = join(dir, 'feature.html')
  writeFileSync(htmlPath, featureGraphicHtml({
    fontDir: pathToFileURL(resolve('node_modules/@fontsource')).href,
    iconUrl: `data:image/png;base64,${readFileSync('public/pwa-512x512.png').toString('base64')}`,
  }))
  await page.goto(pathToFileURL(htmlPath).href)
  rmSync(dir, { recursive: true, force: true })
  await page.waitForFunction(() => document.fonts.status === 'loaded')
  await writeOpaquePng(await page.screenshot(), resolve(FEATURE_GRAPHIC.path))
  await page.close()
}

const main = async () => {
  const scenes = SCENES.filter(scene => !only || only.has(scene.id))
  for (const { from, to } of ICONS) { mkdirSync(dirname(to), { recursive: true }); copyFileSync(from, to) }
  const server = args['base-url'] ? { url: args['base-url'], stop: () => {} } : await startDevServer(PORT)
  console.log('playing seed saves…')
  const seeds = buildSeeds()
  let browser
  try {
    browser = await chromium.launch(launchOptions())
    await renderFeatureGraphic(browser)
    console.log(`✓ ${FEATURE_GRAPHIC.path}`)
    for (const device of DEVICES.filter(entry => !onlyDevices || onlyDevices.has(entry.id))) {
      for (const scene of scenes) await captureScene(browser, server.url, seeds, device, scene, SCENES.indexOf(scene))
      console.log(`✓ ${device.id} (${scenes.length})`)
    }
  } finally {
    await browser?.close()
    server.stop()
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
