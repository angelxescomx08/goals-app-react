import { useQuery } from "@tanstack/react-query"
import { getGoalsWithTypeGoal } from "../actions/goalsActions"
import { authClient } from "@/lib/auth"

export const KEY_GOALS_WITH_TYPE_GOAL = "goalsWithTypeGoal"

export const useGoalsWithTypeGoal = () => {

  const session = authClient.useSession()

  const goals = useQuery({
    queryKey: [KEY_GOALS_WITH_TYPE_GOAL, {
      userId: session.data?.user?.id,
    }],
    queryFn: () => getGoalsWithTypeGoal(),
  })

  return {
    goals,
  }
}
