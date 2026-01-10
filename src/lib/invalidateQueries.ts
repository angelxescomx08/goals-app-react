import type { QueryClient } from "@tanstack/react-query";

export async function invalidateQueries(queryClient: QueryClient, keys: string[]) {

  await Promise.all([
    keys.map(key => queryClient.invalidateQueries({
      queryKey: [key],
      exact: false,
    }))
  ])

}