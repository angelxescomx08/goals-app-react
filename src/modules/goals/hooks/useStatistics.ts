import { useQuery } from '@tanstack/react-query'
import { getStatistics } from '../actions/goalsActions'

export const KEY_STATISTICS = "statistics";

type Props = {
  endDate: string;
  startDate: string;
}

export const useStatistics = ({ endDate, startDate }: Props) => {

  const statistics = useQuery({
    queryKey: [KEY_STATISTICS, { startDate, endDate }],
    queryFn: () => getStatistics({ startDate, endDate }),
  })

  return {
    statistics,
  }
}
