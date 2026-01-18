import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { createGoalSchema, type CreateGoalSchema } from "../schemas/goalSchema"
import { createGoal } from "../actions/goalsActions"
import { useEffect } from "react"
import { useUnitsByUser } from "@/modules/units/hooks/useUnitsByUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { KEY_STATISTICS } from "./useStatistics"
import { KEY_GOALS_WITH_TYPE_GOAL, useGoalsWithTypeGoal } from "./useGoalsWithTypeGoal"
import { KEY_GOALS } from "./useInfiniteGoalsByUser"
import { invalidateQueries } from "@/lib/invalidateQueries"

export const useCreateGoal = () => {
  const { units } = useUnitsByUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { goals: goalsWithTypeGoal } = useGoalsWithTypeGoal()

  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      goalType: "target",
      parentGoalId: null,
      target: 0,
      unitId: null,
      unitIdCompleted: null,
      unitCompletedAmount: null,
    },
  })

  const goalType = useWatch({
    control: form.control,
    name: "goalType",
  })

  const showTargetAndUnit = goalType === "target"

  useEffect(() => {
    if (goalType !== "target") {
      form.setValue("unitId", null, { shouldDirty: false })
      form.setValue("target", 0, { shouldDirty: false })
    }
  }, [goalType, form])

  const createGoalMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: [KEY_GOALS],
        exact: false,
      })

      await invalidateQueries(queryClient, [
        KEY_STATISTICS,
        KEY_GOALS_WITH_TYPE_GOAL,
        KEY_GOALS,
      ])

      toast.success("Meta creada correctamente")
      form.reset()
      navigate("/panel")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    form,
    createGoalMutation,
    showTargetAndUnit,
    units,
    goalsWithTypeGoal,
  }
}
