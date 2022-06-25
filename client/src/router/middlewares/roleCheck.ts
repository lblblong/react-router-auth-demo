import { Middleware, MiddlewareContext } from "oh-router"
import { Meta, router } from ".."
import { userStore } from "../../stores/user"

export class RoleCheckMiddleware extends Middleware<Meta> {
  async handler(
    ctx: MiddlewareContext<Meta>,
    next: () => Promise<any>
  ): Promise<void> {
    if (!userStore.user) await userStore.fetchUser()

    if (ctx.to.meta.role.includes(userStore.user.role)) {
      next()
    } else {
      alert("无权访问")
      if (!ctx.from) router.navigate("/")
    }
  }

  register({ to }: MiddlewareContext<Meta>): boolean {
    return to.meta.role !== undefined
  }
}

