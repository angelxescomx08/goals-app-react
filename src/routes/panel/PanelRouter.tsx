import type { RouteObject } from "react-router";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { GoalsPage } from "@/modules/goals/pages/GoalsPage";
import { CreateGoalPage } from "@/modules/goals/pages/CreateGoalPage";
import { GoalByIdPage } from "@/modules/goals/pages/GoalByIdPage";

export const PanelRouter: RouteObject = {
  path: "/panel",
  element: <PrivateRoute />,
  children: [
    {
      path: "/panel",
      element: <GoalsPage />,
    },
    {
      path: "/panel/goals/create",
      element: <CreateGoalPage />,
    },
    {
      path: "/panel/goals/:id",
      element: <GoalByIdPage />,
    },
  ],
};
