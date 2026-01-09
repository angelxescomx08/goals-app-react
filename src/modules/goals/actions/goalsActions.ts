import { api } from "@/lib/api";
import { type CreateGoalSchema, type GoalSchema, type StatisticsSchema } from "@/modules/goals/schemas/goalSchema";
import type { UnitSchema } from "@/modules/units/schemas/unitSchema";
import { type Pagination } from "@/types/pagination";

export async function getGoalsByUser(page: number = 1, limit: number = 10) {
  return api.get<Pagination<GoalSchema>>("/goals/by-user", {
    params: {
      page,
      limit,
    },
  })
}

export async function createGoal(data: CreateGoalSchema) {
  return api.post<{
    goal: GoalSchema
  }>("/goals", data)
}

export async function getGoalById(id: string) {
  return api.get<GoalSchema & { units: UnitSchema } & { parentGoal?: GoalSchema }>(`/goals/${id}`)
}

export async function getStatistics({ endDate, startDate }: { startDate: string, endDate: string }) {
  return api.get<StatisticsSchema>(`/goals/statistics?startDate=${startDate}&endDate=${endDate}`);
}

export async function toggleCompletion(id: string) {
  return api.put<{
    message: string
  }>(`/goals/${id}/toggle-completion`)
}

export async function getGoalsWithTypeGoal() {
  return api.get<GoalSchema[]>("/goals/with-type-goal")
}