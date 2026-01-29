import { useUserStats } from "../hooks/useUserStats"
import { useDateRange } from "@/hooks/useDateRange"
import { TabsDateRange } from "@/components/TabsDateRange"
import { Loader2, AlertCircle, BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartComponent } from "@/components/charts/PieChart"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

export const StatsDescriptivePage = () => {
  const { endUtc, startUtc, setRangeDate, rangeDate } = useDateRange("year")
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

  // Filtrar estadísticas que tienen datos en el período actual
  const statsWithData = stats.filter((stat) => stat.currentPeriod > 0)

  // Estado vacío
  const isEmpty = statsWithData.length === 0

  // Preparar datos para gráfica de pastel (distribución por unidad)
  const pieChartData = statsWithData.map((stat) => ({
    name: stat.unit.name,
    value: stat.currentPeriod,
  }))

  // Preparar datos para gráfica de barras (comparación de períodos)
  const comparisonData = stats
    .filter((stat) => stat.currentPeriod > 0 || stat.lastPeriod > 0)
    .map((stat) => ({
      label: stat.unit.name,
      actual: stat.currentPeriod,
      anterior: stat.lastPeriod,
    }))

  // Obtener la unidad con mayor progreso
  const topUnit = statsWithData.reduce(
    (max, stat) =>
      stat.currentPeriod > max.currentPeriod ? stat : max,
    statsWithData[0] || { currentPeriod: 0, unit: { name: "", pluralName: "", completedWord: "" } }
  )

  // Obtener unidades con mejor rendimiento (comparación)
  const improvedUnits = stats.filter(
    (stat) => stat.percentage > 0 && stat.currentPeriod > 0
  )

  return (
    <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="text-indigo-600 w-8 h-8" />
            Resumen del Período
          </h1>
          <p className="text-slate-500 mt-1">
            Un vistazo a todo lo que has logrado en este período.
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

      {!isEmpty && (
        <>
          {/* Sección de Resumen Textual */}
          <div className="space-y-6">
            <Card className="border-slate-100 shadow-sm rounded-2xl bg-linear-to-br from-indigo-50 to-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Tu Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Estadísticas principales en formato de texto */}
                <div className="space-y-3">
                  {statsWithData.map((stat) => {
                    const unitText =
                      stat.currentPeriod === 1
                        ? stat.unit.name
                        : stat.unit.pluralName
                    const completedText = stat.unit.completedWord

                    return (
                      <div
                        key={stat.unit.id}
                        className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
                      >
                        <p className="text-lg text-slate-800">
                          <span className="font-semibold text-indigo-600">
                            Has {completedText}
                          </span>{" "}
                          <span className="font-bold text-slate-900 text-xl">
                            {stat.currentPeriod.toLocaleString()}
                          </span>{" "}
                          <span className="text-slate-600">{unitText}</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Unidad destacada */}
            {topUnit.currentPeriod > 0 && (
              <Card className="border-slate-100 shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Unidad Destacada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <p className="text-lg text-emerald-900 mb-2">
                      <span className="font-semibold">
                        {topUnit.unit.name}
                      </span>{" "}
                      es tu unidad más activa
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">
                      {topUnit.currentPeriod.toLocaleString()}{" "}
                      {topUnit.currentPeriod === 1
                        ? topUnit.unit.completedWord
                        : topUnit.unit.pluralName}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Unidades con mejor rendimiento */}
            {improvedUnits.length > 0 && rangeDate !== "all" && (
              <Card className="border-slate-100 shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Mejoras del Período
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {improvedUnits.map((stat) => (
                      <div
                        key={stat.unit.id}
                        className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-emerald-900">
                            {stat.unit.name}
                          </p>
                          <p className="text-sm text-emerald-700">
                            {stat.currentPeriod} vs {stat.lastPeriod} del
                            período anterior
                          </p>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-700">
                            +{Math.abs(stat.percentage).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Gráficas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfica de pastel - Distribución por unidad */}
            {pieChartData.length > 0 && (
              <PieChartComponent
                title="Distribución por Unidad"
                data={pieChartData}
                config={{
                  outerRadius: 100,
                  showLegend: true,
                  colors: [
                    "#6366f1",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                    "#ec4899",
                  ],
                  isPercentage: false,
                }}
              />
            )}

            {/* Gráfica de barras - Comparación de períodos */}
            {comparisonData.length > 0 && rangeDate !== "all" && (
              <Card className="border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-0 pt-6 px-6">
                  <CardTitle className="text-lg font-bold text-slate-800 tracking-tight">
                    Comparación de Períodos
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Compara tu progreso actual con el período anterior.
                  </p>
                </CardHeader>
                <CardContent className="h-[320px] p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={comparisonData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold">
                                <p className="opacity-70 mb-2">{label}</p>
                                {payload.map((entry, index) => (
                                  <p
                                    key={index}
                                    className="text-sm font-bold"
                                    style={{ color: entry.color }}
                                  >
                                    {entry.name}: {entry.value?.toLocaleString()}
                                  </p>
                                ))}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ paddingTop: "10px" }}
                      />
                      <Bar
                        dataKey="actual"
                        name="Período Actual"
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="anterior"
                        name="Período Anterior"
                        fill="#94a3b8"
                        radius={[8, 8, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resumen de comparación si no es "all" */}
          {rangeDate !== "all" && comparisonData.length > 0 && (
            <Card className="border-slate-100 shadow-sm rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Resumen Comparativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats
                    .filter((stat) => stat.currentPeriod > 0 || stat.lastPeriod > 0)
                    .map((stat) => {
                      const change = stat.currentPeriod - stat.lastPeriod
                      const hasChange = stat.lastPeriod > 0

                      return (
                        <div
                          key={stat.unit.id}
                          className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                        >
                          <p className="text-sm font-medium text-slate-600 mb-2">
                            {stat.unit.name}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-slate-900">
                              {stat.currentPeriod.toLocaleString()}
                            </p>
                            {hasChange && (
                              <div
                                className={cn(
                                  "flex items-center gap-1 text-sm font-semibold",
                                  change > 0
                                    ? "text-emerald-600"
                                    : change < 0
                                    ? "text-red-600"
                                    : "text-slate-600"
                                )}
                              >
                                {change > 0 ? (
                                  <TrendingUp className="w-4 h-4" />
                                ) : change < 0 ? (
                                  <TrendingDown className="w-4 h-4" />
                                ) : (
                                  <Minus className="w-4 h-4" />
                                )}
                                <span>
                                  {change > 0 ? "+" : ""}
                                  {change.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                          {hasChange && (
                            <p className="text-xs text-slate-500 mt-1">
                              Anterior: {stat.lastPeriod.toLocaleString()}
                            </p>
                          )}
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
