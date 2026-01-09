import { useForm } from "react-hook-form"
import { createGoalProgressSchema, type CreateGoalProgress } from "@/modules/goal-progress/schemas/goalProgressSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createGoalProgress } from "../actions/goalProgressActions"
import { useGoalById } from "@/modules/goals/hooks/useGoalById"
import { useInfiniteGoalsByUser } from "@/modules/goals/hooks/useInfiniteGoalsByUser"

export const useCreateGoalProgress = (goalId: string) => {

  const { goal } = useGoalById(goalId)
  const { goals } = useInfiniteGoalsByUser()

  const form = useForm<CreateGoalProgress>({
    resolver: zodResolver(createGoalProgressSchema),
    defaultValues: {
      goalId,
      progress: 0,
    },
  })

  const createGoalProgressMutation = useMutation({
    mutationFn: createGoalProgress,
    onSuccess: async () => {
      await goals.refetch()
      toast.success("Progreso registrado correctamente")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const showProgress =
    !!goal.data?.data && goal.data.data.goalType === "target";

  return {
    form,
    createGoalProgressMutation,
    showProgress,
  }
}
