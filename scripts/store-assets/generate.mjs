#!/usr/bin/env node
// Generates every Play / App Store image into fastlane's layout (see manifest.mjs):
//
//   node scripts/store-assets/generate.mjs [--base-url URL] [--port N] [--only scene,scene] [--devices id,id]
//   (with --only/--devices the output is a preview under fastlane/preview/, never uploaded)
//
// Screenshots are real captures of the app (chromium via Playwright) loaded with saves the
// simulation bot actually played (seeds.mjs, ~30 s to play), saved as opaque RGB PNGs (both stores
// reject alpha). Without --base-url it starts `yarn dev`
// (--port, default 5198). PW_CHROMIUM_PATH overrides the browser, as for the e2e suite.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { chromium } from 'playwright'
import { NAVIGATION, launchOptions, parseArgs, startDevServer } from '../lib/capture.mjs'
import { DEVICES, FEATURE_GRAPHIC, ICONS, LOCALE, SCENES, TOAST_SELECTOR, scenesFor, featureGraphicHtml, pixelSize, screenshotPath } from './manifest.mjs'
import { buildSeeds } from './seeds.mjs'

const args = parseArgs(process.argv.slice(2))
const only = args.only ? new Set(args.only.split(',')) : null
const onlyDevices = args.devices ? new Set(args.devices.split(',')) : null
// A filtered run is a preview: it goes to fastlane/preview/ so it can never be uploaded as a
// partial set (deliver's overwrite_screenshots / supply replace every set of the locale/device).
const filtered = Boolean(only || onlyDevices)
// A full run renders into fastlane/.staging/ and swaps it into the upload folders only once every
// image succeeded: stale images from removed scenes/devices can't ship, and a failed run leaves
// the previous complete set in place.
const STAGING = 'fastlane/.staging/'
const out = path => resolve(path.replace(/^fastlane\//, filtered ? 'fastlane/preview/' : STAGING))
const UPLOAD_IMAGE_DIRS = ['fastlane/screenshots', 'fastlane/play-foldable', `fastlane/metadata/android/${LOCALE}/images`]
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
  await writeOpaquePng(buffer, out(screenshotPath(device, scene, index)))
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
  await writeOpaquePng(await page.screenshot(), out(FEATURE_GRAPHIC.path))
  await page.close()
}

const main = async () => {
  const scenes = SCENES.filter(scene => !only || only.has(scene.id))
  rmSync(resolve(filtered ? 'fastlane/preview' : STAGING), { recursive: true, force: true })
  for (const { from, to } of ICONS) { mkdirSync(dirname(out(to)), { recursive: true }); copyFileSync(from, out(to)) }
  const server = args['base-url'] ? { url: args['base-url'], stop: () => {} } : await startDevServer(PORT)
  console.log('playing seed saves…')
  const seeds = buildSeeds()
  let browser
  try {
    browser = await chromium.launch(launchOptions())
    await renderFeatureGraphic(browser)
    console.log(`✓ feature graphic${filtered ? ' (preview → fastlane/preview/)' : ''}`)
    for (const device of DEVICES.filter(entry => !onlyDevices || onlyDevices.has(entry.id))) {
      for (const scene of scenes.filter(entry => scenesFor(device).includes(entry))) await captureScene(browser, server.url, seeds, device, scene, SCENES.indexOf(scene))
      console.log(`✓ ${device.id} (${scenes.filter(entry => scenesFor(device).includes(entry)).length})`)
    }
    if (!filtered) {
      for (const dir of UPLOAD_IMAGE_DIRS) {
        rmSync(resolve(dir), { recursive: true, force: true })
        const staged = resolve(dir.replace(/^fastlane\//, STAGING))
        if (existsSync(staged)) { mkdirSync(dirname(resolve(dir)), { recursive: true }); renameSync(staged, resolve(dir)) }
      }
      rmSync(resolve(STAGING), { recursive: true, force: true })
    }
  } finally {
    await browser?.close()
    server.stop()
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
