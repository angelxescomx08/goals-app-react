import { useQuery } from '@tanstack/react-query'
import { getGoalById } from '../actions/goalsActions'
import { KEY_GOALS } from '@/modules/goals/hooks/useInfiniteGoalsByUser'

export const useGoalById = (id: string) => {

  const goal = useQuery({
    queryKey: [KEY_GOALS, { id }],
    queryFn: () => getGoalById(id),
  })

  return {
    goal,
  }
}
