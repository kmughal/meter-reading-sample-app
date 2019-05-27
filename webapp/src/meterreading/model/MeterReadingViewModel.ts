
import { MeterReadings } from "../tableview/model/MeterReadings";
import { MeterReadingChartItems } from "../barchart/model/Index";

export class MeterReadingViewModel {
  constructor(public chartData: MeterReadingChartItems, public tableViewData: MeterReadings) {

  }

  static createDefault(): MeterReadingViewModel {
    return new MeterReadingViewModel(MeterReadingChartItems.createDefault(), MeterReadings.createDefault());
  }
}