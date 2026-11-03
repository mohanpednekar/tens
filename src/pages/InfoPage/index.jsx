import StatCard from 'components/StatCard'
import {
  formatBitsInNearestUnit,
  formatOfflineDuration,
  getAutobuyerUnlockMilestone,
  getOverclockRequirement,
  getTierTickspeedAutobuyerMilestone,
  TIER_UNLOCK_PREV_LEVEL_REQUIREMENT,
} from 'game/engine'
import {
  COMPUTE_AUTO_BOOST_UNLOCK_COST,
  COMPUTE_BOOST_MAX_STACKS,
  COMPUTE_BOOST_PRESETS,
  COMPUTE_ENTITY_CAP,
  COMPUTE_ENTITY_AUTO_MERGE_CAP,
  COMPUTE_MERGE_RATIO,
  COMPUTE_MERGE_RESERVE_CAP,
  COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC,
  COMPUTE_FLOPS_FIRST_TIER_COST_PP,
  COMPUTE_FLOPS_LAST_TIER_COST_PP,
  COMPUTE_FLOPS_REVEAL_PP,
  CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER,
  DATA_LAKE_CAPACITY_BY_LEVEL,
  DATA_LAKE_SUB_SIZE_DISK_CAPS,
  EON_AMPLIFIER_AWARD_PER_LEVEL,
  ERA_ELIGIBILITY_PP,
  FILL_MULTIPLIER_MAX_PERCENT,
  FILL_MULTIPLIER_MIN_PERCENT,
  FILL_MULTIPLIER_TAP_BONUS_PERCENT,
  FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT,
  FILL_MULTIPLIER_TAP_DECAY_PERCENT_PER_SECOND,
  INTRO_BYTE_COMBINE_COST,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  DISK_ARRAY_LADDER_CAP,
  DISK_CACHE_BLOCK_COUNT,
  DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER,
  INTRO_DISK_UNLOCK_CAPACITY,
  MAX_OFFLINE_SECONDS,
  OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS,
  OFFLINE_PROGRESS_SPEED_MULTIPLIER,
  PRESTIGE_POINT_SPEED_BONUS,
  PRESTIGE_POWERS_PER_PP_BASE,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  UNBOUNDED_REBOOT_MAX_INTERVAL_SECONDS,
  TIER_DEFINITIONS,
  TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP,
  getStoragePoolMemoryBounds,
  DATA_STREAM_SPEED_EXPONENT_BASE,
  DATA_STREAM_SPEED_EXPONENT_STEP,
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
  const scaleUpReRevealCompletedLevels = TIER_UNLOCK_PREV_LEVEL_REQUIREMENT - 1
  const overclockFirstRequirement = getOverclockRequirement({})
  const lastTierName = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name
  const firstTierName = TIER_DEFINITIONS[0].name

  return (
    <RootDiv>
      <Header>
        <h1>Tens — Guide</h1>
        <VersionText>v{version}</VersionText>
      </Header>

      <Section aria-label="overview section">
        <h2>Overview</h2>
        <ul>
          <li>Everything scales by powers of ten — costs, production, and most upgrades.</li>
          <li>Buy every tier with <strong>Bits</strong> (the base currency; 8 Bits = 1 Byte).</li>
          <li>
            Each owned tier produces the tier below it, so production cascades down the ladder;{' '}
            {firstTierName} produce Bytes, which are added to your Bits.
          </li>
          <li>
            The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes).
            Costs and production rates still show in Bits.
          </li>
          <li>
            Reaching <strong>1 Googol Bytes</strong> (8×10^100 Bits) freezes production until you
            Purge — unless you have unlocked DeGoogol (see Purge).
          </li>
          <li>
            After your first Purge, the <strong>Buy max</strong> toggle (Perks → ✦ Prestige) makes
            each purchase buy as many levels as you can afford. Tiers buy full levels only — a
            partly bought level takes its own click.
          </li>
        </ul>
      </Section>

      <Section aria-label="byte foundry section">
        <h2>Byte Foundry</h2>
        <p>
          Every new save starts here, before any {firstTierName} exist. Unlocking the main game is
          permanent — no Purge or Era ascension sends you back through this gate. Reopen the
          Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB,
          MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB,
          MB, …; 1 KB = 1,000 Bytes).
        </p>

        <h3>The loop</h3>
        <ul>
          <li>
            <strong>Tap</strong> the Data Stream to add one second of its production. Once Storage
            appears (at {formatBitsInNearestUnit(INTRO_DISK_UNLOCK_CAPACITY)} Capacity), a tap
            instead adds a temporary tap bonus to what it feeds (below).
          </li>
          <li>
            <strong>Combine</strong> the first {INTRO_BYTE_COMBINE_COST} bits into a permanent Byte
            generator that produces on its own from then on. Capacity starts at{' '}
            {formatBitsInNearestUnit(getStoragePoolMemoryBounds(1).startBits)} and doubles with each
            Capacity upgrade, up to the last storage pool’s limit.
          </li>
          <li>
            <strong>Fill multiplier</strong> — the Data Stream’s Speed and each pool’s speed are shown
            as the rate actually delivered: the base rate times a multiplier that depends on how full
            that buffer is. It is {FILL_MULTIPLIER_MAX_PERCENT / 100}× when empty, 1× at half full and{' '}
            {FILL_MULTIPLIER_MIN_PERCENT / 100}× when full; the color runs red (slow) → blue → green
            (fast). Tapping the Data Stream (once Storage appears) or a pool’s Memory tile adds a +
            {FILL_MULTIPLIER_TAP_BONUS_PERCENT}% tap bonus (up to {FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT}%),
            which fades by {FILL_MULTIPLIER_TAP_DECAY_PERCENT_PER_SECOND}% per second and shows as a
            thin bar and “+x% 👆”. A tap never speeds the fill itself (it already reaches{' '}
            {FILL_MULTIPLIER_MAX_PERCENT / 100}×); it speeds what that buffer feeds — on the Data Stream,
            Upgrade Capacity / Speed; on a pool, disk provisioning, disk fills and merges, rebuilds and
            the Data Lake.
          </li>
          <li>
            <strong>Upgrade Capacity</strong> costs your current Capacity and doubles it.{' '}
            <strong>Upgrade Speed</strong> costs your current Speed level. Only one runs at a time: it
            becomes a progress bar that draws the Data Stream’s base Speed from the Buffer, ahead of
            everything else, and applies when full. Base Speed is (Speed level in Bytes)
            <sup>exponent</sup> per second and can never exceed Capacity<sup>exponent</sup>, so raise
            Capacity to unlock more Speed. The exponent starts at {DATA_STREAM_SPEED_EXPONENT_BASE} (a
            square root); pool speed is capped by the same exponent.
          </li>
          <li>
            <strong>Foundry reset</strong> — when every unlocked disk size is complete, this button
            replaces Provision Disk. It unlocks the next disk size and raises the exponent by{' '}
            {DATA_STREAM_SPEED_EXPONENT_STEP}. The Foundry restarts from scratch, then Combine,
            Capacity, Speed, Disks and Data Lake upgrades/Boosters are replayed automatically up to
            your previous highs.
          </li>
          <li>
            <strong>Auto-convert</strong> turns Data Stream bits into free {firstTierName} at their
            current per-unit cost, automatically, every cycle. The main game itself unlocks
            (permanently) once Upgrade Capacity raises Capacity to Storage’s{' '}
            {formatBitsInNearestUnit(INTRO_DISK_UNLOCK_CAPACITY)} threshold.
          </li>
        </ul>

        <h3>What resets vs. what stays</h3>
        <ul>
          <li>
            <strong>Resets each Purge:</strong> the Data Stream balance and any partly bought{' '}
            {firstTierName} level.
          </li>
          <li>
            <strong>Kept through Purge:</strong> the Byte generator, Capacity/Speed upgrades,
            Disks, Data Lakes, every Compute entity, and the main-game unlock. Era ascension resets
            most of this (see Era ascension).
          </li>
          <li>Later cycles are a quick pit stop, not a full replay.</li>
        </ul>

        <h3>Forced priority</h3>
        <p>When more than one of these is available, only the highest-ranked one can be used:</p>
        <ul>
          <li>Disk Fill → Provision Disk → Compute Boost</li>
          <li>
            Upgrade Capacity / Upgrade Speed, Data Lake Booster purchases and Data Lake capacity
            upgrades are outside this order — they are never blocked by it.
          </li>
        </ul>
      </Section>

      <Section aria-label="storage section">
        <h2>Storage</h2>
        <p>
          Appears on the Foundry screen once the Data Stream’s Capacity reaches{' '}
          {formatBitsInNearestUnit(INTRO_DISK_UNLOCK_CAPACITY)}. There are ten pools (KB … QB), all fed
          by the shared Data Stream — earlier pools take their share of its speed first. Pool N
          appears once Capacity reaches 1024<sup>N</sup> Bytes (1 KiB, 1 MiB, …), whatever disks you
          have built.
        </p>

        <h3>Provisioning Disks</h3>
        <ul>
          <li>
            Click Provision Disk once to start a build; it draws its cost from the pool’s buffer at
            the pool’s base speed and pauses (losing nothing) whenever the buffer is empty. The Nth
            disk of an array costs N× the disk’s size.
          </li>
          <li>
            Up to {DISK_ARRAY_LADDER_CAP} disks can be built at each size before the next size opens,
            stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds
            three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes
            beyond those already unlocked need a Foundry reset.
          </li>
        </ul>

        <h3>Cache and automatic pulling</h3>
        <ul>
          <li>
            Each pool’s smallest array keeps a read Cache of {DISK_CACHE_BLOCK_COUNT} blocks that
            together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the
            pool’s Memory holds a full block and the Cache has room, the block moves into the Cache
            instantly.
          </li>
          <li>
            That array’s empty disks fill from its read Cache, taking as long as one cache block
            would at {DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER}× your Foundry production rate. Every
            larger size fills only by merging full disks from the size below — collected at{' '}
            {CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER}× your rate, then written at{' '}
            {DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER}×. Merges never cross from one pool into another.
          </li>
          <li>
            Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …;
            the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is{' '}
            <strong>pulled</strong> automatically — no click or autobuyer needed — the moment its tier
            is at exactly that level with no purchases toward it yet, completing the whole level at
            once. A level you have already started buying is never topped off by a disk; the disk
            waits for that tier’s next fresh level.
          </li>
          <li>
            A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly
            instead. Later levels only ever come from whole disks.
          </li>
          <li>Disks are permanent across Purges; a full disk stays full.</li>
        </ul>
      </Section>

      <Section aria-label="boosters section">
        <h2>Boosters</h2>
        <p>
          Unlocks once the Data Stream’s Capacity reaches{' '}
          {formatBitsInNearestUnit(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY)}. Open it from the bottom
          nav’s Boosters item.
        </p>

        <h3>Data Lakes</h3>
        <ul>
          <li>
            Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its
            pool has built at least one disk, and turns stored data into Boosters.
          </li>
          <li>
            A lake fills from its own pool’s buffer at the pool’s speed whenever every built disk in
            that pool is full and nothing is being provisioned there. Clicking its 🏷️ cost control
            also draws from the pool’s buffer until the next Booster is affordable, buys one, then
            stops. Once all of the pool’s disks are built, its overflow also pours into the lake.
          </li>
          <li>
            A lake shows its contents as disk squares, filled smallest first: up to{' '}
            {DATA_LAKE_SUB_SIZE_DISK_CAPS.join('/')} disks of ×1/×10/×100 its unit. The last unit of
            each capacity level sits in the lake’s own buffer instead of a square, just as a Storage
            array’s Cache stands in for a 10th disk.
          </li>
          <li>
            Lake capacity starts at 1 unit and can be raised ×10 per level (
            {DATA_LAKE_CAPACITY_BY_LEVEL.map(units => units.toLocaleString()).join(', ')}). Each level
            unlocks once the matching Storage array is fully built, and buying it empties the lake.
          </li>
          <li>
            The nth Booster bought from a lake costs n units and instantly grants 1 compute entity of
            that lake’s tier (KB → Core, MB → Node, …). Once a pool has all of its disks built, its
            lake buys every affordable Booster automatically for the rest of the Era — through pool
            resets, Foundry resets and Purges.
          </li>
        </ul>

        <h3>Pool resets</h3>
        <ul>
          <li>
            When a pool has every disk built, its lake is completely full, and the next Booster costs
            more than the lake can hold, a <strong>↻ Reset Pool</strong> button appears. It never
            fires on its own.
          </li>
          <li>
            A reset empties that pool’s disks, buffer and lake (Boosters bought and earlier reset
            rewards stay) and permanently adds 1,000 units of lake capacity. The first reset also
            locks lake filling at 50% speed; later resets raise the pool’s speed.
          </li>
          <li>
            Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it
            is complete again, later pools can’t start new disk builds.
          </li>
        </ul>

        <h3>Cores and the merge chain</h3>
        <ul>
          <li>
            Chain: Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter →
            Supercomputer → Megacomputer. Cores only come from KB Data Lake Boosters.
          </li>
          <li>
            Each entity caps at {COMPUTE_ENTITY_CAP} held; Booster purchases pause at the cap until
            you spend some (a merge or a Compute Boost).
          </li>
          <li>
            Manual merge: turn {COMPUTE_MERGE_RATIO} of one entity into 1 of the next (needs{' '}
            {COMPUTE_MERGE_RATIO} held). It is instant.
          </li>
          <li>
            Sacrifice {COMPUTE_ENTITY_CAP} of the next entity to unlock auto-merge for that step. This
            adds an {COMPUTE_MERGE_RESERVE_CAP}-slot reserve ({COMPUTE_ENTITY_AUTO_MERGE_CAP} held in
            total) that fills as the entity keeps growing past {COMPUTE_ENTITY_CAP}. Tapping the
            reserve slots merges {COMPUTE_MERGE_RATIO} → 1 instantly.
          </li>
          <li>
            An automatic merge starts only when all {COMPUTE_ENTITY_AUTO_MERGE_CAP} slots are full and
            runs on a timer: the time {COMPUTE_MERGE_RATIO} of the smallest disks in that entity’s own
            pool take to fill from its read Cache (Cores use the KB pool, Nodes the MB pool, …). It
            waits until that pool is visible and speeds up as the pool gets faster.
          </li>
        </ul>

        <h3>Compute Boost</h3>
        <ul>
          <li>
            Select a tier on Boosters to show its Burst / Standard / Sustain presets; activating one
            spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers
            boost more Factory tiers (Core: Kilobytes only, Node: Kilobytes and Megabytes, Cluster:
            the first three, …).
          </li>
          <li>
            Burst ×{COMPUTE_BOOST_PRESETS.burst.multiplier} for{' '}
            {formatOfflineDuration(COMPUTE_BOOST_PRESETS.burst.durationSeconds)}; Standard ×
            {COMPUTE_BOOST_PRESETS.standard.multiplier} for{' '}
            {formatOfflineDuration(COMPUTE_BOOST_PRESETS.standard.durationSeconds)}; Sustain ×
            {COMPUTE_BOOST_PRESETS.sustain.multiplier} for{' '}
            {formatOfflineDuration(COMPUTE_BOOST_PRESETS.sustain.durationSeconds)}.
          </li>
          <li>
            A boost also multiplies the Byte generator’s production and speeds up the matching
            Storage pools’ buffers (pool N for Factory tier N) by +
            {COMPUTE_BOOST_PRESETS.burst.poolBonusPercent}% / +
            {COMPUTE_BOOST_PRESETS.standard.poolBonusPercent}% / +
            {COMPUTE_BOOST_PRESETS.sustain.poolBonusPercent}% for Burst / Standard / Sustain.
          </li>
          <li>
            Only one boost runs at a time. Picking the same preset and tier again{' '}
            <strong>stacks</strong> it (up to {COMPUTE_BOOST_MAX_STACKS} stacks; each adds time, the
            multiplier doesn’t compound). Picking a different one asks first, then refunds unused
            stacks and forfeits the running one.
          </li>
          <li>
            While a boost runs, a timer bar shows the time left. <strong>+</strong> on its right adds
            a stack. <strong>Pop</strong> (↩) on its left refunds the most recent unused stack; once
            none are left it becomes <strong>Forfeit</strong> (✕), which ends the boost with no refund
            after a confirmation.
          </li>
          <li>
            <strong>Auto Boost</strong> ({COMPUTE_AUTO_BOOST_UNLOCK_COST} PP, one-time, on Perks → 🤖
            Automation): when a tier is full and waiting on its own automatic merge, activates (or
            stacks) your preferred preset from the <strong>biggest</strong> such tier. Choose the
            preset on Boosters (default Standard). It never forfeits a running boost.
          </li>
          <li>Megacomputers are used only to fund Boosts.</li>
        </ul>
      </Section>

      <Section aria-label="compute flops section">
        <h2>Compute</h2>
        <p>
          A separate screen (nav <strong>Compute</strong>) with ten tiers,{' '}
          <strong>KFlops → QFlops</strong>, bought with Purge Points; each boosts the matching
          Factory tier. It appears once you hold {COMPUTE_FLOPS_REVEAL_PP} PP; the first tier costs{' '}
          {COMPUTE_FLOPS_FIRST_TIER_COST_PP.toLocaleString()} PP.
        </p>
        <ul>
          <li>
            Base costs climb ×1,000 per tier like Factory tiers (
            {COMPUTE_FLOPS_FIRST_TIER_COST_PP.toLocaleString()} –{' '}
            {COMPUTE_FLOPS_LAST_TIER_COST_PP.toExponential(0).replace('+', '')} PP), and the price
            rises with <strong>every</strong> purchase rather than every 8.
          </li>
          <li>
            Each owned unit adds {(COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * 100).toFixed(2)}% per
            second to its Factory tier’s boost, which multiplies production by{' '}
            <strong>(1 + boost)</strong>.
          </li>
          <li>
            The header’s <strong>Flops</strong> total weights each tier’s boost by 10<sup>n</sup>{' '}
            (<strong>K + 10·M + 100·G + … + 10⁹·Q</strong>); production uses each tier’s own boost.
            Boosts reset each Purge; owned units are kept.
          </li>
        </ul>
      </Section>

      <Section aria-label="speed up section">
        <h2>Speed Up</h2>
        <ul>
          <li>
            Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more
            frequent deliveries, not bigger ones.
          </li>
          <li>Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).</li>
          <li>Unlocks once {firstTierName} complete their first level.</li>
          <li>
            Each tier row also has its own tickspeed upgrade, paid for with units of that tier
            itself — buying one lowers that tier’s owned count.
          </li>
          <li>
            {lastTierName}’ tickspeed upgrade needs the usual amount owned but only spends a tenth of
            it (the 2nd upgrade needs 100, spends 10).
          </li>
          <li>
            After {TIER_DEFINITIONS.length} Scale Ups in a run (the first onto {lastTierName}), the
            Restage upgrade appears beside Speed Up: spend XP for +1% faster {lastTierName} ticks per XP
            (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1).
            It resets every other tier’s owned quantity and your Bits. A 16 PP Auto Restage
            (Perks → Automation, after Auto Speed Up) spends it for you, every 64 s at first —
            faster with its speed upgrades.
          </li>
        </ul>
      </Section>

      <Section aria-label="scale up section">
        <h2>Scale Up</h2>
        <ul>
          <li>
            Reach 3 completed levels on the tier Scale Up is currently working through — starting
            with {firstTierName} — to claim a Scale Up.
          </li>
          <li>
            Resets tiers and resources and unlocks the next tier. After a later reset, an
            already-unlocked tier reappears once the tier before it reaches{' '}
            {scaleUpReRevealCompletedLevels} completed levels.
          </li>
          <li>
            Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and
            a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.
          </li>
          <li>
            Each of the first ten claims needs 3 completed levels on the last unlocked tier. After
            that, repeated claims on the final tier need 6, 9, 12, and so on.
          </li>
          <li>Byte Foundry progress is untouched.</li>
        </ul>
      </Section>

      <Section aria-label="overclock section">
        <h2>Overclock</h2>
        <ul>
          <li>
            Reach the required number of completed {lastTierName} levels to claim an Overclock.
          </li>
          <li>
            Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers
            and Purge Points are kept.
          </li>
          <li>
            In exchange, permanently multiplies Speed Up’s per-level rate by ×1.1 for each completed
            level banked (1% → 1.1% → 1.21% → …).
          </li>
          <li>
            The first claim needs {overclockFirstRequirement} completed levels — a minimum; you can
            keep climbing first. Each later claim needs three more completed levels than the previous
            claim was taken at.
          </li>
          <li>
            Every completed level counts — claiming at 3 and then 3 more gives the same benefit as
            claiming 6 at once, so claim whenever you like.
          </li>
        </ul>
      </Section>

      <Section aria-label="tier autobuyers section">
        <h2>Tier Autobuyers</h2>
        <ul>
          <li>
            Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge
            count grows — see Perks → 🤖 Automation for the exact thresholds.
          </li>
          <li>
            Once unlocked, the same row pauses or resumes it without losing it.
          </li>
          <li>
            An autobuyer buys <strong>one full level per attempt</strong>, only when that whole level
            (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed
            upgrades on that same row shorten its interval down to 10 ms; each level after that
            doubles how many levels one attempt can buy, up to 512.
          </li>
        </ul>
      </Section>

      <Section aria-label="milestones section">
        <h2>Milestones</h2>
        <ul>
          <li>
            <strong>Tier autobuyers:</strong> one tier per Purge, from Purge{' '}
            {firstTierAutobuyerMilestone} ({firstTierName}) through Purge{' '}
            {lastTierAutobuyerMilestone} ({lastTierName}).
          </li>
          <li>
            <strong>Tier tickspeed autobuyers:</strong> start at Purge{' '}
            {firstTierTickspeedAutobuyerMilestone}, then every{' '}
            {TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP === 1 ? 'Purge' : `${TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP} Purges`} after that.
          </li>
          <li>More → Milestones tracks your story chapters and Era progress.</li>
        </ul>
      </Section>

      <Section aria-label="prestige section">
        <h2>Purge</h2>
        <ul>
          <li>
            <strong>Prestige</strong> is the umbrella term for every reset-for-rewards: Purge, Era
            ascension, Reset Byte Foundry and a pool’s Data Lake reset. Purge is the Factory one.
          </li>
          <li>
            Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you
            Purge. Getting Auto Purge’s interval down to {UNBOUNDED_REBOOT_MAX_INTERVAL_SECONDS} s
            or less unlocks <strong>DeGoogol</strong>: production keeps running past 1 Googol Bytes
            and Purge becomes optional.
          </li>
          <li>
            Awards 1 Purge Point (PP) at 1 Googol Bytes, plus 1 PP for every{' '}
            {PRESTIGE_POWERS_PER_PP_BASE} further powers of ten in your balance. Each Double PP
            upgrade halves the powers needed per PP, and once that reaches 1, doubles the PP per power.
          </li>
          <li>
            Double PP costs 100^(level+1) PP (100, 10,000, 1,000,000, …) on Perks → ✦ Prestige and
            is permanent across Purges.
          </li>
          <li>
            Spend PP on Perks for automation and bonuses — e.g. the one-time Production speed bonus
            ({PRESTIGE_SPEED_BONUS_UNLOCK_COST.toLocaleString()} PP) gives +
            {PRESTIGE_POINT_SPEED_BONUS * 100}% production speed per unspent PP.
          </li>
          <li>
            Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and
            Foundry, Storage and Boosters progress carries over.
          </li>
          <li>
            Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top
            of the Factory or tap the PP display.
          </li>
        </ul>
      </Section>

      <Section aria-label="offline progress section">
        <h2>Offline progress</h2>
        <ul>
          <li>
            Time away (up to {formatOfflineDuration(MAX_OFFLINE_SECONDS)}) is simulated when you come
            back. Absences of {formatOfflineDuration(OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS)}{' '}
            or less run at full speed; longer ones run at{' '}
            {OFFLINE_PROGRESS_SPEED_MULTIPLIER * 100}% speed and show a “Welcome back!” summary.
          </li>
        </ul>
      </Section>

      <Section aria-label="era ascension section">
        <h2>Era ascension</h2>
        <ul>
          <li>
            An optional deeper reset once you hold{' '}
            {ERA_ELIGIBILITY_PP.toExponential(0).replace('+', '')} (1 Googol) unspent PP. Nothing
            freezes at that point.
          </li>
          <li>
            Each ascension awards 1 Eon plus {EON_AMPLIFIER_AWARD_PER_LEVEL} per Eon Amplifier level.
            Ways to spend Eons are coming in a later update.
          </li>
          <li>
            Ascend from More → Settings → Era ascension (asks for confirmation). More → Milestones
            shows your Eras, Eons and eligibility.
          </li>
          <li>
            <strong>Resets:</strong> Foundry upgrades and Capacity, Disks, Data Lakes, Compute
            entities, the Factory (resources, owned tiers, Double PP level), unspent PP, Purge
            count, and owned Compute (Flops) units.
          </li>
          <li>
            <strong>Keeps:</strong> automation unlocks and pause settings, DeGoogol, the main-game
            unlock, the Prestige museum, the Compute screen, Flops autobuyer unlocks, Eons and
            hyperscalers. Era <em>N</em> also unlocks the <em>N</em>th Compute tier’s autobuyer for
            free.
          </li>
        </ul>
      </Section>
    </RootDiv>
  )
}

export default InfoPage
