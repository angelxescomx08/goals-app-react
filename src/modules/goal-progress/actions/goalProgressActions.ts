import { api } from "@/lib/api"
import type { CreateGoalProgress, GoalProgress } from "../schemas/goalProgressSchema"

export async function createGoalProgress(data: CreateGoalProgress) {
  return api.post<{ goalProgress: GoalProgress }>("/goal-progress", data)
}

export async function getGoalProgress(goalId: string) {
  return api.get<{ goalProgress: GoalProgress[] }>("/goal-progress", { params: { goalId } })
}

export async function deleteGoalProgress(id: string) {
  return api.delete<{ message: string }>(`/goal-progress/${id}`)
}

export async function updateGoalProgress(id: string, data: { progress: number }) {
  return api.put<{ message: string }>(`/goal-progress/${id}`, data)
}
