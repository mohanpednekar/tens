import { APP_STORE_LIMIT, PLAY_LIMIT, changelogSection, formatNotes, isPlayerFacing, releaseBullets, versionCode } from './store-release-notes.mjs'

const CHANGELOG = `# Changelog

## [Unreleased]

### Added

## [1.2.3] - 2026-11-01

### Fixed
- A **bold** fix in \`code\` (#12). Extra detail sentence.

### Added
- New [thing](https://x) with Space Grotesk 1.5x speed: more words.
- Second feature.
- Low-risk auto-merge for the autonomous maintenance workflow.
- Achievements page shows each requirement's progress (e.g. 100/256) while
  unearned. Second sentence.
- A Power tier's bottom row is now called the **Charger** (labels, Manual and docs).
- Hidden refactor. <!-- internal -->

## [1.2.2] - 2026-10-01

### Added
- Old entry.
`

describe('store-release-notes', () => {
  test('versionCode matches the Gradle formula', () => {
    expect(versionCode('0.5.0', '')).toBe(5000)
    expect(versionCode('0.100.0', '')).toBeLessThan(versionCode('1.0.0', ''))
    expect(versionCode('1.2.3', '')).toBe(1002003)
    expect(versionCode('1.2.3', '10299')).toBe(10299)
  })

  test('isPlayerFacing drops tooling entries', () => {
    expect(isPlayerFacing('Low-risk auto-merge for the autonomous maintenance workflow.')).toBe(false)
    expect(isPlayerFacing('Granted the issues permission to the CI job.')).toBe(false)
    expect(isPlayerFacing('Achievement stars: each achievement awards 1 star.')).toBe(true)
    expect(isPlayerFacing('Light theme contrast fix (tests and docs updated).')).toBe(true)
    expect(isPlayerFacing('Capacitor foundation — @capacitor/core + @capacitor/cli')).toBe(false)
    expect(isPlayerFacing('Dev Mode — a local, dev-build-only sandbox')).toBe(false)
  })

  test('changelogSection returns only the requested version', () => {
    const section = changelogSection(CHANGELOG, '1.2.3')
    expect(section).toContain('A **bold** fix')
    expect(section).not.toContain('Old entry')
    expect(changelogSection(CHANGELOG, '9.9.9')).toBeNull()
  })

  test('releaseBullets orders Added → Changed → Fixed and strips markdown to the first sentence', () => {
    expect(releaseBullets(changelogSection(CHANGELOG, '1.2.3'))).toEqual([
      'New thing with Space Grotesk 1.5x speed: more words.',
      'Second feature.',
      "Achievements page shows each requirement's progress (e.g. 100/256) while unearned.",
      "A Power tier's bottom row is now called the Charger (labels, Manual and docs).",
      'A bold fix in code.',
    ])
  })

  test('formatNotes stays within the limit and says when it cut', () => {
    const bullets = Array.from({ length: 200 }, (_, index) => `Feature number ${index} does something useful.`)
    for (const limit of [PLAY_LIMIT, APP_STORE_LIMIT]) {
      const notes = formatNotes(bullets, limit)
      expect(notes.length).toBeLessThanOrEqual(limit)
      expect(notes.endsWith('…and more')).toBe(true)
    }
    expect(formatNotes(['Short.'], PLAY_LIMIT)).toBe('• Short.')
    expect(formatNotes([], PLAY_LIMIT)).toBe('Bug fixes and improvements.')
    const single = formatNotes(['x'.repeat(600)], PLAY_LIMIT)
    expect(single).toHaveLength(PLAY_LIMIT)
    expect(single.startsWith('• ')).toBe(true)
  })
})
