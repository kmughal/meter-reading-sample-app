import * as styled from 'styled-components'
import { mediaMaxWidth } from '../../../common/helpers';

const { thead, th, table, td, section, h1 } = styled.default;

export const Table = table`
width: 100%
border-collapse: collapse
font-size: 16px
${mediaMaxWidth(375)}{
  font-size: 5px
 }
`

export const TableHeader = thead`
 
  
`;
export const TableHeaderColumn = th`
text-align: left
`;


export const TableSectionWrapper = section`

${mediaMaxWidth(375)}{
  width: 50%
  font-size: 5px
 }
`

export const MainHeading = h1`
font-size: 1.rem
text-align: center
`

export const CellStyle = td<{ rowIndex: number }>`
    background: ${props => props.rowIndex % 2 === 0 ? "#e0d8d8f6" : "#f6f6f6f6"}
    padding: 10px

    ${mediaMaxWidth(375)}{
      font-size: 5px
      padding: 5px
     }
`