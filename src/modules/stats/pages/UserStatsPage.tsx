import { useUserStats } from "../hooks/useUserStats"
import { useDateRange } from "@/hooks/useDateRange"
import { TabsDateRange } from "@/components/TabsDateRange"
import { UnitStatCard } from "../components/UnitStatCard"
import { Loader2, AlertCircle, BarChart3 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"

export const UserStatsPage = () => {
  const { endUtc, startUtc, setRangeDate, rangeDate } = useDateRange("month")
  const { userStats } = useUserStats({
    startDate: startUtc,
    endDate: endUtc,
    type: rangeDate,
  })

  // Estado de carga
  if (userStats.isLoading) {
    return (
      <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-slate-600">Cargando estadísticas...</p>
          </div>
        </div>
      </div>
    )
  }

  // Estado de error
  if (userStats.isError) {
    return (
      <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se pudieron cargar las estadísticas. Por favor, intenta de nuevo.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const stats = userStats.data?.data.stats || []

  // Filtrar estadísticas que tienen datos
  const statsWithData = stats.filter(
    (stat) => stat.currentPeriod > 0 || stat.lastPeriod > 0
  )

  // Estado vacío
  const isEmpty = statsWithData.length === 0

  return (
    <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="text-indigo-600 w-8 h-8" />
            Estadísticas por Unidad
          </h1>
          <p className="text-slate-500 mt-1">
            Compara tu progreso entre períodos por unidad de medida.
          </p>
        </div>

        <TabsDateRange rangeDate={rangeDate} setRangeDate={setRangeDate} />
      </div>

      {/* Estado vacío */}
      {isEmpty && (
        <Card className="border-slate-100 shadow-sm rounded-2xl bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChart3 className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No hay estadísticas disponibles
            </h3>
            <p className="text-slate-500 max-w-md">
              No se encontraron estadísticas para el período seleccionado.
              Intenta seleccionar un rango de fechas diferente.
            </p>
          </div>
        </Card>
      )}

      {/* Grid de tarjetas de estadísticas */}
      {!isEmpty && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsWithData.map((stat) => (
            <UnitStatCard key={stat.unit.id} stat={stat} type={rangeDate} />
          ))}
        </div>
      )}
    </div>
  )
}
