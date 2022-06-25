import { Router } from "oh-router"
import { BasicLayout } from "../layouts/basic"
import { BookManage } from "../pages/book-manage"
import { Login } from "../pages/login"
import { UserManage } from "../pages/user-manage"
import { LoginCheckMiddleware } from "./middlewares/loginCheck"
import { RoleCheckMiddleware } from "./middlewares/roleCheck"

export interface Meta {
  role: ("admin" | "superAdmin")[]
}

export const router = new Router<Meta>({
  middlewares: [new LoginCheckMiddleware(), new RoleCheckMiddleware()],
  routes: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          index: true,
          element: "首页",
        },
        {
          path: "/user-manage",
          element: <UserManage />,
          meta: {
            role: ["superAdmin"],
          },
        },
        {
          path: "/book-manage",
          element: <BookManage />,
        },
      ],
    },
    {
      path: "*",
      element: "404",
    },
  ],
})

