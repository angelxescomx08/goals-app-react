import { useQuery } from "@tanstack/react-query"
import { getUnitStatistics } from "../actions/unitsAction"
import { queryKeys } from "@/lib/queryKeys"

type Props = {
  unitId: string
  startUtc: string
  endUtc: string
}

export const useUnitStatistics = ({ unitId, startUtc, endUtc }: Props) => {
  const statistics = useQuery({
    queryKey: queryKeys.units.statistics(unitId, startUtc, endUtc),
    queryFn: () => getUnitStatistics(unitId, startUtc, endUtc),
    enabled: !!unitId && !!startUtc && !!endUtc,
  })

  return { statistics }
}
