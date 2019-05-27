import { createServer } from './index';
import * as Koa from 'koa';
import { expect } from 'chai';

describe('index', () => {
  it('should create an instance of a Koa server', () => {
    const instance = createServer().server;
    expect(instance).to.be.instanceof(Koa);
  });
});
