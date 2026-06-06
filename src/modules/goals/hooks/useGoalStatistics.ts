import { useQuery } from "@tanstack/react-query"
import { getGoalStatistics } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"

export const useGoalStatistics = (id: string) => {
  const goalStatistics = useQuery({
    queryKey: queryKeys.goals.detailStatistics(id),
    queryFn: () => getGoalStatistics(id),
    enabled: !!id,
  })

  return { goalStatistics }
}
