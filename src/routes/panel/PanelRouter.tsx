import type { RouteObject } from "react-router";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { goalsRoutes } from "@/modules/goals/routes/goalsRoutes";
import { PanelPage } from "@/modules/goals/pages/PanelPage";

export const PanelRouter: RouteObject = {
  path: "/panel",
  element: <PrivateRoute />,
  children: [
    {
      path: "",
      element: <PanelPage />,
    },
    goalsRoutes
  ]
};
