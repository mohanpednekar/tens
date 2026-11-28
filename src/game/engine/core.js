// Shared engine primitives (issue #1212). Leaf module — imports nothing from engine.js.

export const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)
