import { api } from "@/lib/api";
import { type CreateGoalSchema, type GoalSchema, type StatisticsSchema } from "@/modules/goals/schemas/goalSchema";
import type { UnitSchema } from "@/modules/units/schemas/unitSchema";
import { type Pagination } from "@/types/pagination";

export type GoalsByUserFilters = {
  startDate: string;
  endDate: string;
  page?: number;
  limit?: number;
  search?: string;
  completed?: boolean;
  goalType?: "target" | "manual" | "goals";
  excludeChildGoals?: boolean;
};

export async function getGoalsByUser(filters: GoalsByUserFilters & { page: number }) {
  const { startDate, endDate, page = 1, limit = 10, search, completed, goalType, excludeChildGoals } = filters;
  const params: Record<string, string | number | boolean> = {
    startDate,
    endDate,
    page,
    limit,
  };
  if (search != null && search.trim() !== "") params.search = search.trim();
  if (completed !== undefined) params.completed = completed;
  if (goalType != null) params.goalType = goalType;
  if (excludeChildGoals === true) params.excludeChildGoals = true;

  return api.get<Pagination<GoalSchema>>("/goals/by-user", { params });
}

export async function createGoal(data: CreateGoalSchema) {
  return api.post<{
    goal: GoalSchema
  }>("/goals", data)
}

export async function getGoalById(id: string) {
  return api.get<GoalSchema & { units: UnitSchema } & { parentGoal?: GoalSchema } & { children?: GoalSchema[] }>(`/goals/${id}`)
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

export async function deleteGoal(id: string) {
  return api.delete<{
    message: string
  }>(`/goals/${id}`)
}

export async function getGoalStatistics(id: string) {
  return api.get<{
    historicalData: { date: string, progress: number }[]
  }>(`/goals/statistics/${id}`)
}