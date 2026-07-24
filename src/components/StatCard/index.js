import styled from 'styled-components'

// Token-driven surface. `$raised` swaps the base `surface` fill for `surfaceRaised` — a slightly
// lighter panel used for hero/elevated cards (dark mode) or a stronger shadow (light mode, where
// both surface tokens are the same white and elevation reads via shadow instead) — see
// CLAUDE.md → "Theming" for the token vocabulary. Kept to this one prop since nothing yet needs a
// third elevation tier.
const StatCard = styled.section`
  background: ${props => (props.$raised ? props.theme.color.surfaceRaised : props.theme.color.surface)};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadow.sm};
  color: ${props => props.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`

export default StatCard
