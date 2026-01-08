import { useQuery } from '@tanstack/react-query'
import { getStatistics } from '../actions/goalsActions'
import { authClient } from '@/lib/auth'
import { useMemo } from 'react';
import dayjs from 'dayjs';

export const KEY = "statistics";

type Props = {
  rangeDate: "week" | "month" | "year" | "all"
}

export const useStatistics = ({ rangeDate }: Props) => {

  const { data } = authClient.useSession()

  const [startDate, endDate] = useMemo(() => {
    const createdAt = data?.user.createdAt;
    if (!createdAt) return dayjs().startOf("year").toISOString()
    switch (rangeDate) {
      case "week":
        return [dayjs().subtract(7, "day").toISOString(), dayjs().toISOString()]
      case "month":
        return [dayjs().subtract(1, "month").toISOString(), dayjs().toISOString()]
      case "year":
        return [dayjs().subtract(1, "year").toISOString(), dayjs().toISOString()]
      case "all":
        return [createdAt.toISOString(), dayjs().toISOString()]
    }
  }, [rangeDate, data?.user.createdAt])

  const session = authClient.useSession()

  const statistics = useQuery({
    queryKey: [KEY, { userId: session.data?.user?.id, startDate, endDate }],
    queryFn: () => getStatistics({ startDate, endDate }),
  })

  return {
    statistics,
  }
}
