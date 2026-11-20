// Mockup manifest for the large-screen epic (#1152). Pure data + HTML builders, no I/O, so
// manifest.test.js can check it. generate.mjs captures the real app (Playwright, `yarn dev`)
// for every `panes` entry, then composes each mockup's frame HTML around those captures.
// Card/widget numbers drawn in the frames are illustrative; pane contents are the real app.
import { createInitialGameState } from '../../src/game/engine.js'
import {
  COMPUTE_FLOPS_REVEAL_PP,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_DISK_UNLOCK_CAPACITY,
} from '../../src/game/layers.js'

// ---------------------------------------------------------------- seeds

const owned = (state, values) => {
  const next = { ...state.owned }
  Object.keys(next).forEach((id, index) => { next[id] = values[index] ?? 0 })
  return next
}

// Only `owned` is seeded: `purchased`/`purchaseLevels` stay at their fresh values, a state the
// game can reach (tiers produced rather than bought). `everUnlockedTierIds` keeps the schema's
// `{ tierXX: boolean }` map shape.
const withTiers = (state, values, extra) => {
  const tiers = owned(state, values)
  return {
    saveSchemaVersion: 3,
    ...state,
    owned: tiers,
    everUnlockedTierIds: Object.fromEntries(Object.keys(state.everUnlockedTierIds).map(id => [id, tiers[id] > 0])),
    ...extra(state),
  }
}

const unlockedIntro = (state, capacity) => ({
  ...state.intro,
  mainGameUnlocked: true,
  byteCreated: true,
  capacity,
})

// Unlock stages from epic #1152 §3b. `mid` = everything revealed (late S4).
export const SEEDS = {
  s0: () => ({ saveSchemaVersion: 3, ...createInitialGameState() }),
  s1: () => withTiers(createInitialGameState(), [120, 8], state => ({
    resources: { ...state.resources, base: 4.2e6 },
    intro: unlockedIntro(state, INTRO_DISK_UNLOCK_CAPACITY * 4),
  })),
  s2: () => withTiers(createInitialGameState(), [900, 140, 22, 3], state => ({
    resources: { ...state.resources, base: 3e13 },
    intro: unlockedIntro(state, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY),
  })),
  s3: () => withTiers(createInitialGameState(), [1500, 400, 90, 20, 4], state => ({
    resources: { ...state.resources, base: 2e16 },
    purge: { ...state.purge, count: 1, points: 12 },
    intro: unlockedIntro(state, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY * 2),
  })),
  mid: () => withTiers(createInitialGameState(), [4200, 1800, 950, 420, 160, 55, 12], state => ({
    resources: { ...state.resources, base: 3.2e21 },
    purge: { ...state.purge, points: COMPUTE_FLOPS_REVEAL_PP * 3, count: 4 },
    computeFlops: { ...state.computeFlops, pageUnlocked: true },
    intro: { ...unlockedIntro(state, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY * 4), computeMergePageUnlocked: true },
  })),
}

// ---------------------------------------------------------------- frame theme + builders

export const THEMES = {
  dark: { bg: '#0b0c10', card: '#1a1d24', bd: '#2b2f3a', fg: '#e8eaf0', mut: '#8a90a0', acc: '#7c93ff', gold: '#f2c14e', act: '#262a35', col: '#0f1116' },
  light: { bg: '#f4f5f8', card: '#ffffff', bd: '#d9dce4', fg: '#1a1d24', mut: '#5d6475', acc: '#3d5bd9', gold: '#b7861a', act: '#e6e9f2', col: '#eceef3' },
}

export const NAV = [
  ['🔥', 'Foundry'], ['⚡', 'Power'], ['🖥', 'Compute'], ['🏭', 'Factory'],
  ['🔧', 'Firmware'], ['🏁', 'Challenges'], ['⋯', 'More'],
]
const ALL_NAV = NAV.map(([, name]) => name)

