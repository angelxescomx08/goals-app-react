import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteGoal } from "../actions/goalsActions"
import { KEY_GOALS } from "./useInfiniteGoalsByUser"
import { invalidateQueries } from "@/lib/invalidateQueries"
import { KEY_STATISTICS } from "./useStatistics"
import { KEY_GOALS_WITH_TYPE_GOAL } from "./useGoalsWithTypeGoal"
import { toast } from "sonner"

export const useDeteleGoal = () => {
  const queryClient = useQueryClient()

  const deleteGoalMutation = useMutation({
    mutationFn: deleteGoal,
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
      toast.success("Meta eliminada correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return {
    deleteGoalMutation,
  }
}
