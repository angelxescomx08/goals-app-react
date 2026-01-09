import { useQuery } from '@tanstack/react-query'
import { getUnits } from '../actions/unitsAction'
import { authClient } from '@/lib/auth'

export const KEY_UNITS = "units"

export const useUnitsByUser = () => {

  const session = authClient.useSession()

  const units = useQuery({
    queryKey: [KEY_UNITS, {
      userId: session.data?.user?.id
    }],
    queryFn: getUnits,
  })

  return {
    units,
  }
}
