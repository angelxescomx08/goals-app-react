import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteGoalProgress } from "../actions/goalProgressActions"
import { queryKeys } from "@/lib/queryKeys"

export const useDeleteGoalProgress = (goalId: string) => {
  const queryClient = useQueryClient()

  const deleteGoalProgressMutation = useMutation({
    mutationFn: deleteGoalProgress,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.goalProgress.list(goalId), refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.goals.all, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.statistics.all, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userStats.all, refetchType: "all" }),
      ])
      toast.success("Progreso eliminado correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { deleteGoalProgressMutation }
}
