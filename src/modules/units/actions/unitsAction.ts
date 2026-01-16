import { api } from "@/lib/api"
import { type CreateUnitSchema, type UnitSchema } from "@/modules/units/schemas/unitSchema"

export async function getUnits() {
  return api.get<{
    units: UnitSchema[]
  }>("/units/by-user")
}

export async function createUnit(data: CreateUnitSchema) {
  return api.post<{
    unit: UnitSchema
  }>("/units", data)
}

export type UnitStatisticsResponse = {
  unitId: string
  range: {
    startUtc: string
    endUtc: string
  }
  charts: {
    progressOverTime: Array<{ date: string; value: number }>
    cumulativeProgress: Array<{ date: string; total: number }>
    activityCount: Array<{ date: string; count: number }>
    progressByGoal: Array<{ goalId: string; goalTitle: string; totalProgress: number }>
  }
}

export async function getUnitStatistics(
  unitId: string,
  startUtc: string,
  endUtc: string
) {
  return api.get<UnitStatisticsResponse>("/units/statistics", {
    params: {
      unitId,
      startUtc,
      endUtc,
    },
  })
}