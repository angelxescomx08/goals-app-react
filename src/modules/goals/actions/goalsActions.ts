import { api } from "@/lib/api";
import { CreateGoalSchema, GoalSchema } from "../schemas/goalSchema";
import { Pagination } from "@/types/pagination";

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