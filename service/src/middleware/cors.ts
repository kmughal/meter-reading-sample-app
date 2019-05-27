import { ParameterizedContext } from 'koa';
import { IRouterParamContext } from 'koa-router';

export const addCorsMiddleware = async (
  ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>,
  next: () => Promise<any>) => {
  try {

    ctx.response.set("Access-Control-Allow-Origin", "*");
    ctx.response.set("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
    ctx.response.set("Access-Control-Allow-Headers", "Content-Type,Authorization");

    if (ctx.request.method === "OPTOINS") {
      return ctx.response.status = 200;
    }

    await next();

  } catch (err) {

    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
    
  }
}