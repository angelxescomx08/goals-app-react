import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { toggleCompletion } from "../actions/goalsActions"
import { useInfiniteGoalsByUser } from "@/modules/goals/hooks/useInfiniteGoalsByUser"
import { KEY_STATISTICS } from "./useStatistics"

export const useToggleCompletion = () => {

  const { goals } = useInfiniteGoalsByUser()
  const queryClient = useQueryClient()

  const toggleCompletionMutation = useMutation({
    mutationFn: toggleCompletion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [KEY_STATISTICS],
        exact: false,
      })
      await goals.refetch()
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
