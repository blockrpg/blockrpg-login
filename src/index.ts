import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import OutsideController from './Module/Outside/Controller';
import { Rsp } from 'blockrpg-core/built/Koa/Rsp';

const app = new Koa();
const router = new Router();

async function main() {
  app
    .use(KoaBodyParser())
    .use(OutsideController)
    .use(router.allowedMethods())
    .use((ctx, next) => {
      Rsp.Error(ctx, 404, '资源不存在');
    });
  app.listen(3000);
}

main();
