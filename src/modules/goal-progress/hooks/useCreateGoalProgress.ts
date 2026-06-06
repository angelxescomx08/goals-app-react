import { useForm } from "react-hook-form"
import { createGoalProgressSchema, type CreateGoalProgress } from "@/modules/goal-progress/schemas/goalProgressSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createGoalProgress } from "../actions/goalProgressActions"
import { useGoalById } from "@/modules/goals/hooks/useGoalById"
import { queryKeys } from "@/lib/queryKeys"
import { useNavigate } from "react-router"

export const useCreateGoalProgress = (goalId: string) => {
  const { goal } = useGoalById(goalId)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<CreateGoalProgress>({
    resolver: zodResolver(createGoalProgressSchema),
    defaultValues: {
      goalId,
      progress: undefined,
    },
  })

  const createGoalProgressMutation = useMutation({
    mutationFn: createGoalProgress,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: queryKeys.goals.lists() })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.goals.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.statistics.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userStats.all }),
      ])
      toast.success("Progreso registrado correctamente")
      navigate(`/panel/goals/${goalId}`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const showProgress = !!goal.data?.data && goal.data.data.goalType === "target"

  return {
    form,
    createGoalProgressMutation,
    showProgress,
  }
}
