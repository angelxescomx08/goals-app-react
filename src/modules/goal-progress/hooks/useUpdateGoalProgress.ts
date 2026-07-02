import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateGoalProgress } from "../actions/goalProgressActions"
import { queryKeys } from "@/lib/queryKeys"

type UpdateArgs = { id: string; progress: number }

export const useUpdateGoalProgress = (goalId: string) => {
  const queryClient = useQueryClient()

  const updateGoalProgressMutation = useMutation({
    mutationFn: ({ id, progress }: UpdateArgs) => updateGoalProgress(id, { progress }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.goalProgress.list(goalId), refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.goals.all, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.statistics.all, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userStats.all, refetchType: "all" }),
      ])
      toast.success("Progreso actualizado correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { updateGoalProgressMutation }
}
