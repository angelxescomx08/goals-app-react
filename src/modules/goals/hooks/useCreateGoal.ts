import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { createGoalSchema, type CreateGoalSchema } from "../schemas/goalSchema"
import { createGoal } from "../actions/goalsActions"
import { useEffect } from "react"
import { useUnitsByUser } from "@/modules/units/hooks/useUnitsByUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useGoalsWithTypeGoal } from "./useGoalsWithTypeGoal"
import { queryKeys } from "@/lib/queryKeys"

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
      target: undefined,
      unitId: null,
      unitIdCompleted: null,
      unitCompletedAmount: undefined,
    },
  })

  const goalType = useWatch({ control: form.control, name: "goalType" })
  const showTargetAndUnit = goalType === "target"

  useEffect(() => {
    if (goalType !== "target") {
      form.setValue("unitId", null, { shouldDirty: false })
      form.setValue("target", undefined, { shouldDirty: false })
    }
  }, [goalType, form])

  const createGoalMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: queryKeys.goals.lists() })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.goals.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.statistics.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userStats.all }),
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
