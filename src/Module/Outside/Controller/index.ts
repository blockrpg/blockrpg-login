// 外部公开接口，主要负责玩家注册和登录功能
// 其他接口必须要有正确的cookie才能访问
import Router from 'koa-router';
import * as PlayerBLL from 'blockrpg-core/built/Model/Player/BLL'
import { Rsp } from 'blockrpg-core/built/Koa/Rsp';

const router = new Router();

// 注册玩家
// 注册成功之后会返回新的玩家信息
router.post('/api/login/player/register', async (ctx, next) => {
  const params = ctx.request.body;
  const name: string = (params.name || '').trim();
  const password: string = (params.password || '').trim();
  if (!name) {
    Rsp.Fail(ctx, '请输入玩家昵称');
    return;
  }
  if (name.length > 20) {
    Rsp.Fail(ctx, '玩家昵称必须在20个字符以内');
    return;
  }
  if (!password) {
    Rsp.Fail(ctx, '请输入密码');
    return;
  }
  const result = await PlayerBLL.playerRegisterBLL(name, password);
  if (result.IsSuccess) {
    Rsp.Success(ctx, result.Object, '注册成功');
  } else {
    Rsp.Fail(ctx, result.Message);
  }
});

// 登录玩家
// 此操作会在服务器内设置Session
// 登录成功返回Session以及玩家信息
// 若登录成功，此接口会通过Cookie设置Session
router.post('/api/login/player/login', async (ctx, next) => {
  const params = ctx.request.body;
  const input: string = (params.input || '').trim();
  const password: string = (params.password || '').trim();
  if (!input) {
    Rsp.Fail(ctx, '请输入玩家登录信息');
    return;
  }
  if (!password) {
    Rsp.Fail(ctx, '请输入密码');
    return;
  }
  const result = await PlayerBLL.playerLoginBLL(input, password);
  if (result.IsSuccess) {
    ctx.cookies.set('session', result.Object.session);
    Rsp.Success(ctx, result.Object.player, '登录成功');
  } else {
    Rsp.Fail(ctx, result.Message);
  }
});

export default router.routes();
