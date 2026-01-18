import { api } from "@/lib/api"
import { type UserStatsResponseSchema } from "../schemas/userStatsSchema"

export type GetUserStatsParams = {
  startDate: string
  endDate: string
  type: "week" | "month" | "year" | "all"
}

export async function getUserStats(params: GetUserStatsParams) {
  return api.get<UserStatsResponseSchema>("/user-stats", {
    params: {
      startDate: params.startDate,
      endDate: params.endDate,
      type: params.type,
    },
  })
}
