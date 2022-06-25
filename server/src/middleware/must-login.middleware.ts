import { IMiddleware, MidwayHttpError } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import * as jwt from 'jsonwebtoken';

@Middleware()
export class MustLoginMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        const token = ctx.req.headers.authorization;
        ctx.setAttr('user', jwt.verify(token, ctx.app.getConfig('keys')));
      } catch (err) {
        throw new MidwayHttpError('请登录', 401);
      }
      return next();
    };
  }

  static getName(): string {
    return 'must-login';
  }
}
