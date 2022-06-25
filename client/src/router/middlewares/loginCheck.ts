import { Middleware, MiddlewareContext } from "oh-router"
import { router } from ".."
import { getToken } from "../../shared/token"

export class LoginCheckMiddleware extends Middleware {
  async handler(
    ctx: MiddlewareContext<{}>,
    next: () => Promise<any>
  ): Promise<void> {
    const token = getToken()

    if (ctx.to.pathname === "/login") {
      if (token) {
        router.navigate("/")
      } else {
        next()
      }
      return
    }

    if (token) {
      next()
    } else {
      router.navigate("/login")
    }
  }
}

