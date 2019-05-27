import * as React from 'react';
import { MeterReadingService } from './services/meter-reading-service';
import { MeterReadingChart } from './BarChart/MeterReadingChart';
import { MeterReadingTable } from './TableView/MeterReadingTable';
import { MeterReadingViewModel } from './model/MeterReadingViewModel';

export const App = () => {
  const [viewModel, setMeterReadings] = React.useState(
    MeterReadingViewModel.createDefault()
  );

  const service = new MeterReadingService();

  const requestMeterReadings = () =>
    service.get().then(meterReadings => setMeterReadings(meterReadings));

  viewModel.chartData.meterReadingChartData.length === 0 &&
    requestMeterReadings();

  return (
    <>
      <MeterReadingChart chartData={viewModel.chartData} />
      <MeterReadingTable tableData={viewModel.tableViewData} />
    </>
  );
};
