import type { RouteObject } from "react-router";
import { GoalsPage } from "@/modules/goals/pages/GoalsPage";
import { CreateGoalPage } from "@/modules/goals/pages/CreateGoalPage";
import { GoalByIdPage } from "@/modules/goals/pages/GoalByIdPage";
import { GoalView } from "@/modules/goals/pages/GoalView";
import { goalProgressRoutes } from "@/modules/goal-progress/routes/goalProgressRouter";

export const goalsRoutes: RouteObject = {
  path: "goals",
  children: [
    {
      path: "",
      element: <GoalsPage />,
    },
    {
      path: "create",
      element: <CreateGoalPage />,
    },
    {
      path: "edit/:id",
      element: <GoalByIdPage />,
    },
    {
      path: ":id",
      element: <GoalView />,
    },
    goalProgressRoutes
  ],
}