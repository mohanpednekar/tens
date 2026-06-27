import styled from 'styled-components'

const Button = styled.button`
  font-size: 1em;
  margin: 0;
  padding: 0.5em 1em;
  border-radius: 4px;
  color: ${props => props.color};
  border: 2px solid ${props => props.color};
  background: dimgrey;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`
Button.defaultProps = {
  color: 'grey',
}
export default Button
