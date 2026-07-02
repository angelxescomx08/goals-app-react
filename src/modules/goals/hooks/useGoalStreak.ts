import { useQuery } from "@tanstack/react-query"
import { getGoalStreak } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"

export const useGoalStreak = (id: string, enabled = true) => {
  const goalStreak = useQuery({
    queryKey: queryKeys.goals.streak(id),
    queryFn: () => getGoalStreak(id),
    enabled: !!id && enabled,
  })

  return { goalStreak }
}
