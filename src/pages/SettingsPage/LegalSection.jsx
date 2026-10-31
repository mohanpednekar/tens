import { PRIVACY_POLICY_URL, TERMS_URL } from 'services/config'
import styled from 'styled-components'
import { Section } from './styles'

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  a {
    color: ${props => props.theme.color.accent};
    border-radius: ${props => props.theme.radius.sm};

    &:focus-visible {
      outline: 2px solid ${props => props.theme.color.accent};
      outline-offset: 2px;
    }
  }
`

// Store-required policy links. Absolute URLs to the GitHub Pages copies, so the native apps open
// the live documents in the system browser.
const LegalSection = () => (
  <Section aria-label="legal section">
    <h2>Legal</h2>
    <LinkRow>
      <a href={PRIVACY_POLICY_URL} rel="noopener noreferrer" target="_blank">Privacy Policy</a>
      <a href={TERMS_URL} rel="noopener noreferrer" target="_blank">Terms of Use</a>
    </LinkRow>
  </Section>
)

export default LegalSection
