import { z } from "zod"
import { unitSchema } from "@/modules/units/schemas/unitSchema"

export const userStatSchema = z.object({
  unit: unitSchema,
  percentage: z.number(),
  currentPeriod: z.number(),
  lastPeriod: z.number(),
})

export const userStatsResponseSchema = z.object({
  stats: z.array(userStatSchema),
})

export type UserStatSchema = z.infer<typeof userStatSchema>
export type UserStatsResponseSchema = z.infer<typeof userStatsResponseSchema>
