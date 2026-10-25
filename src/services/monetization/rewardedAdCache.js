// A loaded AdMob rewarded ad stays valid for one hour; refresh a little before that.
export const REWARDED_AD_MAX_AGE_MS = 55 * 60 * 1000

/**
 * Keeps at most one rewarded ad loaded ahead of time. `preload()` starts (or reuses) a load;
 * `take()` resolves once a fresh ad is ready and marks it consumed, so the next `preload()` loads
 * a new one. A failed load is forgotten so the next call retries.
 */
export const createRewardedAdCache = (load, { now = () => Date.now(), maxAgeMs = REWARDED_AD_MAX_AGE_MS } = {}) => {
  let entry = null

  const preload = () => {
    if (entry && now() - entry.startedAt < maxAgeMs) return entry.promise
    const next = { startedAt: now(), promise: Promise.resolve().then(load) }
    next.promise.catch(() => {
      if (entry === next) entry = null
    })
    entry = next
    return next.promise
  }

  const take = async () => {
    await preload()
    entry = null
  }

  return { preload, take }
}
