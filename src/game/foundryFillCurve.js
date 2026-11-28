export const getFillMultiplierPercent = (fillFraction, speed = 1) => {
  const fraction = Math.min(1, Math.max(0, fillFraction))
  return 100 * speed ** (1 - 2 * fraction)
}

// Integrate the reciprocal of the instantaneous rate over a fill interval.
export const getFillCurveSeconds = (startAmount, endAmount, capacity, rate, speed = 1) => {
  if (!(capacity > 0 && rate > 0)) return null
  const start = Math.max(0, startAmount)
  const end = Math.min(capacity, endAmount)
  if (end <= start) return null
  if (speed === 1) return (end - start) / rate
  const slope = 2 * Math.log(speed)
  return (capacity / rate) * speed ** (2 * start / capacity - 1)
    * Math.expm1(slope * ((end - start) / capacity)) / slope
}

// Invert the same integral so splitting an elapsed interval into ticks preserves delivered bits.
export const getFillCurveDelta = (startAmount, capacity, rate, elapsed, speed = 1) => {
  if (!(capacity > 0 && rate > 0 && elapsed > 0)) return 0
  const start = Math.max(0, startAmount)
  const room = capacity - start
  if (room <= 0) return 0
  if (speed === 1) return Math.min(room, rate * elapsed)
  if (elapsed >= getFillCurveSeconds(start, capacity, capacity, rate, speed)) return room
  const slope = 2 * Math.log(speed)
  return Math.min(room, (Math.log1p(slope * (rate / capacity) * speed ** (1 - 2 * start / capacity) * elapsed) / slope) * capacity)
}
