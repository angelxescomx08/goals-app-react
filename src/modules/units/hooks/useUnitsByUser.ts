import { useQuery } from "@tanstack/react-query"
import { getUnits } from "../actions/unitsAction"
import { authClient } from "@/lib/auth"
import { queryKeys } from "@/lib/queryKeys"

export const useUnitsByUser = () => {
  const session = authClient.useSession()

  const units = useQuery({
    queryKey: queryKeys.units.list(session.data?.user?.id),
    queryFn: getUnits,
  })

  return { units }
}
