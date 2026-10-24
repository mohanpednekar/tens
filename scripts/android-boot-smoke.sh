#!/usr/bin/env bash
# Installs an APK on the running emulator/device, launches it, and fails if the app crashes or the
# game UI never renders inside the Capacitor WebView. Used by mobile-build.yml to prove the
# R8-minified release build still boots; also handy locally: scripts/android-boot-smoke.sh <apk>.
set -euo pipefail

apk="${1:?usage: android-boot-smoke.sh <path-to-apk>}"
package="com.mohanpednekar.tens"

adb wait-for-device
adb install -r "$apk"
adb logcat -c
adb shell am start -W -n "$package/.MainActivity"
sleep 20

log="$(adb logcat -d)"
if grep -q "FATAL EXCEPTION" <<<"$log"; then
  grep -A30 "FATAL EXCEPTION" <<<"$log"
  echo "App crashed on launch." >&2
  exit 1
fi
if ! adb shell pidof "$package" >/dev/null; then
  echo "App process is not running after launch." >&2
  exit 1
fi
# Capacitor's own logging is off in release builds, so prove the game rendered by finding its
# bottom-nav label in the WebView's accessibility tree.
rendered=false
for _ in $(seq 1 12); do
  if adb exec-out uiautomator dump /dev/tty 2>/dev/null | grep -q 'Foundry'; then
    rendered=true
    break
  fi
  sleep 5
done
if [[ "$rendered" != true ]]; then
  adb logcat -d | grep -iE "capacitor|chromium|AndroidRuntime" | tail -40 || true
  echo "The game UI never appeared in the WebView." >&2
  exit 1
fi
echo "Boot smoke test passed: $package is running and the game UI rendered."
