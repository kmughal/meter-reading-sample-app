export class MeterReading {
  
  constructor(
    public cumulative: number,
    public energyUsage: number = 0,
    public readerDate: string,
    public unit: string = "kwh") {
   
  }

  getUserFriendlyReaderDate() {
    return new Date(this.readerDate.toString()).toLocaleDateString('en-GB')
  }
}
