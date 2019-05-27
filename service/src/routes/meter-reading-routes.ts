import * as KoaRouter from "koa-router";
import { MeterReadingController } from "../controllers/meter-reading-controller";
import { MeterReadingService } from "../services/meter-reading-service";
import { getDatabasePool } from "../infrastructure/database";

const dbPool = getDatabasePool();
const service = new MeterReadingService(dbPool);
const instance = new MeterReadingController(service);
const meterReadingRoutes = new KoaRouter();

meterReadingRoutes.get("/", async (ctx, next) => await instance.list(ctx, next));
meterReadingRoutes.post("/", async (ctx, next) => await instance.add(ctx, next));

export { meterReadingRoutes };