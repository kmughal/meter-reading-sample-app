import { MeterReading } from "../model/meter-Reading";

export const calculateEnergyUsage = (
  previousMonthReading: MeterReading,
  currentMonthReading: MeterReading) => {

  const previousMonthReadingIsUndefined = typeof previousMonthReading === 'undefined' || previousMonthReading === null;

  if (previousMonthReadingIsUndefined) return 0;

  return currentMonthReading.cumulative - previousMonthReading.cumulative;
};