import { ProLayout } from '@ant-design/pro-layout'
import { Button, Space } from 'antd'
import { Link, Outlet, useLocation } from 'oh-router-react'
import { useMemo } from 'react'
import { router } from '../router'
import { userStore } from '../stores/user'

export function BasicLayout() {
  const location = useLocation()

  const menus = useMemo(() => {
    return router
      .getRoutes()
      .find((route) => route.name === 'base')!
      .children?.map((route) => {
        return route.meta?.menu
      })
  }, [])

  return (
    <ProLayout
      location={location}
      style={{
        height: '100vh',
      }}
      rightContentRender={() => {
        return (
          <Space>
            <span>{userStore.user.username}</span>
            <Button
              onClick={() => {
                userStore.logout()
                router.navigate('/login')
              }}
            >
              登出
            </Button>
          </Space>
        )
      }}
      menuItemRender={(it: any) => {
        return <Link to={it.path}>{it.name}</Link>
      }}
      route={{
        path: '/',
        routes: menus,
      }}
    >
      <Outlet />
    </ProLayout>
  )
}

