import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  formatBitsInNearestUnit,
  formatOfflineDuration,
  getAutobuyerUnlockMilestone,
  getOverclockRequirement,
  getSpeedUpRequirement,
  getTierTickspeedAutobuyerMilestone,
} from 'game/engine'
import {
  COMPUTE_BOOST_PRESETS,
  COMPUTE_CORES_PER_NODE,
  COMPUTE_ENTITY_CAP,
  COMPUTE_MERGE_RATIO,
  INTRO_BYTE_COMBINE_COST,
  INTRO_CAPACITY_MULTIPLIER,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  DISK_ARRAY_LADDER_CAP,
  DISK_BUILD_COST_MULTIPLIER,
  DISK_CACHE_BLOCK_COUNT,
  INTRO_DISK_UNLOCK_CAPACITY,
  TIER_DEFINITIONS,
  TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP,
} from 'game/layers'
import { version } from '../../../package.json'
import styled from 'styled-components'

// Everything on this page is static, evergreen prose about how the game's mechanics work — no
// game state is read here. It exists so MainPage (the actual game) doesn't have to carry this
// explanatory text inline; see CLAUDE.md's Architecture section for the split. The handful of
// numbers below (milestone/requirement thresholds) are derived from the same engine.js/layers.js
// constants the game itself uses rather than hardcoded, so they can't drift out of sync with the
// real rules if those constants ever change.
const RootDiv = styled.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`

const Header = styled.header`
  align-items: center;
  color: ${props => props.theme.color.text};
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;

  h1 {
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`

const VersionText = styled.span`
  color: ${props => props.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`

const Section = styled(StatCard)`
  h2 {
    font-size: ${props => props.theme.type.scale.lg.size};
    margin: 0 0 0.4rem;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    margin: 0 0 0.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

const InfoPage = ({ onBack }) => {
  const firstTierAutobuyerMilestone = getAutobuyerUnlockMilestone(TIER_DEFINITIONS[0].id)
  const lastTierAutobuyerMilestone = getAutobuyerUnlockMilestone(TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id)
  const firstTierTickspeedAutobuyerMilestone = getTierTickspeedAutobuyerMilestone(TIER_DEFINITIONS[0].id)
  const speedUpFirstRequirement = getSpeedUpRequirement(0) - 1
  const overclockFirstRequirement = getOverclockRequirement(0)

  return (
    <RootDiv>
      <Header>
        <div>
          <h1>Tens — Guide</h1>
          <VersionText>v{version}</VersionText>
        </div>
        <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
          <ButtonContent>← Back to game</ButtonContent>
        </Button>
      </Header>

      <Section aria-label="overview section">
        <h2>Overview</h2>
        <p>Build by powers of ten. Prestige for Prestige Points.</p>
        <p>
          Every tier is bought directly with Bits, the base currency, and once owned, produces the
          tier immediately below it — production cascades all the way down to Bits. Reaching
          1 Googol Bytes (8×10^100 Bits) freezes production except for Prestige. Once your balance
          reaches 8000 Bits (1000 Bytes), the main balance display switches over to showing whole
          Bytes instead — every cost and production number elsewhere keeps reading in Bits.
        </p>
      </Section>

      <Section aria-label="byte foundry section">
        <h2>Byte Foundry</h2>
        <p>
          Every fresh save — and every real Prestige after that — starts here, before Kilobytes
          exist. Tap to fill Memory with bits, then combine the first {INTRO_BYTE_COMBINE_COST} into
          a permanent Byte generator that produces passively from then on. Once Kilobytes are
          reached, the standalone Tap button is gone — Memory's own tile becomes the tap target
          instead, with the identical effect. Sacrifice drains Memory
          for ×{INTRO_CAPACITY_MULTIPLIER} more capacity; Invest drains it instead for permanently
          double production. A row of transfer blocks converts Memory into free Kilobytes — the
          first conversion unlocks the main game, with no limit on further transfers after that.
          A fixed priority order governs which of these (plus Storage and Compute below) you can
          take at any moment: whichever ranks highest that's currently affordable is the only one
          on offer.
        </p>
        <p>
          The Byte generator itself, and everything in Storage/Compute below, is permanent — carried
          over by every real Prestige. Only Memory's own balance and the main-game-unlock gate reset
          each cycle, so returning cycles are a fast pit-stop, not a full replay. Revisit this screen
          any time via MainPage's "⚙️ Byte Foundry" link.
        </p>
      </Section>

      <Section aria-label="storage section">
        <h2>Storage</h2>
        <p>
          Once Memory's capacity reaches {formatBitsInNearestUnit(INTRO_DISK_UNLOCK_CAPACITY)},
          build Disks — a growing ladder of sizes, each costing {DISK_BUILD_COST_MULTIPLIER}× its
          own size to build. Building takes real time, not just Bits: the array's very first disk
          takes 1 second per "KB" of its size (a 1 KB disk takes 1s, a 10 KB disk takes 10s, and so
          on), and every further disk added to that same array takes that same base time again,
          multiplied by its own position in the array — the array's 6th disk takes 6× as long as
          its 1st. While an array rebuilds to add a disk, every disk already in it goes offline —
          no filling, releasing, or redeeming — until the rebuild finishes.
        </p>
        <p>
          A built disk starts empty. Each array has its own small staging cache —{' '}
          {DISK_CACHE_BLOCK_COUNT} blocks together holding one disk's worth of bits — that Memory
          tops up first; only once the cache is completely full does it pour into an empty disk
          container, smallest array first. A full cache block can be released back into Memory by
          hand at any time, redirecting those bits elsewhere instead of waiting for the disk. A
          full disk redeems for 1 free unit of whichever tier's current per-unit price exactly
          matches its size right now — any tier, not just Kilobytes — then empties and refills
          again, ready to be reused; if more than one tier happens to match at once, the tier
          ranked earliest in the main game's own tier order wins. Redeeming happens automatically
          once that tier's own autobuyer is active, or by hand (cache block or disk) otherwise. Up
          to {DISK_ARRAY_LADDER_CAP} disks can ever be built at the ladder's current size before it
          advances to the next.
        </p>
      </Section>

      <Section aria-label="compute section">
        <h2>Compute</h2>
        <p>
          Once Memory's capacity reaches{' '}
          {formatBitsInNearestUnit(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY)}, a full Memory can convert
          into 1 Core — the cost is your entire current capacity, so a bigger capacity buys fewer
          but pricier Cores. Claiming a Core is a manual "Claim Core" click on the Byte Foundry
          screen by default; sacrificing {COMPUTE_ENTITY_CAP} held Nodes permanently automates it,
          after which Memory converts on its own and the manual button disappears. Every{' '}
          {COMPUTE_CORES_PER_NODE} Cores automatically convert into 1 Node either way.
        </p>
        <p>
          From Node onward, merging is your own choice: a Merge button (always available once
          reached, enabled at {COMPUTE_MERGE_RATIO} held) converts {COMPUTE_MERGE_RATIO} of one
          tier into 1 of the next, all the way up Node → Cluster → Network → Grid → Fabric → Cloud
          → Datacenter → Supercomputer → Megacomputer. Every tier caps at {COMPUTE_ENTITY_CAP} held.
          Sacrificing {COMPUTE_ENTITY_CAP} held units of the tier a merge produces permanently
          unlocks auto-merge for that step — once unlocked, the same {COMPUTE_MERGE_RATIO}-for-1
          merge also fires on its own whenever the input tier is completely full
          ({COMPUTE_ENTITY_CAP}, not {COMPUTE_MERGE_RATIO}), leaving the manual button just as
          usable alongside it.
        </p>
        <p>
          Spend 1 Core on a Compute Boost — Burst (×{COMPUTE_BOOST_PRESETS.burst.multiplier} for{' '}
          {formatOfflineDuration(COMPUTE_BOOST_PRESETS.burst.durationSeconds)}), Standard
          (×{COMPUTE_BOOST_PRESETS.standard.multiplier} for{' '}
          {formatOfflineDuration(COMPUTE_BOOST_PRESETS.standard.durationSeconds)}), or Sustain
          (×{COMPUTE_BOOST_PRESETS.sustain.multiplier} for{' '}
          {formatOfflineDuration(COMPUTE_BOOST_PRESETS.sustain.durationSeconds)}) — for a temporary
          production multiplier on both Memory and Kilobytes at once, shown at the top of the
          Compute screen while active. Activating the same preset again while it's already running
          stacks it instead, extending the remaining time additively; the most recent unused stack
          can also be reclaimed, one at a time, refunding 1 Core.
        </p>
      </Section>

      <Section aria-label="tickspeed section">
        <h2>Tickspeed</h2>
        <p>
          Spend Bits to permanently speed up every tier's production ticks by another 1% at once —
          more frequent deliveries, not bigger ones. Each level costs another power of ten. Unlocks
          once you own {TIER_DEFINITIONS[1].name}.
        </p>
      </Section>

      <Section aria-label="speed up section">
        <h2>Speed Up</h2>
        <p>
          Reach the required level on {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name} to
          trigger a Speed Up: resets your tiers and resources (keeps unlocked autobuyers and
          Prestige Points) and permanently doubles production speed. The first Speed Up needs
          level {speedUpFirstRequirement}; each one after that needs one more level than the last.
        </p>
      </Section>

      <Section aria-label="overclock section">
        <h2>Overclock</h2>
        <p>
          Reach the required level on {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name} to
          claim an Overclock level: resets your tiers and resources just like Speed Up (keeps
          unlocked autobuyers and Prestige Points) but also wipes Speed Up's own stacking bonus
          back to zero — in exchange, it permanently multiplies the Tickspeed upgrade's own
          per-level rate by ×1.1, compounding with every level claimed (1% → 1.1% → 1.21% → …),
          across both its regular levels and its every-10th-level milestone bonus. The first level
          needs level {overclockFirstRequirement}; each one after that needs one more level than
          the last. Falling behind doesn't cost you progress — claiming jumps straight to whatever
          level {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name} has already reached, so you
          never have to claim every intermediate level one at a time.
        </p>
      </Section>

      <Section aria-label="tier autobuyers section">
        <h2>Tier Autobuyers</h2>
        <p>
          Each tier's unit-buying autobuyer and its tickspeed autobuyer unlock automatically as you
          prestige more — see the Milestones section below for exactly when. Once unlocked, the
          ⏸/▶ button next to each pauses or resumes it without losing the unlock. Smart is a
          one-time Prestige Point purchase that makes a tier's unit-buying autobuyer buy one at a
          time until a full level is affordable, then in blocks after that — fixing an early-game
          stall where a full level isn't affordable yet.
        </p>
      </Section>

      <Section aria-label="milestones section">
        <h2>Milestones</h2>
        <p>
          Tier Autobuyer Unlocks: unlocks one tier per prestige, starting at Prestige{' '}
          {firstTierAutobuyerMilestone} for {TIER_DEFINITIONS[0].name}, up through
          Prestige {lastTierAutobuyerMilestone} for {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name}.
        </p>
        <p>
          Tier Tickspeed Autobuyers: unlocks later — starting at
          Prestige {firstTierTickspeedAutobuyerMilestone}, every{' '}
          {TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP} prestiges after that.
        </p>
      </Section>
    </RootDiv>
  )
}

export default InfoPage
