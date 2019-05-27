

import * as KoaRouter from "koa-router";

const helloWorldRoute = new KoaRouter();
helloWorldRoute.get('/', (ctx, next) => {
  
  ctx.body = `Server says Hello world @ ${new Date().toString()}`;
  next();

});

export { helloWorldRoute };