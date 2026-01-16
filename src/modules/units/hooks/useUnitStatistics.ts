import { useQuery } from "@tanstack/react-query"
import { getUnitStatistics } from "../actions/unitsAction"

export const KEY_UNIT_STATISTICS = "unit-statistics"

type Props = {
  unitId: string
  startUtc: string
  endUtc: string
}

export const useUnitStatistics = ({ unitId, startUtc, endUtc }: Props) => {
  const statistics = useQuery({
    queryKey: [KEY_UNIT_STATISTICS, unitId, startUtc, endUtc],
    queryFn: () => getUnitStatistics(unitId, startUtc, endUtc),
    enabled: !!unitId && !!startUtc && !!endUtc,
  })

  return {
    statistics,
  }
}
