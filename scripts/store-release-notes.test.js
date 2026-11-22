import { APP_STORE_LIMIT, PLAY_LIMIT, changelogSection, formatNotes, releaseBullets, versionCode } from './store-release-notes.mjs'

const CHANGELOG = `# Changelog

## [Unreleased]

### Added

## [1.2.3] - 2026-11-01

### Fixed
- A **bold** fix in \`code\` (#12). Extra detail sentence.

### Added
- New [thing](https://x) with Space Grotesk 1.5x speed: more words.
- Second feature.

## [1.2.2] - 2026-10-01

### Added
- Old entry.
`

describe('store-release-notes', () => {
  test('versionCode matches the Gradle formula', () => {
    expect(versionCode('0.5.0')).toBe(500)
    expect(versionCode('1.2.3')).toBe(10203)
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
    expect(formatNotes(['x'.repeat(600)], PLAY_LIMIT)).toHaveLength(PLAY_LIMIT)
  })
})
