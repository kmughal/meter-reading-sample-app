
import * as supertest from 'supertest';
import { createServer } from '../server/index';
import * as Koa from 'koa';
import { expect } from 'chai';


describe('meter reading routes tests', () => {
  let server: Koa = null;

  before(done => {
    const app = createServer()
    app.start("9401", () => {
      server = app.server;
      done();
    });
  });

  it('should be able to send request to list meter readings', async () => {
    const request = await supertest(server.callback()).get('/meter-readings');
    expect(request.status).to.equal(200);
  });
})