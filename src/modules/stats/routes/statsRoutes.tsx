import type { RouteObject } from "react-router"
import { StatsDescriptivePage } from "../pages/StatsDescriptivePage"

export const statsRoutes: RouteObject = {
  path: "stats",
  children: [
    {
      path: "",
      element: <StatsDescriptivePage />,
    },
  ],
}
