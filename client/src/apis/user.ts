import { request } from "../shared/request";

export async function login(opts: { username: string; password: string }) {
  return request.post<any, string>("/user/login", opts)
}

export async function getUserInfo() {
  return request.get<any, any>("/user/userinfo")
}

