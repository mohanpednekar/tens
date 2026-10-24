#!/usr/bin/env node
// Writes the ad-related keys into ios/App/App/Info.plist from the same flags capacitor.config.js
// reads (docs/RELEASE_IOS.md). Run after `cap sync ios` (yarn cap:ios / yarn ios:configure).
//
//   GADApplicationIdentifier  — always present (Google's sample id unless TENS_ADMOB_APP_ID_IOS is
//                               set); harmless when the AdMob SDK isn't linked, required when it is.
//   NSUserTrackingUsageDescription + SKAdNetworkItems — only when VITE_TENS_ADS_ENABLED=true, so a
//                               build without ads never shows or declares App Tracking Transparency.
//
// The keys live between marker comments, so re-running the script replaces them idempotently.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const START_MARKER = '<!-- tens:managed-ads:start -->'
export const END_MARKER = '<!-- tens:managed-ads:end -->'
export const ADMOB_TEST_APP_ID_IOS = 'ca-app-pub-3940256099942544~1458002511'
export const TRACKING_USAGE_DESCRIPTION =
  'Your choice lets the optional rewarded ads in Tens be more relevant to you. Tens works the same either way.'
// Google's own SKAdNetwork id; add third-party ids here if ad mediation is ever enabled.
export const SKADNETWORK_IDS = ['cstr6suwn9.skadnetwork']

const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const buildManagedBlock = ({ adsEnabled, admobAppId }) => {
  const lines = [
    `\t${START_MARKER}`,
    '\t<key>GADApplicationIdentifier</key>',
    `\t<string>${escapeXml(admobAppId)}</string>`,
  ]
  if (adsEnabled) {
    lines.push(
      '\t<key>NSUserTrackingUsageDescription</key>',
      `\t<string>${escapeXml(TRACKING_USAGE_DESCRIPTION)}</string>`,
      '\t<key>SKAdNetworkItems</key>',
      '\t<array>',
      ...SKADNETWORK_IDS.flatMap(id => [
        '\t\t<dict>',
        '\t\t\t<key>SKAdNetworkIdentifier</key>',
        `\t\t\t<string>${id}</string>`,
        '\t\t</dict>',
      ]),
      '\t</array>',
    )
  }
  lines.push(`\t${END_MARKER}`)
  return lines.join('\n')
}

export const applyManagedAdsKeys = (plistXml, options) => {
  const withoutBlock = plistXml.replace(new RegExp(`\\s*${START_MARKER}[\\s\\S]*?${END_MARKER}`), '')
  const closing = withoutBlock.lastIndexOf('</dict>')
  if (closing === -1) throw new Error('Info.plist has no top-level </dict>')
  return `${withoutBlock.slice(0, closing).replace(/\s*$/, '')}\n${buildManagedBlock(options)}\n${withoutBlock.slice(closing)}`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const plistPath = new URL('../ios/App/App/Info.plist', import.meta.url)
  const adsEnabled = process.env.VITE_TENS_ADS_ENABLED === 'true'
  const admobAppId = process.env.TENS_ADMOB_APP_ID_IOS || ADMOB_TEST_APP_ID_IOS
  writeFileSync(plistPath, applyManagedAdsKeys(readFileSync(plistPath, 'utf8'), { adsEnabled, admobAppId }))
  console.log(`Info.plist updated (ads ${adsEnabled ? 'enabled' : 'disabled'}, GADApplicationIdentifier ${admobAppId}).`)
}
