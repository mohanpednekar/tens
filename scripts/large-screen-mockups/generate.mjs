#!/usr/bin/env node
// Generates the large-screen layout mockups for epic #1152 into docs/design/large-screens/.
//
//   node scripts/large-screen-mockups/generate.mjs [--base-url URL] [--port N] [--out DIR] [--only id,id] [--format jpeg|png]
//
// Without --base-url it starts `yarn dev` on 127.0.0.1 (--port, default 5199, strict) and stops it
// afterwards, including on Ctrl-C / SIGTERM.
// Each pane is a real capture of the app (seeded localStorage save, chromium via Playwright);
// generate then composes the frame (rail, dividers, chips, cards) from manifest.mjs and
// screenshots it at 2x. If Playwright's expected Chromium build isn't installed, set
// PW_CHROMIUM_PATH to a chromium binary — the same override the e2e suite uses (e2e/README.md).
import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'
import { MOCKUPS, SEEDS, composeFrame, galleryMarkdown } from './manifest.mjs'

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, arg, index, all) => {
  if (arg.startsWith('--')) pairs.push([arg.slice(2), all[index + 1] && !all[index + 1].startsWith('--') ? all[index + 1] : 'true'])
  return pairs
}, []))
const outDir = resolve(args.out ?? 'docs/design/large-screens')
const format = args.format === 'png' ? 'png' : 'jpeg'
const ext = format === 'png' ? 'png' : 'jpg'
const only = args.only ? new Set(args.only.split(',')) : null
const PORT = Number(args.port ?? 5199)

// Page id → how to reach it (AppNav / More menu aria-labels, as in the e2e specs).
const NAVIGATION = {
  foundry: ['open byte foundry'],
  boosters: ['open power'],
  compute: ['open compute'],
  perks: ['open firmware'],
  milestones: ['open more menu', 'open milestones'],
  achievements: ['open more menu', 'open achievements'],
  game: [],
}

const waitForServer = async (url, child) => {
  let exited = false
  child?.once('exit', () => { exited = true })
  for (let attempt = 0; attempt < 60; attempt++) {
    // With --strictPort a busy port makes vite exit at once; fail instead of capturing whatever
    // else is listening there (e.g. an orphaned server running older code).
    if (exited) throw new Error(`yarn dev exited — is port ${PORT} already in use?`)
    try { if ((await fetch(url)).ok) return } catch { /* not up yet */ }
    await new Promise(done => setTimeout(done, 500))
  }
  throw new Error(`dev server did not start at ${url}`)
}

const startDevServer = async () => {
  const child = spawn('yarn', ['dev', '--port', String(PORT), '--strictPort'], { stdio: 'ignore', detached: true })
  child.unref()
  const stop = () => { try { process.kill(-child.pid) } catch { /* already gone */ } }
  const url = `http://127.0.0.1:${PORT}/tens/`
  try { await waitForServer(url, child) } catch (error) { stop(); throw error }
  return { url, stop }
}

// Runs inside the app page: hide the app's own chrome so the frame can draw rails/HUDs.
const applyTweaks = tweaks => {
  const tierSection = document.querySelector('section[aria-label$=" layer"]')
  const style = document.createElement('style')
  style.textContent = 'nav{display:none!important} body{padding-bottom:0!important}'
  document.head.appendChild(style)
  for (const element of document.querySelectorAll('body *')) {
    const computed = getComputedStyle(element)
    if (computed.position === 'fixed' && element.tagName !== 'NAV' && computed.bottom !== 'auto') element.style.bottom = '0px'
  }
  if (tierSection && tweaks.cols) {
    const list = tierSection.parentElement
    list.style.display = 'grid'
    list.style.gridTemplateColumns = `repeat(${tweaks.cols},minmax(0,1fr))`
    list.style.gap = '8px'
  }
  if (tierSection && tweaks.hideHud) {
    let previous = tierSection.parentElement.previousElementSibling
    while (previous) { previous.style.display = 'none'; previous = previous.previousElementSibling }
    for (const element of document.querySelectorAll('body *')) {
      if (getComputedStyle(element).position === 'fixed') element.style.display = 'none'
    }
  }
}

const capturePane = async (browser, baseUrl, pane, dir) => {
  const page = await browser.newPage({ viewport: { width: pane.width, height: pane.height }, deviceScaleFactor: 2 })
  const seed = JSON.stringify(SEEDS[pane.seed]())
  await page.addInitScript(([save, theme]) => {
    window.localStorage.clear()
    window.localStorage.setItem('tens_theme_preference', theme)
    window.localStorage.setItem('tens_game_state', save)
  }, [seed, pane.theme ?? 'dark'])
  await page.goto(baseUrl)
  await page.waitForFunction(() => document.fonts.status === 'loaded')
  await page.waitForTimeout(700)
  for (const label of NAVIGATION[pane.page] ?? []) {
    await page.getByRole('button', { name: label }).click()
    await page.waitForTimeout(400)
  }
  if (!pane.raw) await page.evaluate(applyTweaks, { cols: pane.cols, hideHud: pane.hideHud })
  await page.waitForTimeout(200)
  await page.screenshot({ path: join(dir, `${pane.name}.png`) })
  await page.close()
}

const main = async () => {
  const mockups = MOCKUPS.filter(m => !only || only.has(m.id))
  if (mockups.length === 0) throw new Error('no mockups selected')
  const server = args['base-url'] ? { url: args['base-url'], stop: () => {} } : await startDevServer()
  // The dev server runs in its own process group, so a terminal Ctrl-C doesn't reach it.
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => { server.stop(); process.exit(130) })
  let work
  let browser
  try {
    work = await mkdtemp(join(tmpdir(), 'tens-mockups-'))
    browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {})
    await mkdir(outDir, { recursive: true })
    for (const mockup of mockups) {
      for (const pane of mockup.panes) await capturePane(browser, server.url, pane, work)
      const framePath = join(work, `${mockup.id}.html`)
      await writeFile(framePath, composeFrame(mockup))
      const page = await browser.newPage({ viewport: { width: mockup.width, height: mockup.height }, deviceScaleFactor: 2 })
      await page.goto(pathToFileURL(framePath).href)
      await page.waitForTimeout(250)
      await page.screenshot({ path: join(outDir, `${mockup.id}.${ext}`), type: format, ...(format === 'jpeg' ? { quality: 82 } : {}) })
      await page.close()
      console.log(`✓ ${mockup.id}`)
    }
    if (!only) await writeFile(join(outDir, 'README.md'), galleryMarkdown(MOCKUPS, ext))
  } finally {
    await browser?.close()
    server.stop()
    if (work) await rm(work, { recursive: true, force: true })
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
