import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ADMOB_TEST_APP_ID_IOS, END_MARKER, START_MARKER, applyManagedAdsKeys } from './configure-ios-plist.mjs'

const plist = readFileSync(join(process.cwd(), 'ios/App/App/Info.plist'), 'utf8')

describe('configure-ios-plist', () => {
  it('adds only GADApplicationIdentifier when ads are off', () => {
    const out = applyManagedAdsKeys(plist, { adsEnabled: false, admobAppId: ADMOB_TEST_APP_ID_IOS })
    expect(out).toContain(`<string>${ADMOB_TEST_APP_ID_IOS}</string>`)
    expect(out).not.toContain('NSUserTrackingUsageDescription')
    expect(out).not.toContain('SKAdNetworkItems')
    expect(out.trimEnd().endsWith('</dict>\n</plist>')).toBe(true)
  })

  it('adds the ATT usage string and SKAdNetwork ids when ads are on, idempotently', () => {
    const once = applyManagedAdsKeys(plist, { adsEnabled: true, admobAppId: 'ca-app-pub-1~2' })
    const twice = applyManagedAdsKeys(once, { adsEnabled: true, admobAppId: 'ca-app-pub-1~2' })
    expect(twice).toBe(once)
    expect(once).toContain('NSUserTrackingUsageDescription')
    expect(once).toContain('cstr6suwn9.skadnetwork')
    expect(once.split(START_MARKER)).toHaveLength(2)
    const off = applyManagedAdsKeys(once, { adsEnabled: false, admobAppId: 'ca-app-pub-1~2' })
    expect(off).not.toContain('NSUserTrackingUsageDescription')
    expect(off.split(END_MARKER)).toHaveLength(2)
  })

  it('keeps the committed Info.plist in the ads-off state', () => {
    expect(plist).toContain('GADApplicationIdentifier')
    expect(plist).not.toContain('NSUserTrackingUsageDescription')
    expect(plist).toContain('<key>ITSAppUsesNonExemptEncryption</key>')
  })
})
