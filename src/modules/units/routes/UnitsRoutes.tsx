import type { RouteObject } from "react-router";
import { UnitsPage } from "../pages/UnitsPage";

export const unitsRoutes: RouteObject = {
  path: "units",
  children: [
    {
      path: "",
      element: <UnitsPage />,
    },
  ],
}