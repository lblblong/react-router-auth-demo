import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        const data = await next();
        return {
          code: 0,
          data,
        };
      } catch (err) {
        return {
          code: -1,
          message: err.message,
        };
      }
    };
  }
}