const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const frameCss = (theme, width, height) => {
  const c = THEMES[theme]
  return `*{box-sizing:border-box;margin:0}body{width:${width}px;height:${height}px;background:${c.bg};color:${c.fg};font-family:Inter,system-ui,sans-serif;position:relative;overflow:hidden}
.rail{position:absolute;left:0;top:0;bottom:0;background:${c.card};border-right:1px solid ${c.bd};display:flex;flex-direction:column;align-items:center;padding-top:14px;gap:6px}
.ri{display:flex;flex-direction:column;align-items:center;gap:2px;width:calc(100% - 12px);padding:7px 0;border-radius:10px;color:${c.mut};font-size:11px}
.ri.on{background:${c.act};color:${c.acc};outline:1px solid ${c.bd}}.ri.co{outline:1px dashed ${c.acc};color:${c.fg}}.ic{font-size:18px;position:relative}
.dot{position:absolute;right:-7px;top:-1px;width:7px;height:7px;border-radius:50%;background:#3ddc84}
.pane{position:absolute;top:0;overflow:hidden}.pane img{display:block}
.ph{position:absolute;top:8px;right:10px;display:flex;gap:6px}.chip{background:${c.card};border:1px solid ${c.bd};border-radius:999px;padding:3px 10px;font-size:12px;color:${c.mut};box-shadow:0 2px 8px rgba(0,0,0,.25)}
.div{position:absolute;top:0;bottom:0;background:${c.bd}}.fold{position:absolute;top:0;bottom:0;width:2px;background:repeating-linear-gradient(#f2c14e 0 8px,transparent 8px 14px)}
.ws{position:absolute;transform:translateX(-50%);background:${c.card};border:1px solid ${c.acc};color:${c.fg};border-radius:999px;padding:5px 14px;font-weight:600;font-size:13px;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.35);z-index:3}
.flow{position:absolute;transform:translate(-50%,-50%);background:${c.card};border:1px solid ${c.bd};border-radius:10px;padding:5px 9px;font-size:11.5px;color:${c.fg};white-space:nowrap;z-index:3;box-shadow:0 3px 10px rgba(0,0,0,.3)}.flow b{color:${c.acc}}
.card{background:${c.card};border:1px solid ${c.bd};border-radius:14px;padding:12px 14px;margin-bottom:10px}.big{font:700 26px 'Space Grotesk',Inter,sans-serif}
.mut{color:${c.mut};font-size:12px}.gold{color:${c.gold};font-weight:700}.grp{color:${c.mut};text-transform:uppercase;letter-spacing:.08em;font-size:11px;margin:2px 0 8px}
.bar{height:8px;border-radius:4px;background:${c.bd};overflow:hidden;margin-top:8px}.bar i{display:block;height:100%;background:${c.acc}}
.wt{font-weight:600;font-size:13px;display:flex;justify-content:space-between;margin-bottom:6px}.wv{font:700 20px 'Space Grotesk',Inter,sans-serif}
.btn{border:1px solid ${c.acc};background:rgba(124,147,255,.18);color:${c.acc};border-radius:8px;text-align:center;padding:7px;font-weight:700;font-size:13px}
.note{color:${c.acc};font-size:13px;margin:-2px 0 8px}.col{position:absolute;top:0;bottom:0;padding:14px 12px;border-left:1px solid ${c.bd};background:${c.col}}
.tag{position:absolute;left:8px;bottom:8px;font-size:11px;color:${c.mut};background:${c.card};border:1px solid ${c.bd};border-radius:6px;padding:2px 6px;z-index:4}`
}

export const railHtml = ({ width, labels = true, active, companions = [], items = ALL_NAV, dots = [] }) =>
  `<div class="rail" style="width:${width}px">${NAV.filter(([, name]) => items.includes(name)).map(([icon, name]) =>
    `<div class="ri${name === active ? ' on' : ''}${companions.includes(name) ? ' co' : ''}"><span class="ic">${icon}${dots.includes(name) ? '<i class="dot"></i>' : ''}</span>${labels ? `<span>${name}</span>` : ''}</div>`).join('')}</div>`

export const cardHtml = ({ title, value, sub = '', pct = null, right = '' }) =>
  `<div class="card"><div class="wt">${esc(title)}<span class="mut">${esc(right)}</span></div><div class="wv">${esc(value)}</div><div class="mut">${esc(sub)}</div>${pct === null ? '' : `<div class="bar"><i style="width:${pct}%"></i></div>`}</div>`

