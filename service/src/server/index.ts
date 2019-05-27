

import * as Koa from 'koa';
import { addMiddlewares } from "../middleware";

export const createServer = () => {

  const server = new Koa();
  addMiddlewares(server);
  
  return {
    start: (port: string | 3000, cb: () => void) => server.listen(port, null, cb),
    server
  };
};