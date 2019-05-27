import { Database } from 'sqlite3';
import { MeterReading } from "../model/meter-Reading";
import { calculateEnergyUsage } from '../common/calculate-energy-used';

export class MeterReadingService {

  constructor(private dbPool: Database) {

  }

  async add(cumulative: number, readingDate: string): Promise<void> {

    if (cumulative < 0) throw new Error('invalid reading');

    const dateTicks = Date.parse(readingDate);
    if (isNaN(dateTicks)) throw new Error('invalid reading date');

    const lastMonthMeterReading = await this.getLastMonthMeterReading();
    if (typeof lastMonthMeterReading !== 'undefined')
      if (lastMonthMeterReading.cumulative < cumulative) throw new Error('invalid reading.');

    const currentMonthMeterReading = new MeterReading(cumulative, 0, readingDate);
    currentMonthMeterReading.energyUsage = calculateEnergyUsage(lastMonthMeterReading, currentMonthMeterReading);
    let { readerDate, unit, energyUsage } = currentMonthMeterReading;

    const params = [currentMonthMeterReading.cumulative,
      readerDate,
      unit,
      energyUsage];

    this.dbPool.run(
      `INSERT INTO meter_reads 
      (
        cumulative, 
        Reader_date, 
        unit, 
        energy_used)
      VALUES (?, ?, ?,?)`, params);
    return Promise.resolve();
  }

  list(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbPool.serialize(() => {
        this.dbPool.all("select * from meter_reads ORDER BY date(reader_date)", (_, rows, err) => {

          if (typeof rows === 'undefined' || rows === null) {
            resolve([]);
            return;
          }

          const meterReadings = rows
            .map(row =>
              new MeterReading(row.cumulative,
                row.energy_used,
                row.reader_date,
                row.unit));

          resolve(meterReadings);
        });
      })
    });
  }

  private getLastMonthMeterReading(): Promise<MeterReading> {

    return new Promise((resolve, reject) => {
      this.dbPool.serialize(() => {
        this.dbPool.get("SELECT * from meter_reads order by cumulative DESC LIMIT 1", (_: any, row: any, err: any) => {
          if (typeof err !== 'undefined') reject(err);
          else resolve(row);
        })
      })

    })
  }
}