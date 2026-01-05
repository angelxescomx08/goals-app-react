import { z } from "zod"

export const goalProgressSchema = z.object({
  id: z.uuid(),
  goalId: z.uuid(),
  progress: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type GoalProgressSchema = z.infer<typeof goalProgressSchema>