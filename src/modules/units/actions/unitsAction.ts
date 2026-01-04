import { api } from "@/lib/api"
import { CreateUnitSchema, UnitSchema } from "../schemas/unitSchema"

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