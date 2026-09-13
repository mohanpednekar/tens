const fs = require('fs');
let content = fs.readFileSync('docs/ECONOMY_REFERENCE.md', 'utf8');

const search = `<<<<<<< HEAD
\`getScaleUpRequirement(state)\` is a flat \`TIER_UNLOCK_PREV_LEVEL_REQUIREMENT\` (3) — the SAME level
that unlocks the next tier via \`isTierUnlocked\` — while \`scaleUpTargetTierIndex\` hasn't yet reached
\`TIER_DEFINITIONS.length - 1\`; once it has, the requirement remains \`SCALE_UP_FINAL_TIER_REQUIREMENT_STEP\` (3): because each Scale Up resets tier levels, every activation requires a fresh three-level climb. \`scaleUpGame\` (\`engine.js\`) checks
\`state.purchaseLevels[getScaleUpTargetTier(state).id] >= getScaleUpRequirement(state)\`, and on
success resets resources/owned/purchased (everything a fresh \`createInitialGameState()\` would have)
but doubles production for only the tiers already unlocked before the claim — tracked per tier in \`state.scaleUpTierCounts\`; the next tier starts at ×1 — AND
increments \`scaleUpTargetTierIndex\` by 1 unconditionally, advancing the target to the next tier.
<<<<<<< HEAD
Each activation increments \`scaleUpCount\` by 1 too, while each included tier’s own multiplier stacks: 1x → 2x → 4x → 8x → …, always doubling — \`scaleUpCount\` and \`scaleUpTargetTierIndex\` are separate counters (the former
never resets on Scale Up itself and drives only the multiplier; the latter drives only the
requirement and IS what Scale Up itself advances). See \`docs/DESIGN_HISTORY.md\` for why an
escalating requirement exists at all once the last tier is reached (empirically-confirmed stall +
cost-curve dodge otherwise) and for the redesign from a last-tier-only gate to this per-tier one.
=======
Each activation increments \`scaleUpCount\` by 1 too, while each included tier’s own
\`scaleUpTierCounts\` entry stacks: 0 → 1 → 2 → 3 → …, producing 1x → 2x → 4x → 8x → …. The aggregate
\`scaleUpCount\` is retained for progress/status display and legacy-save fallback; production reads
the per-tier counters. \`scaleUpTargetTierIndex\` separately drives the target and advances on every
claim. See \`docs/DESIGN_HISTORY.md\` for the redesign from a last-tier-only gate to this per-tier one.
>>>>>>> origin/main
=======
\`getScaleUpRequirement(state)\` is level 3 before the final tier. At the final tier it advances by
three per claim: 3, 6, 9, and so on. A predecessor reaching level 3 does not itself reveal a new tier.
Only a successful \`scaleUpGame\` records the successor in \`everUnlockedTierIds\`. After resets, a
recorded tier re-reveals when its predecessor reaches level 2. Each claim increments the per-tier
Scale Up count for the target and every earlier tier, producing the first-final-tier distribution
×1024, ×512, ×256, ×128, ×64, ×32, ×16, ×8, ×4, ×2; later final-tier claims double all ten again.
>>>>>>> origin/main`;

const replace = `\`getScaleUpRequirement(state)\` is level 3 before the final tier. At the final tier it advances by
three per claim: 3, 6, 9, and so on. A predecessor reaching level 3 does not itself reveal a new tier.
Only a successful \`scaleUpGame\` records the successor in \`everUnlockedTierIds\`. After resets, a
recorded tier re-reveals when its predecessor reaches level 2. Each claim increments the per-tier
Scale Up count for the target and every earlier tier, producing the first-final-tier distribution
×1024, ×512, ×256, ×128, ×64, ×32, ×16, ×8, ×4, ×2; later final-tier claims double all ten again.`;

if (content.includes(search)) {
  fs.writeFileSync('docs/ECONOMY_REFERENCE.md', content.replace(search, replace));
  console.log("Success");
} else {
  console.log("Not found");
}
