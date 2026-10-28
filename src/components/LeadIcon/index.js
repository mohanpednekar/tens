import styled from 'styled-components'

// A line's leading emoji in a fixed-size box, so the text after it starts at the same x on every
// line of a tile (title vs. capacity/cost lines) however wide the glyph or the line's font size.
// Decorative only: always aria-hidden.
const LeadIcon = styled.span.attrs({ 'aria-hidden': true })`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`

export default LeadIcon
