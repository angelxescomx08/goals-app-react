import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { RouteObject } from "react-router";
import { RegisterPage } from "@/modules/auth/pages/RegisterPage";
import { PublicRoute } from "../PublicRoute";

export const AuthRouter: RouteObject = {
  path: "/auth",
  element: <PublicRoute />,
  children: [
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />,
    }
  ],
};
