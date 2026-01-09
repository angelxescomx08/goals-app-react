import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { toggleCompletion } from "../actions/goalsActions"
import { KEY_GOALS } from "@/modules/goals/hooks/useInfiniteGoalsByUser"

export const useToggleCompletion = () => {

  const queryClient = useQueryClient()

  const toggleCompletionMutation = useMutation({
    mutationFn: toggleCompletion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [KEY_GOALS],
        exact: false
      })
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
