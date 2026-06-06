import type { RouteObject } from "react-router";
import { CreateGoalProgressPage } from "../pages/CreateGoalProgressPage";
import { GoalProgressListPage } from "../pages/GoalProgressListPage";

export const goalProgressRoutes: RouteObject = {
  path: "progress",
  children: [
    {
      path: ":goalId",
      element: <GoalProgressListPage />,
    },
    {
      path: ":goalId/create",
      element: <CreateGoalProgressPage />,
    },
  ],
}
