
import { MeterReadingService } from '../services/meter-reading-service';
import { ParameterizedContext } from 'koa';
import { IRouterParamContext } from 'koa-router';


export class MeterReadingController {

  service: MeterReadingService = null

  constructor(public meterReaderService: MeterReadingService) {
    this.service = meterReaderService;
  }

  async list(
    ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>,
    _: () => Promise<any>) {
    try {

      const meterReadings = await this.service.list();
      ctx.status = 200;
      ctx.body = meterReadings;

    } catch (e) {
      const meterReadingListError = new Error('Fail to get meter reading');
      throw meterReadingListError;
    }
  }

  async add(
    ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>,
    _: () => Promise<any>) {

      const { cumulative, readerDate } = ctx.request.body;
      await this.service.add(cumulative, readerDate);
      ctx.status = 201;
      ctx.message = "new meter reading added";
  }
}