const paneImg = (pane, x, width, height, y = 0, extra = '') =>
  `<div class="pane" style="left:${x}px;top:${y}px;width:${width}px;height:${height}px"><img src="${pane}.png" width="${width}" height="${height}">${extra}</div>`

const SIDE_CONTROLS = '<div class="ph"><span class="chip">⇄</span><span class="chip">✕</span></div>'

// layout kinds ----------------------------------------------------------------------------

const composeRaw = m => paneImg(m.panes[0].name, 0, m.width, m.height)

const composeSingle = m => {
  const { rail } = m.layout
  return railHtml(rail) + paneImg(m.panes[0].name, rail.width, m.width - rail.width, m.height)
}

// Rail + 2 (or, for superseded mockups, 3) panes. `divider` = x of each pane boundary; with
// `fold: true` the boundary is the physical fold (window centre) and gets a gap + crease line.
// Pane rectangles for a `panes` layout: rail | pane | gap | pane … | linked column.
export const paneRects = m => {
  const { rail, dividers, gap = 4, linked } = m.layout
  const right = linked ? m.width - linked.width : m.width
  const edges = [rail.width, ...dividers, right]
  return m.panes.map((_, index) => {
    const start = index === 0 ? edges[0] : edges[index] + gap / 2
    const end = index === m.panes.length - 1 ? edges[index + 1] : edges[index + 1] - gap / 2
    return { x: start, width: end - start }
  })
}

const composePanes = m => {
  const { rail, dividers, gap = 4, fold = false, chip, chipTop, flows = [], linked } = m.layout
  const right = linked ? m.width - linked.width : m.width
  let html = railHtml(rail)
  paneRects(m).forEach(({ x, width }, index) => {
    html += paneImg(m.panes[index].name, x, width, m.height, 0, index === m.panes.length - 1 && m.panes.length > 1 ? SIDE_CONTROLS : '')
  })
  dividers.forEach(x => {
    html += `<div class="div" style="left:${x - gap / 2}px;width:${gap}px"></div>`
    if (fold) html += `<div class="fold" style="left:${x - 1}px"></div>`
  })
  const centre = dividers[0]
  if (chip) html += `<div class="ws" style="left:${centre}px;top:${chipTop ?? m.height - 46}px">${esc(chip)}</div>`
  flows.forEach(({ x = centre, y, text }) => { html += `<div class="flow" style="left:${x}px;top:${y}px">${text}</div>` })
  if (linked) {
    html += `<div class="col" style="left:${right}px;width:${linked.width}px"><div class="grp">Linked</div>${linked.cards.map(cardHtml).join('')}<div class="mut" style="font-style:italic">tap a card to open it in the second pane · values illustrative</div></div>`
  }
  return html
}

const composeControlRoom = m => {
  const { rail, top, left, right, centre } = m.layout
  let html = railHtml(rail)
  html += `<div style="position:absolute;left:${rail.width + 12}px;top:12px;right:12px;height:98px;display:grid;grid-template-columns:${top.map(() => '1fr').join(' ')};gap:12px">${top.join('')}</div>`
  html += `<div style="position:absolute;left:${rail.width + 12}px;top:122px;width:270px">${left}</div>`
  if (right) html += `<div style="position:absolute;left:${m.width - 272}px;top:122px;width:260px">${right}</div>`
  html += paneImg(m.panes[0].name, centre.x, centre.width, centre.height, 122)
  return html
}

export const COMPOSERS = { raw: composeRaw, single: composeSingle, panes: composePanes, controlRoom: composeControlRoom }

export const composeFrame = mockup => {
  const theme = mockup.theme ?? 'dark'
  const body = COMPOSERS[mockup.layout.kind](mockup) + (mockup.tag ? `<div class="tag">${esc(mockup.tag)}</div>` : '')
  return `<!doctype html><html><head><meta charset="utf-8"><style>${frameCss(theme, mockup.width, mockup.height)}</style></head><body>${body}</body></html>`
}

// ---------------------------------------------------------------- mockups

// Pane tweak flags (applied inside the captured app page before the screenshot):
//   raw       – screenshot the app untouched (bottom nav included)
//   hideHud   – hide everything above the tier list (and fixed bars) to sit under a drawn HUD
//   cols      – lay the tier list out in N columns (rejected 2-column iPad portrait only)
// By default the app's own bottom nav is hidden because the frame draws the rail.
const pane = (name, width, height, seed, page, extra = {}) => ({ name, width, height, seed, page, ...extra })

