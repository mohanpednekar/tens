import styled from 'styled-components'

const Button = styled.button`
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${props => props.color};
  border: 1.5px solid ${props => props.color};
  background: #262626;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  transition: background-color 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    background: #333;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }
`
Button.defaultProps = {
  color: 'grey',
}
export default Button
