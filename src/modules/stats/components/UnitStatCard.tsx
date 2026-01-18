import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { type UserStatSchema } from "../schemas/userStatsSchema"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  stat: UserStatSchema
  type: "week" | "month" | "year" | "all"
}

export const UnitStatCard = ({ stat, type }: Props) => {
  const { unit, percentage, currentPeriod, lastPeriod } = stat

  // Determinar si hay datos para mostrar
  const hasData = currentPeriod > 0 || lastPeriod > 0
  
  // Si no hay datos, no renderizar la tarjeta
  if (!hasData) {
    return null
  }

  // Determinar el color y el icono según el porcentaje
  const isAll = type === "all"
  const showComparison = !isAll && lastPeriod > 0

  let percentageColor = "text-slate-600"
  let percentageIcon = <Minus className="w-4 h-4" />
  let percentageBg = "bg-slate-50"

  if (showComparison) {
    if (percentage > 0) {
      percentageColor = "text-emerald-600"
      percentageIcon = <ArrowUp className="w-4 h-4" />
      percentageBg = "bg-emerald-50"
    } else if (percentage < 0) {
      percentageColor = "text-red-600"
      percentageIcon = <ArrowDown className="w-4 h-4" />
      percentageBg = "bg-red-50"
    }
  }

  // Preparar datos para la gráfica de barras comparativa
  const chartData = showComparison
    ? [
        {
          label: "Período Anterior",
          value: lastPeriod,
        },
        {
          label: "Período Actual",
          value: currentPeriod,
        },
      ]
    : [
        {
          label: "Total",
          value: currentPeriod,
        },
      ]

  return (
    <Card className="border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-900 tracking-tight">
              {unit.name}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              {unit.pluralName}
            </p>
          </div>
          
          {showComparison && (
            <div
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold",
                percentageBg,
                percentageColor
              )}
            >
              {percentageIcon}
              <span>{Math.abs(percentage).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-6">
        {/* KPIs */}
        <div className={cn(
          "grid gap-4",
          showComparison ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        )}>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
              {isAll ? "Total Acumulado" : "Período Actual"}
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {currentPeriod.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {unit.completedWord}
            </p>
          </div>

          {showComparison && (
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Período Anterior
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {lastPeriod.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {unit.completedWord}
              </p>
            </div>
          )}
        </div>

        {/* Gráfica de barras comparativa */}
        {showComparison && (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-xl border border-slate-800 text-xs font-semibold">
                          <p className="opacity-70 mb-1">{label}</p>
                          <p className="text-sm font-bold">
                            {payload[0].value?.toLocaleString()}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="value"
                  fill={percentage > 0 ? "#10b981" : percentage < 0 ? "#ef4444" : "#6366f1"}
                  radius={[8, 8, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
