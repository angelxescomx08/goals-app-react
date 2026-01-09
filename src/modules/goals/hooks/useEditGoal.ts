import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { createGoalSchema, type CreateGoalSchema } from "@/modules/goals/schemas/goalSchema"
import { createGoal } from "../actions/goalsActions"
import { useEffect } from "react"
import { useUnitsByUser } from "@/modules/units/hooks/useUnitsByUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useGoalById } from "@/modules/goals/hooks/useGoalById"
import { useInfiniteGoalsByUser } from "./useInfiniteGoalsByUser"
import { KEY_STATISTICS } from "./useStatistics"
import { KEY_GOALS_WITH_TYPE_GOAL, useGoalsWithTypeGoal } from "./useGoalsWithTypeGoal"

export const useEditGoal = (id: string) => {
  const { units } = useUnitsByUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { goal } = useGoalById(id)
  const { goals: goalsWithTypeGoal } = useGoalsWithTypeGoal()
  const { goals } = useInfiniteGoalsByUser()

  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      goalType: "target",
      parentGoalId: null,
      target: 0,
      unitId: null,
    },
  })

  const goalType = useWatch({
    control: form.control,
    name: "goalType",
  })

  const showTargetAndUnit = goalType === "target"

  useEffect(() => {
    if (!goal?.data?.data) return

    const data = goal.data.data

    form.reset({
      title: data.title,
      description: data.description,
      goalType: data.goalType,
      parentGoalId: data.parentGoalId,
      unitId: data.units?.id ?? null,
      target: data.target ?? 0,
    })
  }, [goal?.data?.data, form])

  useEffect(() => {
    if (goalType !== "target") {
      form.setValue("unitId", null, { shouldDirty: false })
      form.setValue("target", 0, { shouldDirty: false })
    }
  }, [goalType, form])

  const editGoalMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: async () => {
      await goals.refetch()

      await queryClient.invalidateQueries({
        queryKey: [KEY_STATISTICS],
        exact: false,
      })

      await queryClient.invalidateQueries({
        queryKey: [KEY_GOALS_WITH_TYPE_GOAL],
        exact: false,
      })

      toast.success("Meta actualizada correctamente")
      form.reset()
      navigate("/panel")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    form,
    editGoalMutation,
    showTargetAndUnit,
    units,
    goalsWithTypeGoal,
  }
}
