import * as cors from '@koa/cors';
import { App, Configuration } from '@midwayjs/decorator';
import * as info from '@midwayjs/info';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import { join } from 'path';
import { FormatMiddleware } from './middleware/format.middleware';
// import { DefaultErrorFilter } from './filter/default.filter';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    // add filter
    this.app.getMiddleware().insertFirst(FormatMiddleware);
    this.app.getMiddleware().insertFirst(cors({ origin: '*' }));
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
