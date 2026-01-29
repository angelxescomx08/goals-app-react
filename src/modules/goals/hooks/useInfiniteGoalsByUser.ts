import { authClient } from "@/lib/auth"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getGoalsByUser, type GoalsByUserFilters } from "../actions/goalsActions"

export const KEY_GOALS = "goals"

export type UseInfiniteGoalsByUserFilters = Pick<
  GoalsByUserFilters,
  "startDate" | "endDate" | "search" | "completed" | "goalType" | "excludeChildGoals"
>

export const useInfiniteGoalsByUser = (filters: UseInfiniteGoalsByUserFilters) => {
  const session = authClient.useSession()
  const { startDate, endDate, search, completed, goalType, excludeChildGoals } = filters

  const goals = useInfiniteQuery({
    queryKey: [
      KEY_GOALS,
      {
        userId: session.data?.user?.id,
        startDate,
        endDate,
        search: search ?? "",
        completed,
        goalType: goalType ?? "",
        excludeChildGoals: !!excludeChildGoals,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getGoalsByUser({
        startDate,
        endDate,
        page: pageParam as number,
        limit: 10,
        ...(search != null && search.trim() !== "" && { search: search.trim() }),
        ...(completed !== undefined && { completed }),
        ...(goalType != null && { goalType }),
        ...(excludeChildGoals === true && { excludeChildGoals: true }),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  })

  return { goals }
}
