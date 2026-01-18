import { useQuery } from "@tanstack/react-query"
import { getUserStats, type GetUserStatsParams } from "../actions/userStatsActions"

export const KEY_USER_STATS = "user-stats"

type Props = GetUserStatsParams

export const useUserStats = (params: Props) => {
  const userStats = useQuery({
    queryKey: [KEY_USER_STATS, params],
    queryFn: () => getUserStats(params),
  })

  return {
    userStats,
  }
}
