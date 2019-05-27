
import { MeterReadings } from "../meter-reading-table/model/MeterReadings";
import { MeterReadingChartItems } from "../meter-reading-chart/model/Index";

export class MeterReadingViewModel {
  constructor(public chartData: MeterReadingChartItems, public tableViewData: MeterReadings) {

  }

  static createDefault(): MeterReadingViewModel {
    return new MeterReadingViewModel(MeterReadingChartItems.createDefault(), MeterReadings.createDefault());
  }
}