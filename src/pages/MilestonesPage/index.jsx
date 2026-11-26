import StatCard from 'components/StatCard'
import {
  isEraEligible,
  isOverflowModeUnlocked,
} from 'game/engine'
import { ERA_ELIGIBILITY_PP } from 'game/layers'
import styled, { useTheme } from 'styled-components'

// Standalone Milestones screen (page id 'milestones') — a timeline of story milestones (no version
// numbers, #1143) plus one Reboot status line (autobuyer unlock milestones live once, on Firmware →
// Automation); reachable from every screen via AppNav → More without requiring the main game to be
// unlocked first (useful during the Foundry gate).

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`

const Header = styled.header`
  color: ${props => props.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`

const Category = styled(StatCard)`
  gap: 0.4rem;
`

// Vertical timeline: a rail with one dot per milestone (filled when reached).
const Timeline = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0 0 0 1.4rem;
  position: relative;

  &::before {
    border-left: 2px solid ${props => props.theme.color.borderStrong};
    bottom: 0.55rem;
    content: '';
    left: 0.45rem;
    position: absolute;
    top: 0.55rem;
  }
`

const Event = styled.li`
  color: ${props => (props.$reached ? props.theme.color.text : props.theme.color.textFaint)};
  font-weight: ${props => (props.$reached ? 600 : 400)};
  padding: 0.3rem 0;
  position: relative;

  &::before {
    background: ${props => (props.$reached ? props.theme.color.good : props.theme.color.surfaceSunken)};
    border: 2px solid ${props => (props.$reached ? props.theme.color.good : props.theme.color.borderStrong)};
    border-radius: 50%;
    content: '';
    height: 0.65rem;
    left: -1.35rem;
    position: absolute;
    top: 0.55rem;
    width: 0.65rem;
  }
`

// One line under the timeline: Reboots · Kernels · eligibility.
const RebootLine = styled.p`
  align-items: center;
  border-top: 1px solid ${props => props.theme.color.border};
  color: ${props => props.theme.color.textMuted};
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  gap: 0.35rem;
  margin: 0.3rem 0 0;
  padding-top: 0.55rem;

  strong {
    color: ${props => props.theme.color.text};
  }
`

const Badge = styled.span`
  color: ${props => props.$color ?? props.theme.color.textMuted};
  opacity: ${props => (props.$dimmed ? 0.75 : 1)};
`

const MilestonesPage = ({ game }) => {
  const { state } = game
  const theme = useTheme()
  const { purge } = state
  const eraCount = state.era?.count ?? 0
  const eonsBalance = state.eons?.balance ?? 0
  const eraEligible = isEraEligible(state)
  const milestones = [
    { label: 'The first Kilobyte', reached: !!state.intro?.mainGameUnlocked },
    { label: 'Go Googol', reached: (purge.count ?? 0) > 0 },
    { label: 'Open Compute', reached: !!state.computeFlops?.pageUnlocked },
    { label: 'DeGoogoled', reached: isOverflowModeUnlocked(state) },
    { label: 'First Reboot', reached: eraCount > 0 },
  ]
  // Progressive reveal: reached milestones plus the next one; later ones stay hidden (no spoilers).
  const firstUnreached = milestones.findIndex(milestone => !milestone.reached)
  // (A Reboot clears Purges, so a later milestone can be reached while an earlier one reads unreached again.)
  const shown = milestones.filter((milestone, index) => milestone.reached || index === firstUnreached)
  const hiddenCount = milestones.length - shown.length
  const rebootRevealed = eraCount > 0 || eraEligible || isOverflowModeUnlocked(state)

  return (
    <RootDiv>
      <Header>
        <h1>Milestones</h1>
      </Header>

      <Category aria-label="milestones page">
        <Timeline aria-label="milestones category">
          {shown.map(milestone => (
            <Event
              $reached={milestone.reached}
              aria-label={`${milestone.label} milestone ${milestone.reached ? 'reached' : 'not yet reached'}`}
              key={milestone.label}
            >
              {milestone.label}
            </Event>
          ))}
          {hiddenCount > 0 && <Event aria-label={`${hiddenCount} more milestones hidden`}>🔒 {hiddenCount} more</Event>}
        </Timeline>
        {rebootRevealed && (
        <RebootLine aria-label="reboot status">
          <span aria-hidden="true">⏻</span>
          <span aria-label={`${eraCount} reboots`}><strong>{eraCount}</strong> Reboots</span>
          <span aria-hidden="true">·</span>
          <span aria-label={`${eonsBalance} kernels held`}><strong>{eonsBalance}</strong> Kernels</span>
          <span aria-hidden="true">·</span>
          {eraEligible ? (
            <Badge $color={theme.color.good} aria-label="reboot eligible now">✅ Eligible</Badge>
          ) : (
            <Badge
              $color={theme.color.disabled}
              $dimmed
              aria-label={`reboot locked — requires ${ERA_ELIGIBILITY_PP.toExponential(0).replace('+', '')} unspent Purge Points`}
            >
              🔒 1 Googol PP
            </Badge>
          )}
        </RebootLine>
        )}
      </Category>
    </RootDiv>
  )
}

export default MilestonesPage
