import { VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  getAutobuyerUnlockMilestone,
  getFlopsAutobuyerUnlockEra,
  getTierTickspeedAutobuyerMilestone,
  isUnboundedPrestigeUnlocked,
} from 'game/engine'
import { COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS } from 'game/layers'
import styled from 'styled-components'

// Standalone Milestones screen — Chapters, tier-autobuyer, tickspeed-autobuyer, and Compute-autobuyer
// status; reachable from every screen via AppNav → More without requiring the main game to be unlocked
// first (Chapters in particular is useful during the Foundry gate).

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`

const Category = styled(StatCard)`
  gap: 0.4rem;
`

const CategoryHeading = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`

const Badge = styled.span`
  color: ${props => props.$color ?? props.theme.color.textMuted};
  font-size: 0.82em;
  opacity: ${props => (props.$dimmed ? 0.75 : 1)};
`

const TierNameLabel = styled.span`
  font-weight: 600;
  min-width: 2rem;
`

const RowControls = styled.div`
  align-items: center;
  display: flex;
  gap: 0.4rem;
`

const MilestonesPage = ({ game }) => {
  const { state } = game
  const { prestige } = state
  const isFirstRun = (prestige.count ?? 0) === 0
  const eraCount = state.era?.count ?? 0
  const chapters = [
    { label: 'The first KiloByte', reached: !!state.intro?.mainGameUnlocked },
    { label: 'Go Googol', reached: (prestige.count ?? 0) > 0 },
    { label: 'Open Compute', reached: !!state.computeFlops?.pageUnlocked },
    { label: 'Go Unbounded', reached: isUnboundedPrestigeUnlocked(state) },
    { label: 'Ascend an Era', reached: eraCount > 0 },
  ]

  return (
    <RootDiv>
      <Header>
        <h1>Milestones</h1>
      </Header>

      <List aria-label="milestones page">
        <Category aria-label="chapters category">
          <CategoryHeading>Chapters</CategoryHeading>
          {chapters.map(chapter => (
            <Row key={chapter.label} aria-label={`${chapter.label} chapter`}>
              <span>{chapter.label}</span>
              <Badge
                $color={chapter.reached ? '#4ade80' : 'darkgrey'}
                $dimmed={!chapter.reached}
                aria-label={`${chapter.label} chapter ${chapter.reached ? 'complete' : 'not yet complete'}`}
              >
                {chapter.reached ? '✅' : '🔒'} {chapter.label}
              </Badge>
            </Row>
          ))}
        </Category>

        {!isFirstRun && (
          <>
            <Category aria-label="tier autobuyer unlock milestones category">
              <CategoryHeading>Tier Autobuyer Unlocks</CategoryHeading>
              {TIER_DEFINITIONS.map(tier => {
                const milestone = getAutobuyerUnlockMilestone(tier.id)
                const reached = (state.autobuyers[tier.id] ?? null) !== null
                return (
                  <Row key={tier.id} aria-label={`${tier.name} autobuyer unlock milestone`}>
                    <TierNameLabel title={tier.name}>
                      <VisuallyHidden>{tier.name}</VisuallyHidden>
                      <span aria-hidden="true">{tier.symbol}</span>
                    </TierNameLabel>
                    {reached ? (
                      <Badge $color="#4ade80" aria-label={`${tier.name}'s autobuyer unlocked at Prestige ${milestone}`}>
                        ✅ Prestige {milestone}
                      </Badge>
                    ) : (
                      <RowControls>
                        <Badge
                          $color="darkgrey"
                          $dimmed
                          aria-label={`${tier.name}'s autobuyer unlocks at Prestige ${milestone}, currently at Prestige ${prestige.count}`}
                          title={`You're at Prestige ${prestige.count}`}
                        >
                          🔒 Prestige {milestone}
                        </Badge>
                        <VisuallyHidden
                          role="progressbar"
                          aria-label={`${tier.name} autobuyer unlock milestone progress`}
                          aria-valuenow={Math.min(prestige.count, milestone)}
                          aria-valuemin={0}
                          aria-valuemax={milestone}
                        />
                      </RowControls>
                    )}
                  </Row>
                )
              })}
            </Category>

            <Category aria-label="tier tickspeed autobuyer milestones category">
              <CategoryHeading>Tier Tickspeed Autobuyers</CategoryHeading>
              {TIER_DEFINITIONS.map(tier => {
                const milestone = getTierTickspeedAutobuyerMilestone(tier.id)
                const reached = !!state.tierTickspeedAutobuyer?.[tier.id]
                return (
                  <Row key={tier.id} aria-label={`${tier.name} tickspeed autobuyer milestone`}>
                    <TierNameLabel title={tier.name}>
                      <VisuallyHidden>{tier.name}</VisuallyHidden>
                      <span aria-hidden="true">{tier.symbol}</span>
                    </TierNameLabel>
                    {reached ? (
                      <Badge
                        $color="#4ade80"
                        aria-label={`${tier.name}'s tickspeed autobuyer unlocked at Prestige ${milestone}`}
                      >
                        ✅ Prestige {milestone}
                      </Badge>
                    ) : (
                      <RowControls>
                        <Badge
                          $color="darkgrey"
                          $dimmed
                          aria-label={`${tier.name}'s tickspeed autobuyer unlocks at Prestige ${milestone}, currently at Prestige ${prestige.count}`}
                          title={`You're at Prestige ${prestige.count}`}
                        >
                          🔒 Prestige {milestone}
                        </Badge>
                        <VisuallyHidden
                          role="progressbar"
                          aria-label={`${tier.name} tickspeed autobuyer milestone progress`}
                          aria-valuenow={Math.min(prestige.count, milestone)}
                          aria-valuemin={0}
                          aria-valuemax={milestone}
                        />
                      </RowControls>
                    )}
                  </Row>
                )
              })}
            </Category>

            {state.computeFlops?.pageUnlocked && (
              <Category aria-label="compute autobuyer unlock milestones category">
                <CategoryHeading>Compute Autobuyer Unlocks</CategoryHeading>
                {COMPUTE_FLOPS_TIER_DEFINITIONS.map(flopTier => {
                  const milestone = getFlopsAutobuyerUnlockEra(flopTier.id)
                  const reached = (state.computeFlopsAutobuyers?.[flopTier.id] ?? null) !== null
                  return (
                    <Row key={flopTier.id} aria-label={`${flopTier.name} autobuyer unlock milestone`}>
                      <TierNameLabel title={flopTier.name}>
                        <VisuallyHidden>{flopTier.name}</VisuallyHidden>
                        <span aria-hidden="true">{flopTier.symbol}</span>
                      </TierNameLabel>
                      {reached ? (
                        <Badge
                          $color="#4ade80"
                          aria-label={`${flopTier.name}'s autobuyer unlocked at Era ${milestone}`}
                        >
                          ✅ Era {milestone}
                        </Badge>
                      ) : (
                        <RowControls>
                          <Badge
                            $color="darkgrey"
                            $dimmed
                            aria-label={`${flopTier.name}'s autobuyer unlocks at Era ${milestone}, currently at Era ${eraCount}`}
                            title={`You're at Era ${eraCount}`}
                          >
                            🔒 Era {milestone}
                          </Badge>
                          <VisuallyHidden
                            role="progressbar"
                            aria-label={`${flopTier.name} autobuyer unlock milestone progress`}
                            aria-valuenow={Math.min(eraCount, milestone)}
                            aria-valuemin={0}
                            aria-valuemax={milestone}
                          />
                        </RowControls>
                      )}
                    </Row>
                  )
                })}
              </Category>
            )}
          </>
        )}
      </List>
    </RootDiv>
  )
}

export default MilestonesPage
