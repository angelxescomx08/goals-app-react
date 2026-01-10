import { useQuery } from "@tanstack/react-query"
import { KEY_GOALS } from "./useInfiniteGoalsByUser"
import { getGoalStatistics } from "../actions/goalsActions"

export const useGoalStatistics = (id: string) => {

  const goalStatistics = useQuery({
    queryKey: [KEY_GOALS, {
      id,
      statistics: true
    }],
    queryFn: () => getGoalStatistics(id),
  })

  return {
    goalStatistics,
  }
}
