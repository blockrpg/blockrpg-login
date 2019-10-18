import Koa from 'koa';
import Router from 'koa-router';
import * as BRCore from 'blockrpg-core';
import OutsideController from './Module/Outside/Controller';

const app = new BRCore.Koa.App((app) => {
  return app.use(OutsideController);
}, false);

app.Listen(3001);
