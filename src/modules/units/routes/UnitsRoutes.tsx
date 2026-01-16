import type { RouteObject } from "react-router";
import { UnitsPage } from "../pages/UnitsPage";
import { UnitStatisticsPage } from "../pages/UnitStatisticsPage";

export const unitsRoutes: RouteObject = {
  path: "units",
  children: [
    {
      path: "",
      element: <UnitsPage />,
    },
    {
      path: ":unitId/statistics",
      element: <UnitStatisticsPage />,
    },
  ],
}