import { useForm } from "react-hook-form"
import { createGoalProgressSchema, type CreateGoalProgress } from "@/modules/goal-progress/schemas/goalProgressSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createGoalProgress } from "../actions/goalProgressActions"
import { useGoalById } from "@/modules/goals/hooks/useGoalById"
import { KEY_GOALS } from "@/modules/goals/hooks/useInfiniteGoalsByUser"
import { invalidateQueries } from "@/lib/invalidateQueries"
import { KEY_STATISTICS } from "@/modules/goals/hooks/useStatistics"
import { useNavigate } from "react-router"

export const useCreateGoalProgress = (goalId: string) => {

  const { goal } = useGoalById(goalId)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<CreateGoalProgress>({
    resolver: zodResolver(createGoalProgressSchema),
    defaultValues: {
      goalId,
      progress: 0,
    },
  })

  const createGoalProgressMutation = useMutation({
    mutationFn: createGoalProgress,
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: [KEY_GOALS],
        exact: false,
      })

      await invalidateQueries(queryClient, [
        KEY_STATISTICS,
        KEY_GOALS,
      ])

      toast.success("Progreso registrado correctamente")
      navigate(`/panel/goals/${goalId}`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const showProgress =
    !!goal.data?.data && goal.data.data.goalType === "target";

  return {
    form,
    createGoalProgressMutation,
    showProgress,
  }
}
