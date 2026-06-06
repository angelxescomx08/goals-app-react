import { useQuery } from "@tanstack/react-query"
import { getGoalById } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"

export const useGoalById = (id: string) => {
  const goal = useQuery({
    queryKey: queryKeys.goals.detail(id),
    queryFn: () => getGoalById(id),
    enabled: !!id,
  })

  return { goal }
}
