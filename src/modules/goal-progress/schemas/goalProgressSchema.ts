import { z } from "zod"

export const goalProgressSchema = z.object({
  id: z.uuid(),
  goalId: z.uuid(),
  progress: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createGoalProgressSchema = goalProgressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const updateGoalProgressSchema = z.object({
  progress: z.number().positive("El valor debe ser mayor a 0"),
})

export type GoalProgress = z.infer<typeof goalProgressSchema>
export type CreateGoalProgress = z.infer<typeof createGoalProgressSchema>
export type UpdateGoalProgress = z.infer<typeof updateGoalProgressSchema>
