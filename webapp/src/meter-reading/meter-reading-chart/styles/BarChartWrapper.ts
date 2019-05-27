import * as styled from 'styled-components';
import { mediaMaxWidth } from '../../../common/helpers';


export const BarChartWrapper = styled.default.section`
margin : 0
padding: 10px 10px
display: block
${mediaMaxWidth(375)} {
 display: none
}

html {
  font-size: 100%
}
h1 {
  font-size: 2em
}
table {
  font-size: 1.25em
}
`