import { Middleware, MiddlewareContext } from 'oh-router'
import { getToken } from '../../shared/token'
import { userStore } from '../../stores/user'

export class FetchUserMiddleware extends Middleware {
  async handler(
    ctx: MiddlewareContext<{}>,
    next: () => Promise<any>
  ): Promise<void> {
    const token = getToken()
    if (token && !userStore.user) {
      await userStore.fetchUser()
    }
    next()
  }
}
