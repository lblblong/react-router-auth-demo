export function getToken() {
  return localStorage.getItem("token") as string
}

export function setToken(token: string) {
  localStorage.setItem("token", token)
}

export function removeToken() {
  localStorage.removeItem("token")
}
