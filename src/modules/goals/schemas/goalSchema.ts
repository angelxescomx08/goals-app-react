import { z } from "zod"

export const goalTypes = z.enum(["target", "manual", "goals"])

export const goalSchema = z.object({
  id: z.uuid(),
  parentGoalId: z.uuid().nullish(),
  userId: z.uuid(),
  unitId: z.uuid().nullish(),
  unitIdCompleted: z.uuid().nullish(),
  unitCompletedAmount: z.number().nullish(),
  title: z.string().min(1, "Título requerido"),
  goalType: goalTypes,
  target: z.number().nullish(),
  currentProgress: z.number().nullish(),
  description: z.string().min(1, "Descripción requerida"),
  completedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createGoalSchema = goalSchema.omit({
  id: true,
  userId: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
}).superRefine((data, ctx) => {
  if (data.goalType === "target") {
    if (data.unitId === null) {
      ctx.addIssue({
        path: ["unitId"],
        message: "La unidad es requerida cuando el tipo es target",
        code: "custom",
      })
    }

    if (!data.target) {
      ctx.addIssue({
        path: ["target"],
        message: "El objetivo es requerido cuando el tipo es target",
        code: "custom",
      })
    }
  }

  if (data.unitIdCompleted) {
    if (!data.unitCompletedAmount) {
      ctx.addIssue({
        path: ["unitCompletedAmount"],
        message: "La cantidad completada es requerida cuando el unitIdCompleted es proporcionado",
        code: "custom",
      })
    }
  }
})

export const statisticsSchema = z.object({
  totalGoals: z.number(),
  totalCompletedGoals: z.number(),
  pendingGoals: z.number(),
})

export type GoalSchema = z.infer<typeof goalSchema>
export type CreateGoalSchema = z.infer<typeof createGoalSchema>
export type StatisticsSchema = z.infer<typeof statisticsSchema>