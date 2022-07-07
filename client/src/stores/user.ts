import { getUserInfo, login } from "../apis/user"
import { resetPermissionRoutes } from "../router"
import { removeToken, setToken } from "../shared/token"

export const userStore = new (class {
  async login(username: string, password: string) {
    const token = await login({ username, password })
    setToken(token)
  }

  user: any

  async fetchUser() {
    this.user = await getUserInfo()
    resetPermissionRoutes(this.user)
  }

  logout() {
    removeToken()
    this.user = undefined
    resetPermissionRoutes()
  }
})()

