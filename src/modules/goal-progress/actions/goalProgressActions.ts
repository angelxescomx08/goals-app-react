import { api } from "@/lib/api"
import type { CreateGoalProgress, GoalProgress } from "../schemas/goalProgressSchema"

export async function createGoalProgress(data: CreateGoalProgress) {
  return api.post<{
    goalProgress: GoalProgress
  }>("/goal-progress", data)
}