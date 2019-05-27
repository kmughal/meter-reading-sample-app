import * as React from 'react';
import { MeterReadings, MeterReading } from './model/Index';
import {
  TableHeader,
  TableHeaderColumn,
  Table,
  TableSectionWrapper,
  MainHeading,
  CellStyle
} from './styles/TableStyleComponents';
import { formateDate } from '../../common/helpers';

export const MeterReadingTable = (props: IMeterReadingTableProps) => {
  const { tableData } = props;
  if (tableData === null) return null;
  if (tableData.meterReadings === null || tableData.meterReadings.length === 0)
    return null;

  return (
    <TableSectionWrapper>
      <MainHeading>Meter Readings ( Tabular view )</MainHeading>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Energy Used</TableHeaderColumn>
            <TableHeaderColumn>Cumulative</TableHeaderColumn>
          </tr>
        </TableHeader>

        <tbody>
          {props.tableData.meterReadings.map(
            (i: MeterReading, index: number) => (
              <tr key={index}>
                <CellStyle rowIndex={index}>
                  {formateDate(i.readerDate)}
                </CellStyle>
                <CellStyle rowIndex={index}>
                  {i.energyUsage} {i.unit}
                </CellStyle>
                <CellStyle rowIndex={index}>
                  {i.cumulative} {i.unit}
                </CellStyle>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </TableSectionWrapper>
  );
};

interface IMeterReadingTableProps extends React.Props<MeterReadings> {
  tableData: MeterReadings;
}
