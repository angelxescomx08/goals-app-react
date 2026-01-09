import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { toggleCompletion } from "../actions/goalsActions"
import { KEY_GOALS, useInfiniteGoalsByUser } from "@/modules/goals/hooks/useInfiniteGoalsByUser"

export const useToggleCompletion = () => {

  const { goals } = useInfiniteGoalsByUser()
  const queryClient = useQueryClient()

  const toggleCompletionMutation = useMutation({
    mutationFn: toggleCompletion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [KEY_GOALS],
        exact: false,
        refetchType: "active",
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
