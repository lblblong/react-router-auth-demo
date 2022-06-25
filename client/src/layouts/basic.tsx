import { ProLayout } from "@ant-design/pro-layout"
import { Button } from "antd"
import { Link, Outlet, useLocation } from "oh-router-react"
import { router } from "../router"
import { userStore } from "../stores/user"

export function BasicLayout() {
  const location = useLocation()

  return (
    <ProLayout
      location={location}
      style={{
        height: "100vh",
      }}
      rightContentRender={() => {
        return (
          <Button
            onClick={() => {
              userStore.logout()
              router.navigate("/login")
            }}
          >
            登出
          </Button>
        )
      }}
      menuItemRender={(it: any) => {
        return <Link to={it.path}>{it.name}</Link>
      }}
      route={{
        path: "/",
        routes: [
          {
            path: "/",
            name: "首页",
          },
          {
            path: "/user-manage",
            name: "用户管理",
          },
          {
            path: "/book-manage",
            name: "图书管理",
          },
        ],
      }}
    >
      <Outlet />
    </ProLayout>
  )
}

