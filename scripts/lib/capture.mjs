// Shared helpers for the Playwright capture scripts. `yarn dev` lifecycle for the Playwright capture scripts (large-screen mockups, store
// assets): refuse a busy port, start the dev server in its own process group, wait for it, and stop
// it on exit — including on Ctrl-C / SIGTERM, which skip `finally` blocks.
import { spawn } from 'node:child_process'
import { connect } from 'node:net'

export const portInUse = port => new Promise(done => {
  const socket = connect({ host: '127.0.0.1', port })
  socket.once('connect', () => { socket.destroy(); done(true) })
  socket.once('error', () => done(false))
})

const waitForServer = async (url, child) => {
  let exited = false
  child.once('exit', () => { exited = true })
  for (let attempt = 0; attempt < 60; attempt++) {
    if (exited) throw new Error('yarn dev exited before the server came up')
    try { if ((await fetch(url)).ok && !exited) return } catch { /* not up yet */ }
    await new Promise(done => setTimeout(done, 500))
  }
  throw new Error(`dev server did not start at ${url}`)
}

export const cleanups = new Set()
export const runCleanups = () => { for (const cleanup of cleanups) cleanup(); cleanups.clear() }
for (const [signal, code] of [['SIGINT', 130], ['SIGTERM', 143]]) {
  process.once(signal, () => { runCleanups(); process.exit(code) })
}

export const startDevServer = async port => {
  // Whatever already answers on the port (e.g. a server orphaned by an earlier run) may be serving
  // older code, and captures must come from this checkout.
  if (await portInUse(port)) throw new Error(`port ${port} is already in use — stop that server or pass --port`)
  const child = spawn('yarn', ['dev', '--port', String(port), '--strictPort'], { stdio: 'ignore', detached: true })
  child.unref()
  // Own process group, so a terminal Ctrl-C doesn't reach it — kill the group explicitly.
  const stop = () => { try { process.kill(-child.pid) } catch { /* already gone */ } cleanups.delete(stop) }
  cleanups.add(stop)
  const url = `http://127.0.0.1:${port}/tens/`
  try { await waitForServer(url, child) } catch (error) { stop(); throw error }
  return { url, stop }
}

export const parseArgs = argv => Object.fromEntries(argv.reduce((pairs, arg, index, all) => {
  if (arg.startsWith('--')) pairs.push([arg.slice(2), all[index + 1] && !all[index + 1].startsWith('--') ? all[index + 1] : 'true'])
  return pairs
}, []))

export const launchOptions = () => (process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {})

// Page id → AppNav / More-menu button aria-labels to click from the Factory landing page (as in
// the e2e specs).
export const NAVIGATION = {
  foundry: ['open byte foundry'],
  boosters: ['open power'],
  compute: ['open compute'],
  perks: ['open firmware'],
  challenges: ['open challenges'],
  milestones: ['open more menu', 'open milestones'],
  achievements: ['open more menu', 'open achievements'],
  game: [],
}
