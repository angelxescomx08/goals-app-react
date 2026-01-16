import { useParams } from "react-router"
import { useUnitStatistics } from "../hooks/useUnitStatistics"
import { ProgressOverTimeChart } from "../components/ProgressOverTimeChart"
import { CumulativeProgressChart } from "../components/CumulativeProgressChart"
import { ActivityChart } from "../components/ActivityChart"
import { ProgressByGoalChart } from "../components/ProgressByGoalChart"
import { useUnitsByUser } from "../hooks/useUnitsByUser"
import { BarChart3, Loader2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useDateRange } from "@/hooks/useDateRange"
import { TabsDateRange } from "@/components/TabsDateRange"

export const UnitStatisticsPage = () => {
  const { unitId } = useParams<{ unitId: string }>()
  const { units } = useUnitsByUser()

  // Usar el hook useDateRange para manejar fechas
  const { startUtc, endUtc, rangeDate, setRangeDate } = useDateRange("month")

  // Obtener estadísticas
  const { statistics } = useUnitStatistics({
    unitId: unitId || "",
    startUtc,
    endUtc,
  })

  // Obtener información de la unidad
  const unit = units.data?.data.units.find((u) => u.id === unitId)

  // Estados de carga y error
  if (!unitId) {
    return (
      <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se proporcionó un ID de unidad válido.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (statistics.isLoading || units.isLoading) {
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

  if (statistics.isError) {
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

  const statisticsData = statistics.data?.data

  // Verificar si hay datos
  const hasData =
    statisticsData &&
    (statisticsData.charts.progressOverTime.length > 0 ||
      statisticsData.charts.cumulativeProgress.length > 0 ||
      statisticsData.charts.activityCount.length > 0 ||
      statisticsData.charts.progressByGoal.length > 0)

  return (
    <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="text-indigo-600 w-8 h-8" />
            Estadísticas de {unit?.name || "Unidad"}
          </h1>
          <p className="text-slate-500 mt-1">
            Visualiza el progreso y actividad de esta unidad de medida.
          </p>
        </div>

        <TabsDateRange rangeDate={rangeDate} setRangeDate={setRangeDate} />
      </div>

      {/* Estado vacío */}
      {!hasData && (
        <Card className="border-slate-100 shadow-sm rounded-2xl bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChart3 className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No hay datos disponibles
            </h3>
            <p className="text-slate-500">
              No se encontraron estadísticas para el rango de fechas seleccionado.
            </p>
          </div>
        </Card>
      )}

      {/* Dashboard de gráficas */}
      {hasData && (
        <div className="space-y-6">
          {/* Primera fila: Progreso en el tiempo y Progreso acumulado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {statisticsData.charts.progressOverTime.length > 0 && (
              <ProgressOverTimeChart
                data={statisticsData.charts.progressOverTime}
              />
            )}
            {statisticsData.charts.cumulativeProgress.length > 0 && (
              <CumulativeProgressChart
                data={statisticsData.charts.cumulativeProgress}
              />
            )}
          </div>

          {/* Segunda fila: Actividad y Progreso por meta */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {statisticsData.charts.activityCount.length > 0 && (
              <ActivityChart data={statisticsData.charts.activityCount} />
            )}
            {statisticsData.charts.progressByGoal.length > 0 && (
              <ProgressByGoalChart
                data={statisticsData.charts.progressByGoal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
