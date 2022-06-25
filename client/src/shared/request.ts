import axios, { AxiosError } from "axios"
import { getToken } from "./token"

export const request = axios.create({
  baseURL: "http://localhost:7001/api",
})

request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers!["authorization"] = token
  return config
})

request.interceptors.response.use(
  (res) => {
    if (res.data.code === -1) {
      throw Error(res.data.message)
    }
    return res.data.data
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // TODO: 身份验证异常，需要重新登录
    }
    throw err
  }
)

