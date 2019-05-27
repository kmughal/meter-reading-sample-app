import { MeterReading } from "./MeterReading";

export class MeterReadings {
  constructor(public meterReadings: Array<MeterReading>) { }

  static createDefault(): MeterReadings {
    return new MeterReadings(new Array<MeterReading>())
  }
}