import { useStatistics } from "../hooks/useStatistics"
import { PieChartComponent } from "@/components/charts/PieChart"
import { CheckCircle2, Clock, Target, BarChart3, Loader2, AlertCircle } from "lucide-react" 
import { TabsDateRange } from "@/components/TabsDateRange"
import { useDateRange } from "@/hooks/useDateRange"
import { useUserStats } from "@/modules/stats/hooks/useUserStats"
import { UnitStatCard } from "@/modules/stats/components/UnitStatCard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"

export const PanelPage = () => {
  const { endUtc, startUtc, setRangeDate, rangeDate } = useDateRange("all")
  const { statistics } = useStatistics({ endDate: endUtc, startDate: startUtc })
  const { userStats } = useUserStats({
    startDate: startUtc,
    endDate: endUtc,
    type: rangeDate,
  })

  // Filtrar estadísticas que tienen datos
  const stats = userStats.data?.data.stats || []
  const statsWithData = stats.filter(
    (stat) => stat.currentPeriod > 0 || stat.lastPeriod > 0
  )
  const isEmptyStats = statsWithData.length === 0

  return (
    <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
      
      {/* Cabecera del Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Estadísticas</h1>
          <p className="text-slate-500 mt-1">Monitorea tu progreso y cumplimiento de metas.</p>
        </div>

        <TabsDateRange rangeDate={rangeDate} setRangeDate={setRangeDate} />
      </div>

      {/* Grid de Tarjetas de Estadísticas (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Metas Completadas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Completadas</p>
            <h2 className="text-3xl font-bold text-slate-900">{statistics.data?.data.totalCompletedGoals}</h2>
          </div>
        </div>

        {/* Metas Pendientes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-50 rounded-xl">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pendientes</p>
            <h2 className="text-3xl font-bold text-slate-900">{statistics.data?.data.pendingGoals}</h2>
          </div>
        </div>

        {/* Total de Metas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Metas</p>
            <h2 className="text-3xl font-bold text-slate-900">{statistics.data?.data.totalGoals}</h2>
          </div>
        </div>
      </div>

      {/* Sección del Gráfico */}
      <div className="bg-white p-4 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Distribución de Progreso</h3>
          <p className="text-sm text-slate-500">Visualización porcentual de tus objetivos.</p>
        </div>
        
        <div className="w-full">
          <PieChartComponent
            title="Progreso de las metas"
            data={[
              {
                name: "Completadas",
                value: statistics.data?.data.totalCompletedGoals ?? 0,
              },
              {
                name: "Pendientes",
                value: statistics.data?.data.pendingGoals ?? 0,
              },
            ]}
            config={{
              outerRadius: 120,
              showLegend: true,
              colors: ["#10b981", "#6366f1"], // Emerald-500 e Indigo-500
              isPercentage: false,
            }}
          />
        </div>
      </div>

      {/* Sección de Estadísticas por Unidad */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="text-indigo-600 w-7 h-7" />
            Estadísticas por Unidad
          </h2>
          <p className="text-slate-500 mt-1">
            Compara tu progreso entre períodos por unidad de medida.
          </p>
        </div>

        {/* Estados de carga y error para userStats */}
        {userStats.isLoading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-slate-600">Cargando estadísticas por unidad...</p>
            </div>
          </div>
        )}

        {userStats.isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              No se pudieron cargar las estadísticas por unidad. Por favor, intenta de nuevo.
            </AlertDescription>
          </Alert>
        )}

        {/* Estado vacío */}
        {!userStats.isLoading && !userStats.isError && isEmptyStats && (
          <Card className="border-slate-100 shadow-sm rounded-2xl bg-white p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <BarChart3 className="w-16 h-16 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                No hay estadísticas por unidad disponibles
              </h3>
              <p className="text-slate-500 max-w-md">
                No se encontraron estadísticas para el período seleccionado.
                Intenta seleccionar un rango de fechas diferente.
              </p>
            </div>
          </Card>
        )}

        {/* Grid de tarjetas de estadísticas por unidad */}
        {!userStats.isLoading && !userStats.isError && !isEmptyStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsWithData.map((stat) => (
              <UnitStatCard key={stat.unit.id} stat={stat} type={rangeDate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}