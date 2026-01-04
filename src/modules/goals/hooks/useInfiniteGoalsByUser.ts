import { authClient } from "@/lib/auth"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getGoalsByUser } from "../actions/goalsActions"

export const KEY = "goals"

export const useInfiniteGoalsByUser = () => {

  const session = authClient.useSession()

  const goals = useInfiniteQuery({
    queryKey: [KEY, {
      userId: session.data?.user?.id
    }],
    queryFn: ({ pageParam = 1 }) => getGoalsByUser(pageParam, 10),
    getNextPageParam: (lastPage) => lastPage.data.hasMore
      ? lastPage.data.page + 1
      : undefined,
    initialPageParam: 1,
  })

  return {
    goals
  }
}
