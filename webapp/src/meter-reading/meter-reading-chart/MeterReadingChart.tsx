import * as React from 'react';
import { BarChartWrapper } from './styles/BarChartWrapper';
import { MainHeading } from './styles/MainHeading';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import { MeterReadingChartItems } from './model/Index';

export const MeterReadingChart = (props: IMeterReadingChartProps) => {
  if (
    props.chartData === null ||
    props.chartData.meterReadingChartData === null ||
    props.chartData.meterReadingChartData.length === 0
  )
    return null;

  return (
    <BarChartWrapper>
      <MainHeading>Meter Readings</MainHeading>
      <BarChart
        width={1400}
        height={400}
        data={props.chartData.meterReadingChartData}
      >
        <XAxis dataKey="date" />
        <YAxis dataKey="energyUsage" />
        <CartesianGrid horizontal={false} />
        <Tooltip />
        <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
      </BarChart>
    </BarChartWrapper>
  );
};

interface IMeterReadingChartProps extends React.Props<MeterReadingChartItems> {
  chartData: MeterReadingChartItems;
}
