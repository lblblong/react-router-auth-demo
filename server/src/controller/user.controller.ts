import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { MustLoginMiddleware } from '../middleware/must-login.middleware';
import { UserService } from '../service/user.service';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.userService.login({
      username,
      password,
    });
  }

  @Get('/userinfo', { middleware: [MustLoginMiddleware] })
  async getUserinfo() {
    return this.userService.getUserinfo();
  }
}
