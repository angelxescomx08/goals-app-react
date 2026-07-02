import { useQuery } from "@tanstack/react-query"
import { getGoalProjection } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"

export const useGoalProjection = (id: string, enabled = true) => {
  const goalProjection = useQuery({
    queryKey: queryKeys.goals.projection(id),
    queryFn: () => getGoalProjection(id),
    enabled: !!id && enabled,
  })

  return { goalProjection }
}
