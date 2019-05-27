
export class MeterReading {

  constructor(
    public cumulative: number, 
    public energyUsage: number = 0, 
    public readerDate: string, 
    public unit: string = "kwh") {

  }


}