// hooks/use-media-query.ts
import { useSyncExternalStore } from "react"

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    // 1. Suscripción: Cómo escuchar cambios
    (callback) => {
      const result = window.matchMedia(query)
      result.addEventListener("change", callback)
      return () => result.removeEventListener("change", callback)
    },
    // 2. Snapshot: Cómo obtener el valor actual
    () => window.matchMedia(query).matches,
    // 3. Server Snapshot: Valor por defecto para el servidor
    () => false
  )
}