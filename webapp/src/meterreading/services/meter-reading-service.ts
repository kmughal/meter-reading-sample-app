import { MeterReadingViewModel } from "../model/MeterReadingViewModel";
import { MeterReadingChartItem, MeterReadingChartItems } from "../barchart/model/Index";
import { MeterReading, MeterReadings } from "../tableview/model/Index";


export class MeterReadingService {

  async get(): Promise<MeterReadingViewModel> {
    const url = "http://localhost:3000/meter-readings";
    const options = {
      headers: {
        "content-type": "application/json"
      }
    }
    const response = await fetch(url, options);
    const json = await response.json();

    const result = this.createChartReadingViewModel(json);
    return result;
  }

  private createChartReadingViewModel(json: any): MeterReadingViewModel {

    const chartItems = json.map(meterReading => {
      let dateInString = new Date(String(meterReading.readerDate)).toLocaleDateString('en-GB');
      let energyUsage = Number(meterReading.energyUsage);
      return new MeterReadingChartItem(dateInString, energyUsage);
    });

    const meterReadingList = json as Array<MeterReading>;

    const chartData = new MeterReadingChartItems(chartItems);
    const tableViewData = new MeterReadings(meterReadingList);

    return new MeterReadingViewModel(chartData, tableViewData);
  }
}