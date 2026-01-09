import { authClient } from "@/lib/auth"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getGoalsByUser } from "../actions/goalsActions"

export const KEY_GOALS = "goals"

export const useInfiniteGoalsByUser = (
  { endDate, startDate }: { endDate: string, startDate: string }
) => {

  const session = authClient.useSession()

  const goals = useInfiniteQuery({
    queryKey: [KEY_GOALS, {
      userId: session.data?.user?.id,
      endDate,
      startDate,
    }],
    queryFn: ({ pageParam = 1 }) => getGoalsByUser(pageParam, 10, endDate, startDate),
    getNextPageParam: (lastPage) => lastPage.data.hasMore
      ? lastPage.data.page + 1
      : undefined,
    initialPageParam: 1,
  })

  return {
    goals
  }
}
