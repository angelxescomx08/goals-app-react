import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { createGoalSchema, type CreateGoalSchema } from "../schemas/goalSchema"
import { createGoal } from "../actions/goalsActions"
import { useEffect } from "react"
import { useUnitsByUser } from "@/modules/units/hooks/useUnitsByUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useInfiniteGoalsByUser } from "./useInfiniteGoalsByUser"
import { KEY_STATISTICS } from "./useStatistics"
import { KEY_GOALS_WITH_TYPE_GOAL, useGoalsWithTypeGoal } from "./useGoalsWithTypeGoal"
import { useDateRange } from "@/hooks/useDateRange"

export const useCreateGoal = () => {
  const { endDate, startDate } = useDateRange("all")
  const { units } = useUnitsByUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { goals: goalsWithTypeGoal } = useGoalsWithTypeGoal()
  const { goals } = useInfiniteGoalsByUser({ endDate, startDate })

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
    if (goalType !== "target") {
      form.setValue("unitId", null, { shouldDirty: false })
      form.setValue("target", 0, { shouldDirty: false })
    }
  }, [goalType, form])

  const createGoalMutation = useMutation({
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
