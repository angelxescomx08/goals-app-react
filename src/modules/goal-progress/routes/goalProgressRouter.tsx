import type { RouteObject } from "react-router";
import { CreateGoalProgressPage } from "../pages/CreateGoalProgressPage";

export const goalProgressRoutes: RouteObject = {
  path: "progress",
  children: [
    {
      path: ":goalId/create",
      element: <CreateGoalProgressPage />,
    },
  ],
}