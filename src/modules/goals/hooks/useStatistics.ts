import { useQuery } from "@tanstack/react-query"
import { getStatistics } from "../actions/goalsActions"
import { queryKeys } from "@/lib/queryKeys"

type Props = {
  endDate: string
  startDate: string
}

export const useStatistics = ({ endDate, startDate }: Props) => {
  const statistics = useQuery({
    queryKey: queryKeys.statistics.range(startDate, endDate),
    queryFn: () => getStatistics({ startDate, endDate }),
  })

  return { statistics }
}
