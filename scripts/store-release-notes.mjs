#!/usr/bin/env node
// Writes store "What's new" text for the current package.json version from CHANGELOG.md:
//   fastlane/metadata/android/en-US/changelogs/<versionCode>.txt  (Play, ≤ 500 chars)
//   fastlane/metadata/ios/en-US/release_notes.txt                 (App Store, ≤ 4000 chars)
// Each bullet keeps only its first sentence, markdown stripped, Added → Changed → Fixed, cut at the
// limit with "…and more". `fastlane/release-notes.txt`, when present (gitignored), wins verbatim —
// for a hand-written note such as the first store launch.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const PLAY_LIMIT = 500
export const APP_STORE_LIMIT = 4000
const SECTION_ORDER = ['Added', 'Changed', 'Fixed']

// Mirrors android/app/build.gradle's appVersionCode, including its TENS_VERSION_CODE override
// (env here; the Gradle-property / keystore.properties forms of the override are local-only).
export const versionCode = (version, override = process.env.TENS_VERSION_CODE) => {
  if (override) return Number(override)
  const [major, minor, patch] = version.split('.').map(Number)
  return major * 10000 + minor * 100 + patch
}

// CHANGELOG.md also records tooling/automation changes; players never see those.
const INTERNAL_ENTRY = /\b(workflows?|CI|autonomous|maintenance|Dependabot|GitHub|pull requests?|PRs?|CLAUDE\.md|AGENTS\.md|agents?|lint(ing)?|Vitest|Playwright|e2e|graphify|fastlane|changelog|docs?|tests?|mutation|CodeQL|deploy(ment)?)\b/i
export const isPlayerFacing = bullet => !INTERNAL_ENTRY.test(bullet)

export const changelogSection = (changelog, version) => {
  const lines = changelog.split('\n')
  const start = lines.findIndex(line => line.startsWith(`## [${version}]`))
  if (start === -1) return null
  const end = lines.findIndex((line, index) => index > start && line.startsWith('## ['))
  return lines.slice(start + 1, end === -1 ? undefined : end).join('\n')
}

const plain = text => text
  .replace(/\*\*([^*]+)\*\*/g, '$1')
  .replace(/`([^`]+)`/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/\s*\(#\d+[^)]*\)/g, '')
  .replace(/\s+/g, ' ')
  .trim()

const firstSentence = text => {
  const match = text.match(/^.+?[.!?](?=\s|$)/)
  return (match ? match[0] : text).replace(/[:;,]$/, '')
}

export const releaseBullets = section => {
  const groups = {}
  let current = null
  for (const line of section.split('\n')) {
    const heading = line.match(/^### (\w+)/)
    if (heading) { current = heading[1]; continue }
    const bullet = line.match(/^- (.+)/)
    if (bullet && current && isPlayerFacing(bullet[1])) (groups[current] ??= []).push(firstSentence(plain(bullet[1])))
  }
  return SECTION_ORDER.flatMap(name => groups[name] ?? [])
}

export const formatNotes = (bullets, limit) => {
  const more = '…and more'
  const lines = []
  for (const bullet of bullets) {
    const next = [...lines, `• ${bullet}`].join('\n')
    if (next.length + more.length + 1 > limit) {
      if (lines.length === 0) return `• ${bullet.slice(0, limit - 3)}…`
      lines.push(more)
      break
    }
    lines.push(`• ${bullet}`)
  }
  return lines.length ? lines.join('\n') : 'Bug fixes and improvements.'
}

export const PATHS = {
  play: code => `fastlane/metadata/android/en-US/changelogs/${code}.txt`,
  appStore: 'fastlane/metadata/ios/en-US/release_notes.txt',
  override: 'fastlane/release-notes.txt',
}

const write = (path, text) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, `${text}\n`) }

const main = () => {
  const { version } = JSON.parse(readFileSync('package.json', 'utf8'))
  let play
  let appStore
  if (existsSync(PATHS.override)) {
    appStore = readFileSync(PATHS.override, 'utf8').trim()
    play = appStore.length > PLAY_LIMIT ? `${appStore.slice(0, PLAY_LIMIT - 1)}…` : appStore
  } else {
    const section = changelogSection(readFileSync('CHANGELOG.md', 'utf8'), version)
    if (section === null) throw new Error(`CHANGELOG.md has no ## [${version}] section — run yarn bump-version first`)
    const bullets = releaseBullets(section)
    play = formatNotes(bullets, PLAY_LIMIT)
    appStore = formatNotes(bullets, APP_STORE_LIMIT)
  }
  write(PATHS.play(versionCode(version)), play)
  write(PATHS.appStore, appStore)
  console.log(`release notes for ${version} (versionCode ${versionCode(version)}) written`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main()
