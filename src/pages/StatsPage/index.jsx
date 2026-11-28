import { useState } from 'react'
import StatCard from 'components/StatCard'
import { getStatsOverview, getStatsSections } from 'game/stats'
import styled from 'styled-components'

// Stats screen (page id 'stats') — a pure renderer of `game/stats` selectors. Reached via AppNav →
// More, gate-exempt like Milestones. Hero tiles on top, then one card per reached layer; only a
// section's name toggles it (expand/collapse convention).

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`

const Title = styled.h1`
  color: ${props => props.theme.color.text};
  font-family: ${props => props.theme.font.display};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`

const Hero = styled.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const HeroTile = styled(StatCard)`
  align-items: center;
  background: linear-gradient(160deg, ${props => props.theme.color.surfaceRaised}, ${props => props.theme.color.surface});
  gap: 0.15rem;
  padding: 0.75rem 0.5rem;
  text-align: center;
`

const HeroIcon = styled.span`
  font-size: 1.4rem;
  line-height: 1;
`

const HeroValue = styled.span`
  font-family: ${props => props.theme.font.display};
  font-size: 1.25rem;
  font-weight: 700;
  overflow-wrap: anywhere;
`

const Label = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.78rem;
  letter-spacing: 0.03em;
`

const Section = styled(StatCard)`
  border-left: 3px solid ${props => props.theme.color[props.$tone] ?? props.theme.color.accent};
  gap: 0.55rem;
`

const SectionName = styled.button`
  align-items: center;
  background: none;
  border: 0;
  color: ${props => props.theme.color.textMuted};
  cursor: pointer;
  display: flex;
  font-family: ${props => props.theme.font.display};
  font-size: 0.85rem;
  font-weight: 600;
  gap: 0.45rem;
  letter-spacing: 0.04em;
  padding: 0;
  text-align: left;
  text-transform: uppercase;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const Grid = styled.dl`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Tile = styled.div`
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: ${props => props.theme.radius.sm};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  padding: 0.5rem 0.6rem;
  ${props => (props.$wide ? 'grid-column: 1 / -1; align-items: center; flex-direction: row; justify-content: space-between;' : '')}

  dt {
    color: ${props => props.theme.color.textMuted};
    font-size: 0.75rem;
  }

  dd {
    color: ${props => props.theme.color.text};
    font-family: ${props => props.theme.font.display};
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    overflow-wrap: anywhere;
  }
`

const Track = styled.div`
  background: ${props => props.theme.color.border};
  border-radius: 999px;
  height: 4px;
  overflow: hidden;

  span {
    background: ${props => props.theme.color[props.$tone] ?? props.theme.color.accent};
    display: block;
    height: 100%;
  }
`

const StatsPage = ({ game }) => {
  const { state } = game
  const [collapsed, setCollapsed] = useState({})
  const overview = getStatsOverview(state)
  const sections = getStatsSections(state)

  return (
    <RootDiv aria-label="stats page">
      <Title>Stats</Title>
      <Hero aria-label="stats overview">
        {overview.map(tile => (
          <HeroTile $raised aria-label={`${tile.label} ${tile.value}`} key={tile.id}>
            <HeroIcon aria-hidden="true">{tile.icon}</HeroIcon>
            <HeroValue>{tile.value}</HeroValue>
            <Label>{tile.label}</Label>
          </HeroTile>
        ))}
      </Hero>
      {sections.map(section => {
        const open = !collapsed[section.id]
        return (
          <SectionCard key={section.id} open={open} section={section}
            onToggle={() => setCollapsed(prev => ({ ...prev, [section.id]: !prev[section.id] }))} />
        )
      })}
    </RootDiv>
  )
}

const SectionCard = ({ section, open, onToggle }) => (
  <Section $tone={section.tone} aria-label={`${section.name} stats`}>
    <SectionName aria-expanded={open} aria-label={`${section.name} stats toggle`} onClick={onToggle} type="button">
      <span aria-hidden="true">{open ? '▾' : '▸'}</span>
      <span aria-hidden="true">{section.icon}</span>
      {section.name}
    </SectionName>
    {open && (
      <Grid>
        {section.stats.map(stat => (
          <Tile $wide={stat.wide} key={stat.id}>
            <dt>{stat.label}</dt>
            <dd aria-label={`${stat.label} ${stat.value}`}>{stat.value}</dd>
            {stat.progress !== undefined && (
              <Track $tone={section.tone} aria-hidden="true">
                <span style={{ width: `${Math.round(Math.min(1, Math.max(0, stat.progress)) * 100)}%` }} />
              </Track>
            )}
          </Tile>
        ))}
      </Grid>
    )}
  </Section>
)

export default StatsPage
