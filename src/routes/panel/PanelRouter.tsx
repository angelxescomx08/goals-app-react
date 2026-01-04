import { RouteObject } from "react-router";
import { PrivateRoute } from "../PrivateRoute";
import { GoalsPage } from "@/modules/goals/pages/GoalsPage";
import { CreateGoalPage } from "@/modules/goals/pages/CreateGoalPage";

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
  ],
};
