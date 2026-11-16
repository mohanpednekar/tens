#!/usr/bin/env node
// Daily-challenge calibration sweep (epic #1062). Generates every definition for a range of UTC dates with the
// real generator (src/game/dailyChallenges.js) and reports, per format, the reference bot's winning time against
// the calibration band (after half the limit, by the bot ceiling), the retry/fallback rate and the variety.
//
// Usage: node scripts/simulate-daily-challenges.mjs [--from 2026-11-16] [--days 60] [--date 2026-11-16]
//   --date  print the full definition + validation record of one date (debugging a bad day) and exit.
import { register } from 'node:module'

register(
  'data:text/javascript,' +
    encodeURIComponent(`export async function resolve(s, c, n) {
  try { return await n(s, c) } catch (e) {
    if (e.code === 'ERR_MODULE_NOT_FOUND' && (s.startsWith('./') || s.startsWith('../'))) return n(s + '.js', c)
    throw e
  }
}`),
)

const { DAILY_FORMATS, generateDailyChallenge, getDailyChallengeValidation } = await import('../src/game/dailyChallenges.js')

const args = process.argv.slice(2)
const argOf = (flag, fallback) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback)
const ONE = argOf('--date', null)
const FROM = argOf('--from', new Date().toISOString().slice(0, 10))
const DAYS = Number(argOf('--days', 60))
const fmt = seconds => (seconds >= 3600 ? `${(seconds / 3600).toFixed(2)}h` : `${(seconds / 60).toFixed(1)}m`)

if (ONE) {
  for (const format of DAILY_FORMATS) console.log(JSON.stringify({ def: generateDailyChallenge(ONE, format.id), validation: getDailyChallengeValidation(ONE, format.id) }, null, 2))
  process.exit(0)
}

const dates = Array.from({ length: DAYS }, (_, i) => new Date(Date.parse(`${FROM}T00:00:00Z`) + i * 86400000).toISOString().slice(0, 10))
let failed = false
for (const format of DAILY_FORMATS) {
  const started = performance.now()
  const rows = dates.map(date => ({ def: generateDailyChallenge(date, format.id), validation: getDailyChallengeValidation(date, format.id) }))
  const ms = (performance.now() - started) / rows.length
  const times = rows.map(row => row.validation.botSeconds).sort((a, b) => a - b)
  const outOfBand = rows.filter(row => !(row.validation.botSeconds > format.seconds / 2 && row.validation.botSeconds <= format.botCeilingSeconds))
  const fallbacks = rows.filter(row => row.validation.attempt === 'fallback').length
  const retries = rows.filter(row => row.validation.attempt !== 0 && row.validation.attempt !== 'fallback').length
  const exponents = rows.map(row => Math.log10(row.def.targetBytes)).sort((a, b) => a - b)
  const quantile = (list, q) => list[Math.min(list.length - 1, Math.floor(q * list.length))]
  failed ||= outOfBand.length > 0
  console.log(`\n${format.label}: band (${fmt(format.seconds / 2)}, ${fmt(format.botCeilingSeconds)}] over ${rows.length} dates — ${ms.toFixed(0)} ms/definition`)
  console.log(`  bot win time  min ${fmt(times[0])} · median ${fmt(quantile(times, 0.5))} · max ${fmt(times[times.length - 1])} · out of band ${outOfBand.length}`)
  console.log(`  retried ${retries} · fallback ${fallbacks} · target 1e${exponents[0].toFixed(1)} … 1e${quantile(exponents, 0.5).toFixed(1)} … 1e${exponents[exponents.length - 1].toFixed(1)} B`)
  console.log(`  distinct condition sets ${new Set(rows.map(row => row.def.conditions.join(' + '))).size}`)
  for (const row of rows.slice(0, 6)) {
    const { def, validation } = row
    console.log(`    ${def.dateId}  earn ${def.targetBytes.toExponential(2)} B  [${def.conditions.join(', ') || 'no modifiers'}]  head start ${JSON.stringify(def.headStart)}  bot ${fmt(validation.botSeconds)}  attempt ${validation.attempt}`)
  }
}
process.exit(failed ? 1 : 0)
