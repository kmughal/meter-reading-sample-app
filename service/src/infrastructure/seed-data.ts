import { MeterReading } from './../model/meter-reading';
import { getDatabasePool } from "./database";
import { Database } from "sqlite3";
import { calculateEnergyUsage } from "../common/calculate-energy-used";
import sampleData = require('../../sampleData.json');

export const initialize = (cb: Function) => {
  const dbPool = getDatabasePool();
  createTable(dbPool,()=> {console.log("table created")});
  dumpData(dbPool);
  cb();
};

export function createTable(dbPool: Database, cb: () => void = null) {
  dbPool.serialize(() => {
    dbPool.run(`
    CREATE TABLE IF NOT EXISTS meter_reads 
    (
      row_number INTEGER PRIMARY KEY,
      cumulative INTEGER, 
      reader_date TEXT, 
      unit TEXT, 
      energy_used INTEGER
    )
    `
    )
    cb();
  });
}

export function dumpData(dbPool: Database) {

  const { electricity } = sampleData;
  const meterReadings: Array<MeterReading> = electricity.map(i=> (new MeterReading(i.cumulative,0,i.ReaderDate,i.unit)));

  const orderedMeterReadings = meterReadings.sort((a: MeterReading, b: MeterReading) => a.cumulative - b.cumulative);

  for (let i = 0; i < orderedMeterReadings.length; i++) {

    let indexForPreviousMeterReader = i - 1;
    let previousMonthReader = orderedMeterReadings[indexForPreviousMeterReader],
      currentMonthReader = orderedMeterReadings[i];

    let energyUsageInCurrentMonth = calculateEnergyUsage(
      previousMonthReader,
      currentMonthReader);

    currentMonthReader.energyUsage = energyUsageInCurrentMonth;
    let { cumulative, readerDate, unit, energyUsage } = currentMonthReader;
    dbPool.run(
      `INSERT INTO meter_reads 
      (
        cumulative, 
        Reader_date, 
        unit, 
        energy_used)
      VALUES (?, ?, ?,?)`,
      [cumulative,
        readerDate,
        unit,
        energyUsage]
    );
  }
}