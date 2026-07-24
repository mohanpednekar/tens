import styled from 'styled-components'

const Money = styled.b`
  color: ${props => props.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`

export default Money
