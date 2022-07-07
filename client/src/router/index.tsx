import { RouteObject, Router } from 'oh-router'
import { BasicLayout } from '../layouts/basic'
import { BookManage } from '../pages/book-manage'
import { Login } from '../pages/login'
import { UserManage } from '../pages/user-manage'
import { FetchUserMiddleware } from './middlewares/fetchUser'
import { LoginCheckMiddleware } from './middlewares/loginCheck'

export interface Meta {
  role?: ('admin' | 'superAdmin')[]
  menu?: {
    name: string
    path: string
  }
}

export const router = new Router<Meta>({
  middlewares: [
    new LoginCheckMiddleware(),
    new FetchUserMiddleware(),
    // new RoleCheckMiddleware(),
  ],
  routes: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      name: 'base',
      element: <BasicLayout />,
      children: [],
    },
    {
      path: '*',
      element: '404',
    },
  ],
})

const permissionRoutes: RouteObject<Meta>[] = [
  {
    index: true,
    element: '首页',
    meta: {
      menu: {
        name: '首页',
        path: '/',
      },
    },
  },
  {
    path: '/user-manage',
    element: <UserManage />,
    meta: {
      role: ['superAdmin'],
      menu: {
        name: '用户管理',
        path: '/user-manage',
      },
    },
  },
  {
    path: '/book-manage',
    element: <BookManage />,
    meta: {
      menu: {
        name: '图书管理',
        path: '/book-manage',
      },
    },
  },
]

export function resetPermissionRoutes(user?: any) {
  const baseRoute = router.getRoutes().find((route) => route.name === 'base')!

  if (user) {
    const tmpRoutes: RouteObject<Meta>[] = []
    for (const route of permissionRoutes) {
      if (route.meta?.role && !route.meta.role.includes(user.role)) continue
      tmpRoutes.push(route)
    }
    baseRoute.children = tmpRoutes
  } else {
    baseRoute.children = []
  }
}

