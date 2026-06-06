import { useQuery } from "@tanstack/react-query"
import { getGoalsWithTypeGoal } from "../actions/goalsActions"
import { authClient } from "@/lib/auth"
import { queryKeys } from "@/lib/queryKeys"

export const useGoalsWithTypeGoal = () => {
  const session = authClient.useSession()

  const goals = useQuery({
    queryKey: queryKeys.goals.withType(session.data?.user?.id),
    queryFn: () => getGoalsWithTypeGoal(),
  })

  return { goals }
}
