import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { toggleCompletion } from "../actions/goalsActions"
import { KEY_GOALS } from "@/modules/goals/hooks/useInfiniteGoalsByUser"
import { invalidateQueries } from "@/lib/invalidateQueries"
import { KEY_STATISTICS } from "./useStatistics"

export const useToggleCompletion = () => {

  const queryClient = useQueryClient()

  const toggleCompletionMutation = useMutation({
    mutationFn: toggleCompletion,
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: [KEY_GOALS],
        exact: false,
      })
      await invalidateQueries(queryClient, [
        KEY_STATISTICS,
        KEY_GOALS,
      ])
      toast.success("Estado de la meta actualizado correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    toggleCompletionMutation,
  }
}
