import styled from 'styled-components'

// Accessible on/off switch (a <button> with aria-pressed): a pill track + sliding knob, used for
// every Perks → Toggles control and Buy max. Callers pass `$on` (visual state) alongside
// `aria-pressed`; the accessible name comes from the caller's aria-label.
const Switch = styled.button.attrs({ type: 'button' })`
  background: ${props => (props.$on ? props.theme.color.good : props.theme.color.borderStrong)};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  flex: 0 0 auto;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  position: relative;
  transition: background ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard};
  width: 2.6rem;

  &::after {
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    content: '';
    height: 1.1rem;
    left: ${props => (props.$on ? 'calc(100% - 1.1rem - 0.2rem)' : '0.2rem')};
    position: absolute;
    top: 0.2rem;
    transition: left ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard};
    width: 1.1rem;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::after {
      transition: none;
    }
  }
`

export default Switch
