import { useQuery } from "@tanstack/react-query"
import { getGoalProgress } from "../actions/goalProgressActions"
import { queryKeys } from "@/lib/queryKeys"

export const useGoalProgressList = (goalId: string) => {
  const goalProgress = useQuery({
    queryKey: queryKeys.goalProgress.list(goalId),
    queryFn: () => getGoalProgress(goalId),
    enabled: !!goalId,
  })

  return { goalProgress }
}
