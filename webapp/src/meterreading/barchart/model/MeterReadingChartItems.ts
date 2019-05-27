import { MeterReadingChartItem } from "./MeterReadingChartItem";

export class MeterReadingChartItems {
  constructor(public meterReadingChartData: Array<MeterReadingChartItem>) {
  }

  static createDefault() : MeterReadingChartItems {
    return new MeterReadingChartItems(new Array<MeterReadingChartItem>());
  }
}