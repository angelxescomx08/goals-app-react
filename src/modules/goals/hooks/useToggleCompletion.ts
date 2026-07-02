import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { toggleCompletion } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"

export const useToggleCompletion = () => {
  const queryClient = useQueryClient()

  const toggleCompletionMutation = useMutation({
    mutationFn: toggleCompletion,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: queryKeys.goals.lists() })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.goals.all, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.statistics.all, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userStats.all, refetchType: "all" }),
      ])
      toast.success("Estado de la meta actualizado correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { toggleCompletionMutation }
}
