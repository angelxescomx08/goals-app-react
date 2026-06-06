import { useQuery } from "@tanstack/react-query"
import { getUserStats, type GetUserStatsParams } from "../actions/userStatsActions"
import { queryKeys } from "@/lib/queryKeys"

type Props = GetUserStatsParams

export const useUserStats = (params: Props) => {
  const userStats = useQuery({
    queryKey: queryKeys.userStats.byParams(params),
    queryFn: () => getUserStats(params),
  })

  return { userStats }
}
