import { Button, Input } from "antd"
import { useState } from "react"
import { router } from "../../router"
import { userStore } from "../../stores/user"
import styles from "./index.module.scss"

export function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    await userStore.login(username, password)
    router.navigate("/")
  }

  return (
    <div className={styles.index}>
      <h1>登录</h1>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="账号"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
      />
      <Button loading={loading} type="primary" block onClick={onSubmit}>
        登录
      </Button>
    </div>
  )
}

// 之前的登录页
// export function Login() {
//   return <div>登录页</div>
// }

