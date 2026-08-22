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
  COMPUTE_AUTO_BOOST_UNLOCK_COST,
  COMPUTE_BOOST_MAX_STACKS,
  COMPUTE_BOOST_PRESETS,
  COMPUTE_BOOST_TIER_POWER_STEP,
  COMPUTE_CORES_PER_NODE,
  COMPUTE_ENTITY_CAP,
  COMPUTE_MERGE_CORE_EARN_MULTIPLIER,
  COMPUTE_MERGE_RATIO,
  COMPUTE_MERGE_RESERVE_CAP,
  COMPUTE_MERGE_STEP_MULTIPLIER,
  COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED,
  COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC,
  COMPUTE_FLOPS_FIRST_TIER_COST_PP,
  COMPUTE_FLOPS_LAST_TIER_COST_PP,
  COMPUTE_FLOPS_REVEAL_PP,
  INTRO_BYTE_COMBINE_COST,
  INTRO_CAPACITY_MULTIPLIER,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  DISK_ARRAY_LADDER_CAP,
  DISK_BUILD_COST_MULTIPLIER,
  DISK_CACHE_BLOCK_COUNT,
  INTRO_DISK_UNLOCK_CAPACITY,
  INTRO_PRODUCTION_MULTIPLIER_STEP,
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
  color: ${props => props.theme.color.text};
  text-align: center;

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

  h3 {
    color: ${props => props.theme.color.text};
    font-size: ${props => props.theme.type.scale.md.size};
    font-weight: 600;
    margin: 0.65rem 0 0.25rem;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    margin: 0 0 0.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul {
    color: ${props => props.theme.color.textMuted};
    margin: 0 0 0.5rem;
    padding-left: 1.15rem;
  }

  ul:last-child {
    margin-bottom: 0;
  }

  li {
    margin: 0 0 0.3rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  ul ul {
    margin: 0.25rem 0 0.15rem;
  }
`

const InfoPage = () => {
  const firstTierAutobuyerMilestone = getAutobuyerUnlockMilestone(TIER_DEFINITIONS[0].id)
  const lastTierAutobuyerMilestone = getAutobuyerUnlockMilestone(TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id)
  const firstTierTickspeedAutobuyerMilestone = getTierTickspeedAutobuyerMilestone(TIER_DEFINITIONS[0].id)
  const speedUpFirstRequirement = getSpeedUpRequirement(0) - 1
  const overclockFirstRequirement = getOverclockRequirement(0)
  const lastTierName = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name
  const firstTierName = TIER_DEFINITIONS[0].name
  const secondTierName = TIER_DEFINITIONS[1].name

  return (
    <RootDiv>
      <Header>
        <h1>Tens — Guide</h1>
        <VersionText>v{version}</VersionText>
      </Header>

      <Section aria-label="overview section">
        <h2>Overview</h2>
        <ul>
          <li>Everything scales by powers of ten — costs, production, and many upgrades.</li>
          <li>Buy every tier with <strong>Bits</strong> (the base currency).</li>
          <li>Each owned tier produces the tier below it; production cascades down to Bits.</li>
          <li>
            The main balance switches from Bits to whole Bytes once you hit 8000 Bits (1000 Bytes).
            Costs and other production numbers still show in Bits.
          </li>
          <li>
            Hitting <strong>1 Googol Bytes</strong> (8×10^100 Bits) freezes production until you Prestige.
          </li>
        </ul>
      </Section>

      <Section aria-label="byte foundry section">
        <h2>Byte Foundry</h2>
        <p>
          Every fresh save — and every Prestige — starts here before {firstTierName} exist.
          Reopen any time from the bottom nav’s Foundry item.
        </p>

        <h3>The loop</h3>
        <ul>
          <li>
            <strong>Tap</strong> fills Memory with bits (one second of production per tap at the
            current rate). After the main game unlocks, Memory’s own tile is the tap target —
            the standalone Tap button goes away.
          </li>
          <li>
            Combine the first {INTRO_BYTE_COMBINE_COST} bits into a permanent Byte generator that
            produces passively forever after.
          </li>
          <li>
            <strong>Sacrifice</strong> drains Memory for ×{INTRO_CAPACITY_MULTIPLIER} capacity
            (only when Memory is full and nothing higher-priority is available).
          </li>
          <li>
            <strong>Invest</strong> spends Memory on an independent cost ladder for permanently
            ×{INTRO_PRODUCTION_MULTIPLIER_STEP} production (doesn’t require a full balance). When
            that bit cost exceeds Memory capacity, you can instead sacrifice {COMPUTE_ENTITY_CAP} of
            the next Compute tier (Cores → … → Megacomputers, once each) for the same ×2 — separate
            from auto-merge sacrifices. Memory Sacrifice rolls those compute-funded Bandwidth
            claims back.
          </li>
          <li>
            <strong>Transfer blocks</strong> convert Memory into free {firstTierName} at
            {firstTierName}’ current per-unit cost. The first transfer unlocks the main game;
            there’s no per-cycle cap after that. Auto-convert keeps running even when the manual
            row is hidden.
          </li>
        </ul>

        <h3>What resets vs. what stays</h3>
        <ul>
          <li>
            <strong>Resets each Prestige:</strong> Memory balance and the main-game unlock gate.
          </li>
          <li>
            <strong>Permanent:</strong> the Byte generator, capacity/production upgrades, Disks,
            and every Compute entity.
          </li>
          <li>Later cycles are a fast pit-stop, not a full replay.</li>
        </ul>

        <h3>Forced priority</h3>
        <p>When more than one upgrade is affordable, only the highest-ranked action is available:</p>
        <ul>
          <li>Disk Fill → Bandwidth/Invest → Disk Build → Compute Boost → Memory/Sacrifice</li>
        </ul>
      </Section>

      <Section aria-label="storage section">
        <h2>Storage</h2>
        <p>
          Unlocks once Memory capacity reaches {formatBitsInNearestUnit(INTRO_DISK_UNLOCK_CAPACITY)}.
          Open it from the bottom nav’s Storage item.
        </p>

        <h3>Building Disks</h3>
        <ul>
          <li>
            Each array costs {DISK_BUILD_COST_MULTIPLIER}× its size in bits (paid up front).
          </li>
          <li>
            Build time is real: the first disk of a size takes 1s per “KB” of that size; the Nth
            disk of the same array takes N× that base time.
          </li>
          <li>
            While an array rebuilds, every disk in it is offline — no fill, release, or redeem —
            until the build finishes.
          </li>
          <li>
            Up to {DISK_ARRAY_LADDER_CAP} disks can be built at the current size before the ladder
            advances. Sizes are every Byte power of ten (1 KB → 10 KB → 100 KB → 1 MB → 10 MB → …)
            with no gaps.
          </li>
          <li>The Build button always stays on Byte Foundry; Storage shows every size you’ve reached.</li>
        </ul>

        <h3>Cache, fill, release, redeem</h3>
        <ul>
          <li>
            Each array keeps a Cache of {DISK_CACHE_BLOCK_COUNT} blocks totaling one disk’s worth
            of bits (e.g. a 1 MB array → 8 × 1 Mb). Cache stays full as its steady state; Memory
            refills whole blocks when a block was just released or the size was just unlocked —
            Memory fills visibly between transfers rather than draining bit-by-bit.
          </li>
          <li>
            Empty disks fill from Memory directly (smallest array first). Cache does not pour into
            disks.
          </li>
          <li>
            A full cache block can be <strong>released into your Bits balance</strong> (not back
            into Memory) — but only while some tier’s current per-unit cost matches that array’s
            size. That is Cache’s only use: manually funding matching main-game level blocks.
          </li>
          <li>
            A full disk <strong>redeems</strong> for 1 free unit of whichever tier’s current price
            exactly matches its size (any tier). Ties break toward the earliest tier in the main
            ladder.
          </li>
          <li>
            Auto-redeem fires only when that matching tier’s unit autobuyer is unlocked and
            unpaused; otherwise redeem by hand.
          </li>
          <li>Disks are reusable and permanent across Prestige; a full disk stays full through Prestige.</li>
        </ul>
      </Section>

      <Section aria-label="boosters section">
        <h2>Boosters</h2>
        <p>
          Unlocks once Memory capacity reaches{' '}
          {formatBitsInNearestUnit(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY)}. Open it from the bottom
          nav’s Boosters item.
        </p>

        <h3>Cores</h3>
        <ul>
          <li>
            A full Memory converts into 1 Core — the cost is your entire current capacity, so bigger
            capacity means fewer but pricier Cores.
          </li>
          <li>
            Claim Core is manual on Byte Foundry by default. Sacrificing {COMPUTE_ENTITY_CAP} held
            Nodes permanently unlocks auto-claim (manual button then disappears).
          </li>
          <li>
            Every {COMPUTE_CORES_PER_NODE} Cores convert toward 1 Node (via the Core → Node merge
            boundary).
          </li>
          <li>Every compute entity caps at {COMPUTE_ENTITY_CAP} held.</li>
        </ul>

        <h3>Merge chain</h3>
        <ul>
          <li>
            Chain: Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter →
            Supercomputer → Megacomputer.
          </li>
          <li>
            Manual merge: convert {COMPUTE_MERGE_RATIO} of one tier into 1 of the next (enabled at
            {COMPUTE_MERGE_RATIO} held).
          </li>
          <li>
            Sacrifice {COMPUTE_ENTITY_CAP} held units of the produced tier to unlock auto-merge for
            that boundary.
          </li>
          <li>
            After unlock: merging uses an {COMPUTE_MERGE_RESERVE_CAP}-slot reserve with a timed
            countdown. Core → Node takes {COMPUTE_MERGE_CORE_EARN_MULTIPLIER}× the time to earn one
            Core at your current Memory fill rate (capacity ÷ bits/sec, before Boost). Each next
            boundary is ×{COMPUTE_MERGE_STEP_MULTIPLIER} the previous layer’s duration — or ×
            {COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED} after that boundary’s sequential duration
            upgrade (sacrifice {COMPUTE_ENTITY_CAP} held tokens of its input tier once auto-merge
            is unlocked). Before unlock, merges stay instant.
          </li>
          <li>
            Duration upgrades are sequential (Core → Node first through Supercomputer →
            Megacomputer). Upgrading a step clears that rung’s merge bottleneck; the next
            unupgraded ×{COMPUTE_MERGE_STEP_MULTIPLIER} step becomes the new one. Later layers
            rescale from the new chain. An in-flight timer keeps the duration snapshotted at start.
          </li>
          <li>Auto-merge starts when the input tier’s normal slots are completely full ({COMPUTE_ENTITY_CAP}).</li>
        </ul>

        <h3>Compute Boost</h3>
        <ul>
          <li>
            Click any tier row to arm Burst / Standard / Sustain at that tier’s scaled power
            and duration. Spend 1 token of the armed tier to activate.
          </li>
          <li>
            Base (Core) presets:{' '}
            Burst ×{COMPUTE_BOOST_PRESETS.burst.multiplier} for{' '}
            {formatOfflineDuration(COMPUTE_BOOST_PRESETS.burst.durationSeconds)}; Standard ×
            {COMPUTE_BOOST_PRESETS.standard.multiplier} for{' '}
            {formatOfflineDuration(COMPUTE_BOOST_PRESETS.standard.durationSeconds)}; Sustain ×
            {COMPUTE_BOOST_PRESETS.sustain.multiplier} for{' '}
            {formatOfflineDuration(COMPUTE_BOOST_PRESETS.sustain.durationSeconds)}.
          </li>
          <li>
            Higher tiers: multiplier ×{COMPUTE_BOOST_TIER_POWER_STEP} per step; duration ×2 per
            step. Boost multiplies Memory production and {firstTierName} production at
            once.
          </li>
          <li>
            Only one boost runs at a time. To switch to a different preset or funding tier, you
            must <strong>Forfeit</strong> the active boost (no refund) — the UI asks for explicit
            confirmation. Same preset + tier while active uses <strong>Stack</strong> instead.
          </li>
          <li>
            While active: <strong>Stack</strong> spends another token of the active boost’s own
            funding tier to extend duration (up to {COMPUTE_BOOST_MAX_STACKS} stacks; multiplier
            doesn’t compound). <strong>Reclaim</strong> undoes the most recent unused stack,
            refunding 1 token. <strong>Forfeit</strong> cancels everything with no refund
            (confirmation required).
          </li>
          <li>
            <strong>Auto-Boost</strong> ({COMPUTE_AUTO_BOOST_UNLOCK_COST} PP, one-time): when a
            tier is full and waiting on its own in-flight reserve merge, automatically activates
            (or stacks) your preferred preset from the <strong>biggest</strong> such tier (default
            Standard). Preference is selectable on Boosters after unlock. Never forfeits an active
            boost to switch presets.
          </li>
          <li>Megacomputer’s only use is funding a Boost.</li>
        </ul>
      </Section>

      <Section aria-label="compute flops section">
        <h2>Compute</h2>
        <p>
          A separate PP-funded screen (nav <strong>Compute</strong>) with ten tiers{' '}
          <strong>KFlops → QFlops</strong>, each boosting the matching Factory tier. Reveals once
          you hold {COMPUTE_FLOPS_REVEAL_PP} PP; the first tier costs{' '}
          {COMPUTE_FLOPS_FIRST_TIER_COST_PP.toLocaleString()} PP, so the screen is visible before
          you can buy anything.
        </p>
        <ul>
          <li>
            Base costs follow the same 10³ ladder as Factory tiers (
            {COMPUTE_FLOPS_FIRST_TIER_COST_PP.toLocaleString()} –{' '}
            {COMPUTE_FLOPS_LAST_TIER_COST_PP.toExponential(0).replace('+', '')} PP). Per-unit price
            then rises on <strong>every</strong> purchase via the triangular power-of-ten epoch (same
            curve as Factory, but not gated behind 8-purchase level blocks).
          </li>
          <li>
            Each owned unit adds{' '}
            {(COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * 100).toFixed(2)}% per real second to its
            matching Factory tier — linear in owned count, applied as production multiplier{' '}
            <strong>(1 + cumulative boost)</strong>.
          </li>
          <li>
            Cumulative boost per tier displays in the hero as <strong>Flops</strong> using{' '}
            <strong>E = k + 10M + 100G + 1000T + … + 10⁹Q</strong> (each tier's boost weighted by
            10<sup>n</sup>, K = 10⁰ through Q = 10⁹). Production still uses the unweighted per-tier
            boost. Totals reset each Prestige; owned unit counts are permanent.
          </li>
        </ul>
      </Section>

      <Section aria-label="tickspeed section">
        <h2>Tickspeed</h2>
        <ul>
          <li>
            Spend Bits to permanently speed up every tier’s production ticks by another 1% at once —
            more frequent deliveries, not bigger ones.
          </li>
          <li>Each level costs another power of ten.</li>
          <li>Unlocks once you own {secondTierName}.</li>
          <li>
            There’s also a per-tier tickspeed track on each unlocked tier row, funded the same way.
          </li>
        </ul>
      </Section>

      <Section aria-label="speed up section">
        <h2>Speed Up</h2>
        <ul>
          <li>
            Reach the required level on {lastTierName} to trigger a Speed Up.
          </li>
          <li>
            Resets tiers and resources; keeps unlocked autobuyers and Prestige Points.
          </li>
          <li>Permanently doubles production speed each time (stacks: ×2, ×4, ×8, …).</li>
          <li>
            First Speed Up needs displayed level {speedUpFirstRequirement}; each later one needs
            one more level than the last.
          </li>
          <li>Byte Foundry state (including Memory) is untouched — this is an intra-cycle soft reset.</li>
        </ul>
      </Section>

      <Section aria-label="overclock section">
        <h2>Overclock</h2>
        <ul>
          <li>
            Reach the required level on {lastTierName} to claim an Overclock level.
          </li>
          <li>
            Resets tiers and resources like Speed Up (keeps unlocked autobuyers and Prestige Points).
          </li>
          <li>
            Also wipes Speed Up’s stacking bonus back to zero.
          </li>
          <li>
            In exchange, permanently multiplies the Tickspeed upgrade’s per-level rate by ×1.1 each
            claim (1% → 1.1% → 1.21% → …), including its every-10th-level milestone bonus.
          </li>
          <li>
            First claim needs level {overclockFirstRequirement}; each later claim needs one more
            level than the last.
          </li>
          <li>
            Claiming jumps straight to whatever level {lastTierName} has already reached — you don’t
            have to claim every intermediate level one at a time.
          </li>
        </ul>
      </Section>

      <Section aria-label="tier autobuyers section">
        <h2>Tier Autobuyers</h2>
        <ul>
          <li>
            Each tier’s unit-buying autobuyer and its tickspeed autobuyer unlock automatically as
            you Prestige more — see Milestones for exact thresholds.
          </li>
          <li>
            Once unlocked, the ⏸/▶ control pauses or resumes without losing the unlock.
          </li>
          <li>
            <strong>Smart</strong> is a one-time Prestige Point purchase: the unit autobuyer buys
            one at a time until a full level is affordable, then in blocks — fixing an early-game
            stall where a full level isn’t affordable yet.
          </li>
        </ul>
      </Section>

      <Section aria-label="milestones section">
        <h2>Milestones</h2>
        <ul>
          <li>
            <strong>Tier Autobuyer Unlocks:</strong> one tier per Prestige, from Prestige{' '}
            {firstTierAutobuyerMilestone} ({firstTierName}) through Prestige{' '}
            {lastTierAutobuyerMilestone} ({lastTierName}).
          </li>
          <li>
            <strong>Tier Tickspeed Autobuyers:</strong> start at Prestige{' '}
            {firstTierTickspeedAutobuyerMilestone}, then every{' '}
            {TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP} Prestiges after that.
          </li>
        </ul>
      </Section>

      <Section aria-label="prestige section">
        <h2>Prestige</h2>
        <ul>
          <li>
            Available once Bits reach 1 Googol Bytes (8×10^100 Bits). Production freezes until you
            Prestige.
          </li>
          <li>
            Awards Prestige Points from how far your money exponent climbed; spend PP on
            automations and upgrades on the Upgrades tab.
          </li>
          <li>
            Resets resources, owned counts, and run-scoped progress. Unlocked autobuyers stay
            unlocked.
          </li>
          <li>
            Sends you back through the Byte Foundry gate each cycle, but permanent Foundry /
            Storage / Compute progress carries over.
          </li>
          <li>
            The first Prestige of a save uses a full-screen overlay; later ones use the top bar /
            PP header control.
          </li>
        </ul>
      </Section>
    </RootDiv>
  )
}

export default InfoPage
