import {createTable, initialize, dumpData} from '../infrastructure/seed-data';
import { getDatabasePool } from "../infrastructure/database";
import { MeterReadingService } from "./meter-reading-service";
import { expect } from "chai";
import { Database } from "sqlite3";

describe("Meter reading service tests", () => {

  describe("calling list", () => {
    it("should return a list of meter readings", (done) => {
      const dbPool = getDatabasePool();
      createTable(dbPool,async() => {
        dumpData(dbPool);
        const service = new MeterReadingService(dbPool);
        const meterReadings = await service.list();
        const received = meterReadings.length;
        expect(received).equal(14);
        dbPool.close();
        done();
      });
     
    });

    it("should return an empty list when there are not meter readings", async () => {
      const dbPool = getDatabasePool();
      const service = new MeterReadingService(dbPool);
      const meterReadings = await service.list();

      const received = meterReadings.length;
      expect(received).equal(0);
    });
  });

  describe("calling add meter reading", () => {
    let dbPool: Database;
    let service: MeterReadingService = null;

    before(done => {
      dbPool = getDatabasePool();
      createTable(dbPool, () => done());
      service = new MeterReadingService(dbPool);
    });

    after(() => dbPool.close());

    it("should be able to add new meter reading", async () => {
      await service.add(24290, "2018-05-29T00:00:00.000Z")
      const meterReadings = await service.list();

      const received = meterReadings.length;
      expect(received).equal(1);
    });

    it("should throw an error when cumulative reading is less than 0.", async () => {
      try {
        await service.add(-1, "2018-05-29T00:00:00.000Z");
      } catch (e) {
        expect(e.message).equal('invalid reading')
      }
    });

    it("should throw an error when cumulative reading is less than old reading.", async () => {
      await service.add(24290, "2018-05-29T00:00:00.000Z");
      expect(await service.add(21290, "2018-05-29T00:00:00.000Z")).throw;
    });

    it("should throw an error when reading date is null.", async () => {
      try {
        await service.add(10, "");
      } catch (e) {
        expect(e.message).equal('invalid reading date')
      }
    });

  });
});