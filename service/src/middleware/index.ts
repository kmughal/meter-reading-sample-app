
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { helloWorldRoute, meterReadingRoutes } from '../routes';
import { globalErrorHandler } from './global-error-handler';
import { addCorsMiddleware } from './cors';

export const addMiddlewares = (server: Koa<any, {}>) => {

  server.use(addCorsMiddleware);
  server.use(globalErrorHandler);
  server.use(bodyParser());

  const router = new KoaRouter();
  router.use("/", helloWorldRoute.routes());
  router.use("/meter-readings", meterReadingRoutes.routes());
  server.use(router.allowedMethods());
  server.use(router.routes());

}