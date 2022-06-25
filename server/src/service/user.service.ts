import { App, Inject, Provide } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';
import * as jwt from 'jsonwebtoken';

const users = [
  {
    id: 1,
    username: '灰灰',
    password: '123456',
    role: 'admin',
  },
  {
    id: 2,
    username: '白白',
    password: '123456',
    role: 'superAdmin',
  },
];

@Provide()
export class UserService {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  async login(options: { username: string; password: string }) {
    const user = users.find(
      it => it.username === options.username && it.password === it.password
    );
    if (!user) throw Error('用户不存在');
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      this.app.getConfig('keys')
    );
  }

  async getUserinfo() {
    let user: any = this.ctx.getAttr('user');
    user = users.find(it => it.id === user.id);
    delete user.password;
    return user;
  }
}
