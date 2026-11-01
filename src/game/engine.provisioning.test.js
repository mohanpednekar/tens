import {
  createInitialGameState,
  getDiskLadderSizeBits,
  getDiskProvisionPassesCollected,
  getDiskProvisionPassesRequired,
  getDiskSize,
  getStoragePoolBandwidth,
  isProvisionDiskAvailable,
  isProvisionDiskInProgress,
  isProvisionDiskTurnAvailable,
  provisionDisk,
  queueDiskBuild,
  tickFoundryResetConvenience,
  tickGame,
  tickQueuedDiskBuild,
} from './engine'

// Provision Disk is a TIMED build at the pool's BASE Bandwidth (no fill multiplier, no pool buffer) — see
// provisionDisk / tickQueuedDiskBuild in engine.js and docs/DESIGN_HISTORY.md.
const FIRST = getDiskLadderSizeBits(1)
const withIntro = (state, patch) => ({ ...state, intro: { ...state.intro, ...patch } })
const base = () => withIntro(createInitialGameState(), { byteCreated: true, capacity: 8192 })
const diskSeconds = state => FIRST / getStoragePoolBandwidth(state, 1)

describe('Provision Disk (timed 1x build)', () => {
  it('is available whenever pool 1 is live — no pool-buffer affordability involved', () => {
    const state = base()
    expect(state.intro.poolBuffers?.[1] ?? 0).toBe(0)
    expect(isProvisionDiskAvailable(state)).toBe(true)
    expect(isProvisionDiskTurnAvailable(state)).toBe(true)
  })

  it('provisionDisk arms the build, is idempotent, and spends nothing', () => {
    const state = base()
    const armed = provisionDisk(state)
    expect(armed.intro.diskBuildQueued).toBe(true)
    expect(armed.intro.diskBuildQueuedByReplay).toBe(false)
    expect(armed.intro.poolBuffers).toEqual(state.intro.poolBuffers)
    expect(provisionDisk(armed)).toBe(armed)
  })

  it('does nothing while Disk Fill (higher priority) is available', () => {
    const state = withIntro(base(), { disks: { [FIRST]: 1 } })
    expect(isProvisionDiskTurnAvailable(state)).toBe(false)
    expect(provisionDisk(state)).toBe(state)
  })

  it('advances at base Bandwidth and completes one disk (empty container), disarming the queue', () => {
    const state = base()
    const seconds = diskSeconds(state)
    const half = tickQueuedDiskBuild(seconds / 2)(provisionDisk(state))
    expect(getDiskProvisionPassesCollected(half, FIRST)).toBeCloseTo(0.5, 9)
    expect(half.intro.diskBuildQueued).toBe(true)
    const done = tickQueuedDiskBuild(seconds / 2)(half)
    expect(done.intro.disksBuiltTotal[FIRST]).toBe(1)
    expect(done.intro.diskProvisionPasses[FIRST]).toBeUndefined()
    expect(done.intro.diskBuildQueued).toBe(false)
    expect(done.intro.disks?.[FIRST] ?? 0).toBe(0) // the container is empty; the cache fills it
  })

  it('ignores the fill multiplier and the pool buffer entirely', () => {
    const state = base()
    const seconds = diskSeconds(state)
    const boosted = withIntro(state, { poolTapBonusPercents: { 1: 100 }, poolBuffers: { 1: 0 } })
    const full = withIntro(state, { poolBuffers: { 1: 1e9 }, bits: 0 })
    for (const variant of [state, boosted, full]) {
      const after = tickQueuedDiskBuild(seconds / 4)(provisionDisk(variant))
      expect(getDiskProvisionPassesCollected(after, FIRST)).toBeCloseTo(0.25, 9)
    }
  })

  it('a multi-pass disk takes passesRequired x the per-pass time, and keeps fractional progress', () => {
    const state = withIntro(base(), { disksBuiltTotal: { [FIRST]: 2 }, disks: {} })
    const required = getDiskProvisionPassesRequired(state, FIRST)
    expect(required).toBe(3)
    const seconds = diskSeconds(state)
    const mid = tickQueuedDiskBuild(seconds * 1.5)(provisionDisk(state))
    expect(getDiskProvisionPassesCollected(mid, FIRST)).toBeCloseTo(1.5, 9)
    const end = tickQueuedDiskBuild(seconds * 1.5)(mid)
    expect(end.intro.disksBuiltTotal[FIRST]).toBe(3)
  })

  it('never loses progress: Disk Fill pauses the build (same reference) and it resumes where it was', () => {
    const state = base()
    const seconds = diskSeconds(state)
    const mid = tickQueuedDiskBuild(seconds / 2)(provisionDisk(state))
    const paused = withIntro(mid, { disks: { [FIRST]: 1 } }) // a full, pull-eligible disk outranks provisioning
    expect(tickQueuedDiskBuild(seconds)(paused)).toBe(paused)
    expect(getDiskProvisionPassesCollected(paused, FIRST)).toBeCloseTo(0.5, 9)
    const resumed = withIntro(paused, { disks: {} })
    const after = tickQueuedDiskBuild(seconds / 4)(resumed)
    expect(getDiskProvisionPassesCollected(after, FIRST)).toBeCloseTo(0.75, 9)
  })

  it('is a same-reference no-op when not armed or with no elapsed time', () => {
    const state = base()
    expect(tickQueuedDiskBuild(5)(state)).toBe(state)
    const armed = provisionDisk(state)
    expect(tickQueuedDiskBuild(0)(armed)).toBe(armed)
  })

  it('completes a stale over-required entry immediately', () => {
    const stale = withIntro(base(), { diskProvisionPasses: { [FIRST]: 5 }, diskBuildQueued: true })
    const after = tickQueuedDiskBuild(0)(stale)
    expect(after.intro.disksBuiltTotal[FIRST]).toBe(1)
    expect(after.intro.diskBuildQueued).toBe(false)
  })

  it('queueDiskBuild still arms while the pool waits; the tick holds until it can run', () => {
    const state = base()
    const queued = queueDiskBuild(withIntro(state, { dataLakes: { 1: { rebuilding: true } } }))
    expect(queued.intro.diskBuildQueued).toBe(true)
    expect(tickQueuedDiskBuild(100)(queued)).toBe(queued)
  })

  it('isProvisionDiskInProgress is true only for an armed or part-way build (so Compute is not starved)', () => {
    const state = base()
    expect(isProvisionDiskInProgress(state)).toBe(false)
    expect(isProvisionDiskInProgress(provisionDisk(state))).toBe(true)
    expect(isProvisionDiskInProgress(withIntro(state, { diskProvisionPasses: { [FIRST]: 0.3 } }))).toBe(true)
  })

  it('a replay-owned arm stops exactly at the foundryResetCaps allowance', () => {
    const caps = { disksBuiltTotal: { [FIRST]: 2 }, diskProvisionPasses: { [FIRST]: 1.5 } }
    const state = withIntro(base(), { foundryResetCaps: caps, disksBuiltTotal: { [FIRST]: 2 }, disks: {} })
    const armed = tickFoundryResetConvenience(state)
    expect(armed.intro.diskBuildQueued).toBe(true)
    expect(armed.intro.diskBuildQueuedByReplay).toBe(true)
    const after = tickQueuedDiskBuild(diskSeconds(state) * 10)(armed)
    expect(getDiskProvisionPassesCollected(after, FIRST)).toBeCloseTo(1.5, 9)
    expect(after.intro.diskBuildQueued).toBe(false)
  })

  it('tickGame drives a first disk to completion end to end', () => {
    let state = provisionDisk(base())
    expect(getDiskSize(state)).toBe(FIRST)
    for (let i = 0; i < 4000 && (state.intro.disksBuiltTotal?.[FIRST] ?? 0) < 1; i += 1) state = tickGame(1)(state)
    expect(state.intro.disksBuiltTotal[FIRST]).toBe(1)
  })
})
