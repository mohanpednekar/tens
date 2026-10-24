import StatCard from 'components/StatCard'
import styled from 'styled-components'

// Styled pieces shared by SettingsPage and its section components.

export const Section = styled(StatCard)`
  gap: 0.5rem;

  h2 {
    font-size: ${props => props.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    margin: 0;
  }
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`

export const CodeForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`

export const CodeInput = styled.input`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  flex: 1;
  font-family: ${props => props.theme.font.body};
  font-size: 0.9rem;
  min-width: 10rem;
  padding: 0.5rem 0.65rem;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

export const StatusText = styled.p`
  color: ${props => (props.$error ? props.theme.color.danger : props.theme.color.textMuted)};
  font-size: 0.8rem;
  margin: 0;
`