const W = cardHtml
const hudTop = ({ bytes, pp, purge, eta }) => [
  `<div class="card"><div class="big">${bytes}</div><div class="bar"><i style="width:38%"></i></div></div>`,
  ...(pp ? [`<div class="card"><div class="mut">Prestige</div><div class="gold" style="font-size:24px">${pp}</div></div>`] : []),
  `<div class="card"><div class="wt">Accelerate<span class="mut">+1%/lvl</span></div><div class="btn">🌐 10 B</div></div>`,
  `<div class="card"><div class="wt">Purge<span class="mut">${purge}%</span></div><div class="bar" style="height:12px"><i style="width:${purge}%"></i></div><div class="mut" style="margin-top:6px">${eta}</div></div>`,
]

export const MOCKUPS = [
  // ---------------- today (evidence)
  {
    id: 'today-ipad-landscape', status: 'today', issues: [1152], width: 1180, height: 820,
    title: 'Today: iPad landscape (1180×820) — one phone column, bottom bar',
    panes: [pane('today-ipad', 1180, 820, 'mid', 'game', { raw: true })], layout: { kind: 'raw' },
  },
  {
    id: 'today-360-fold-cover', status: 'today', issues: [1163], width: 360, height: 764,
    title: 'Today: 360×764 (Galaxy Z Fold 7 cover / Flip 7) — nav labels cut off',
    panes: [pane('today-360-factory', 360, 764, 'mid', 'game', { raw: true })], layout: { kind: 'raw' },
  },
  {
    id: 'today-360-data-stream', status: 'today', issues: [1163], width: 360, height: 520,
    title: 'Today: 360 px Foundry — "Data Stream" label overlaps its value',
    panes: [pane('today-360-foundry', 360, 520, 'mid', 'foundry', { raw: true })], layout: { kind: 'raw' },
  },

  // ---------------- Split pairings (§3a)
  {
    id: 'split-supply-loop', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'Split: Supply loop — Foundry ⇄ Power (iPad landscape)',
    panes: [pane('sl-foundry', 600, 820, 'mid', 'foundry'), pane('sl-power', 488, 820, 'mid', 'boosters')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Power'] }, dividers: [690], chip: '⚡ Supply loop · Foundry ⇄ Power', chipTop: 10, flows: [{ y: 330, text: '🏞 Lakes <b>→</b> ⬡ Cells' }, { y: 400, text: '⚡ Boost <b>→</b> 🌊 Stream &amp; pools' }] },
  },
  {
    id: 'split-supply-loop-light', status: 'approved', issues: [1157], width: 1180, height: 820, theme: 'light',
    title: 'Split: Supply loop, light theme',
    panes: [pane('sl-foundry-light', 600, 820, 'mid', 'foundry', { theme: 'light' }), pane('sl-power-light', 488, 820, 'mid', 'boosters', { theme: 'light' })],
    layout: { kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Power'] }, dividers: [690], chip: '⚡ Supply loop · Foundry ⇄ Power', chipTop: 10 },
  },
  {
    id: 'split-pp-desk', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'Split: PP desk — Compute ⇄ Firmware',
    panes: [pane('pp-compute', 600, 820, 'mid', 'compute'), pane('pp-firmware', 488, 820, 'mid', 'perks')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Compute', companions: ['Firmware'] }, dividers: [690], chip: '🏆 PP desk · Compute ⇄ Firmware', chipTop: 10 },
  },
  {
    id: 'split-factory-compute', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'Split: Factory → Compute (Flops multiply tiers)',
    panes: [pane('fc-factory', 600, 820, 'mid', 'game'), pane('fc-compute', 488, 820, 'mid', 'compute')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Factory', companions: ['Compute'] }, dividers: [690], chip: '🏭 Factory → 🖥 Compute', chipTop: 10 },
  },
  {
    id: 'split-progress', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'Split: Progress — Milestones ⇄ Achievements (opened from More)',
    panes: [pane('pr-milestones', 600, 820, 'mid', 'milestones'), pane('pr-achievements', 488, 820, 'mid', 'achievements')],
    layout: { kind: 'panes', rail: { width: 88, active: 'More' }, dividers: [690], chip: '🏆 Progress · Milestones ⇄ Achievements', chipTop: 10 },
  },

  // ---------------- single page
  {
    id: 'single-ipad-portrait', status: 'approved', issues: [1154, 1156], width: 820, height: 1180,
    title: 'Single: iPad portrait — side rail, one tier column below 900 px',
    panes: [pane('ip-factory', 732, 1180, 'mid', 'game')],
    layout: { kind: 'single', rail: { width: 88, active: 'Factory' } },
  },

  // ---------------- unlock stages (§3b)
  {
    id: 'stage-s0-foundry-only', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'S0 first-run Foundry phase — one page, rail shows Foundry + More',
    panes: [pane('s0-foundry', 1092, 820, 's0', null)],
    layout: { kind: 'single', rail: { width: 88, active: 'Foundry', items: ['Foundry', 'More'] } },
  },
  {
    id: 'stage-s1-foundry-factory', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'S1 — Foundry + Factory fallback pair until Power unlocks',
    panes: [pane('s1-foundry', 600, 820, 's1', 'foundry'), pane('s1-factory', 488, 820, 's1', 'game')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Factory'], items: ['Foundry', 'Factory', 'More'] }, dividers: [690], chip: '🌱 Early loop · Foundry → Factory', chipTop: 10, flows: [{ y: 700, text: '🌊 Bits <b>→</b> KB tier' }] },
  },
  {
    id: 'stage-s2-auto-switch', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'S2 — Power unlocks: second pane switches to Power automatically',
    panes: [pane('s2-foundry', 600, 820, 's2', 'foundry'), pane('s2-power', 488, 820, 's2', 'boosters')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Power'], items: ['Foundry', 'Power', 'Factory', 'More'] }, dividers: [690], chip: '⚡ Supply loop · Foundry ⇄ Power', chipTop: 10 },
  },
  {
    id: 'stage-s3-firmware-factory', status: 'approved', issues: [1157], width: 1180, height: 820,
    title: 'S3 — Firmware pairs with Factory until Compute unlocks',
    panes: [pane('s3-firmware', 600, 820, 's3', 'perks'), pane('s3-factory', 488, 820, 's3', 'game')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Firmware', companions: ['Factory'], items: ['Foundry', 'Power', 'Factory', 'Firmware', 'Challenges', 'More'] }, dividers: [690], chip: '🔧 Firmware ⇄ 🏭 Factory', chipTop: 10, flows: [{ x: 850, y: 620, text: '🤖 Autobuyers <b>→</b> tiers' }] },
  },

  // ---------------- wide: 2 panes + Linked cards (#1162)
  {
    id: 'wide-linked-supply', status: 'approved', issues: [1162], width: 1376, height: 1032,
    title: 'Wide (13″ iPad / desktop): Foundry ⇄ Power + Linked cards',
    panes: [pane('wl-foundry', 540, 1032, 'mid', 'foundry'), pane('wl-power', 488, 1032, 'mid', 'boosters')],
    layout: {
      kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Power'] }, dividers: [630], chip: '⚡ Supply loop · Foundry ⇄ Power', chipTop: 980,
      linked: { width: 256, cards: [{ title: '🏭 Factory', value: '4e20 B', sub: '21% to Purge · KB buy 1e4 B', pct: 21, right: '⚡ boosted' }, { title: '🖥 Compute', value: '0 Flops', sub: 'next: KF 1,000 PP' }] },
    },
  },
  {
    id: 'wide-linked-factory', status: 'approved', issues: [1162], width: 1376, height: 1032,
    title: 'Wide: Factory ⇄ Compute + Linked cards (Power, Foundry, Firmware, Challenges)',
    panes: [pane('wf-factory', 540, 1032, 'mid', 'game'), pane('wf-compute', 488, 1032, 'mid', 'compute')],
    layout: {
      kind: 'panes', rail: { width: 88, active: 'Factory', companions: ['Compute'] }, dividers: [630], chip: '🏭 Factory → 🖥 Compute', chipTop: 900,
      linked: { width: 256, cards: [{ title: '⚡ Power', value: 'No boost', sub: 'Cells 0/10 · 💥×20·10m ready', right: '→ tiers' }, { title: '🔥 Foundry', value: 'Storage 64%', sub: 'Data Stream 4.2 KiB/s', pct: 64 }, { title: '🔧 Firmware', value: '300 PP', sub: '3 upgrades affordable' }, { title: '🏁 Challenges', value: 'None active', sub: '3 available' }] },
    },
  },
  {
    id: 'web-1920-linked', status: 'approved', issues: [1156, 1162], width: 1920, height: 1080,
    title: 'Desktop browser 1920×1080: same layout by size (shared max content width per pane is required, #1156)',
    panes: [pane('web-foundry', 740, 1080, 'mid', 'foundry'), pane('web-power', 812, 1080, 'mid', 'boosters')],
    layout: {
      kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Power'] }, dividers: [830], chip: '⚡ Supply loop · Foundry ⇄ Power', chipTop: 1030,
      linked: { width: 276, cards: [{ title: '🏭 Factory', value: '4e20 B', sub: '21% to Purge', pct: 21, right: '⚡ boosted' }, { title: '🖥 Compute', value: '0 Flops', sub: 'next: KF 1,000 PP' }] },
    },
  },

  // ---------------- Control Room (#1159)
  {
    id: 'control-room', status: 'approved', issues: [1159], width: 1366, height: 1024,
    title: 'Control Room (opt-in): Supply loop left, Factory centre, PP desk + Runs right',
    panes: [pane('cr-factory', 700, 870, 'mid', 'game', { hideHud: true })],
    layout: {
      kind: 'controlRoom', rail: { width: 88, active: 'Factory' },
      top: hudTop({ bytes: '4e20 B', pp: '300 PP', purge: 21, eta: 'ETA ~14m' }).filter((_, index) => index !== 2),
      left: `<div class="grp">⚡ Supply loop</div>${W({ title: '🔥 Foundry', value: 'Storage 64%', sub: 'Data Stream 4.2 KiB/s · KB lake 1/10', pct: 64, right: '●' })}<div class="note" style="text-align:center">🏞 Lakes ↓ ⬡ Cells &nbsp; ⚡ ↑ Boost</div>${W({ title: '⚡ Power', value: 'No boost', sub: 'Cells 0/10 · 💥×20·10m ready' })}<div class="note" style="text-align:right">⚡ Boost → Factory tiers ➜</div>`,
      right: `<div class="grp">🏆 PP desk</div><div class="note">➜ Purge → PP</div>${W({ title: '🖥 Compute', value: '1.2e3 FLOPS', sub: 'Flops ×tiers · next 1e4', pct: 12 })}${W({ title: '🔧 Firmware', value: 'Automation 4/9', sub: '3 PP upgrades affordable', pct: 44, right: '●' })}<div class="grp">🏁 Runs</div>${W({ title: '🏁 Challenges', value: 'None active', sub: '3 available · Daily resets 6h' })}<div class="mut" style="font-style:italic">widget values illustrative</div>`,
      centre: { x: 382, width: 700, height: 870 },
    },
  },
  {
    id: 'control-room-early', status: 'approved', issues: [1159], width: 1366, height: 1024,
    title: 'Control Room early (S2): only unlocked cards; empty right column dropped',
    panes: [pane('cre-factory', 972, 846, 's2', 'game', { hideHud: true })],
    layout: {
      kind: 'controlRoom', rail: { width: 88, active: 'Factory', items: ['Foundry', 'Power', 'Factory', 'More'] },
      top: hudTop({ bytes: '3e13 B', purge: 3, eta: 'first Purge ahead' }),
      left: `<div class="grp">⚡ Supply loop</div>${W({ title: '🔥 Foundry', value: 'Storage 31%', sub: 'Data Stream 2.1 KiB/s', pct: 31 })}<div class="note" style="text-align:center">🏞 Lakes ↓ ⬡ Cells &nbsp; ⚡ ↑ Boost</div>${W({ title: '⚡ Power', value: 'No boost', sub: 'Cells 0/10' })}<div class="note" style="text-align:right">⚡ Boost → Factory tiers ➜</div>`,
      centre: { x: 382, width: 972, height: 846 },
    },
  },

  // ---------------- foldables (§3c) — hinge-aware dual portrait
  {
    id: 'fold7-inner-hinge', status: 'approved', issues: [1158], width: 984, height: 1016,
    title: 'Galaxy Z Fold 7 inner (984×1016): two portrait pages, divider locked on the fold',
    panes: [pane('f7-factory', 400, 1016, 'mid', 'game'), pane('f7-compute', 488, 1016, 'mid', 'compute')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Factory', companions: ['Compute'] }, dividers: [492], gap: 8, fold: true, chip: '🏭 Factory → 🖥 Compute', flows: [{ y: 960, text: 'fold ↕ divider locked here' }] },
  },
  {
    id: 'duo-inner-hinge', status: 'approved', issues: [1158], width: 890, height: 626,
    title: 'iPhone Duo inner, held sideways (~890×626 pt): icon rail + two portrait pages on the fold',
    panes: [pane('duo-foundry', 381, 626, 'mid', 'foundry'), pane('duo-power', 441, 626, 'mid', 'boosters')],
    layout: { kind: 'panes', rail: { width: 60, labels: false, active: 'Foundry', companions: ['Power'] }, dividers: [445], gap: 8, fold: true, chip: '⚡ Foundry ⇄ Power', flows: [{ y: 546, text: 'fold ↕ divider locked here' }] },
  },
  {
    id: 'fold7-inner-sideways', status: 'approved', issues: [1158], width: 1040, height: 932,
    title: 'Galaxy Z Fold 7 inner held sideways (1040×932): two portrait pages; fold is horizontal here, so treated as flat',
    panes: [pane('f7s-foundry', 472, 932, 'mid', 'foundry'), pane('f7s-power', 476, 932, 'mid', 'boosters')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Foundry', companions: ['Power'] }, dividers: [562], chip: '⚡ Foundry ⇄ Power' },
  },

  // ---------------- superseded (kept for design history)
  {
    id: 'superseded-pipeline-3-pane', status: 'superseded', issues: [1162], width: 1376, height: 1032,
    title: 'Rejected: 3 full panes (Pipeline) — replaced by 2 panes + Linked cards',
    tag: 'REJECTED — max 2 full panes',
    panes: [pane('pl-foundry', 440, 1032, 'mid', 'foundry'), pane('pl-power', 400, 1032, 'mid', 'boosters'), pane('pl-factory', 440, 1032, 'mid', 'game')],
    layout: { kind: 'panes', rail: { width: 88, active: 'Factory', companions: ['Foundry', 'Power'] }, dividers: [530, 934], chip: '🔁 Pipeline · Foundry → Power → Factory', chipTop: 960 },
  },
  {
    id: 'superseded-ipad-portrait-2-col', status: 'superseded', issues: [1156], width: 820, height: 1180,
    title: 'Rejected: 2-column tier list on iPad portrait — Owned count truncates',
    tag: 'REJECTED — 1 column below 900 px',
    panes: [pane('ip2-factory', 732, 1180, 'mid', 'game', { cols: 2 })],
    layout: { kind: 'single', rail: { width: 88, active: 'Factory' } },
  },
]

export const STATUS_LABELS = { today: 'Today (current app)', approved: 'Approved design', superseded: 'Superseded / rejected' }

export const galleryMarkdown = (mockups, ext) => {
  const sections = Object.entries(STATUS_LABELS).map(([status, label]) => {
    const rows = mockups.filter(m => m.status === status)
    if (rows.length === 0) return ''
    return `## ${label}\n\n${rows.map(m => `### ${m.title}\n\n\`${m.id}\` · ${m.width}×${m.height} · ${m.issues.map(n => `#${n}`).join(', ')}\n\n![${m.title}](./${m.id}.${ext})\n`).join('\n')}`
  }).filter(Boolean)
  return `# Large-screen layout mockups (epic #1152)\n\nGenerated by \`node scripts/large-screen-mockups/generate.mjs\` — do not edit by hand.\nPanes are real app captures (seeded saves, \`yarn dev\`); rails, dividers, chips and cards are drawn by the generator, and card values are illustrative.\n\n${sections.join('\n')}`
}
