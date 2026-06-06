import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteGoal } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"
import { toast } from "sonner"

export const useDeteleGoal = () => {
  const queryClient = useQueryClient()

  const deleteGoalMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: queryKeys.goals.lists() })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.goals.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.statistics.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userStats.all }),
      ])
      toast.success("Meta eliminada correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { deleteGoalMutation }
}
