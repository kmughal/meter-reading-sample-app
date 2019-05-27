import { ParameterizedContext } from 'koa';
import { IRouterParamContext } from 'koa-router';

export const globalErrorHandler = async (
  ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>,
  next: () => Promise<any>) => {
  try {
    
    await next();

  } catch (err) {

    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
    
  }
}