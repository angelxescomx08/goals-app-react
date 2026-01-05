import { createHashRouter, Navigate } from "react-router";
import { AuthRouter } from "./auth/AuthRouter";
import { PanelRouter } from "./panel/PanelRouter";

export const router = createHashRouter([
  AuthRouter,
  PanelRouter,
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
]);
