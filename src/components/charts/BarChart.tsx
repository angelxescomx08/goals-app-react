import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type BarChartDataItem = {
  [key: string]: string | number
}

type BarChartConfig = {
  xKey?: string
  yKey?: string
  fillColor?: string
  showGrid?: boolean
  showTooltip?: boolean
  isPercentage?: boolean
}

type Props = {
  title?: string
  data: BarChartDataItem[]
  config?: BarChartConfig
}

export const BarChartComponent = ({ title, data, config }: Props) => {
  const {
    xKey = "label",
    yKey = "value",
    fillColor = "#6366f1", // Indigo-500
    showGrid = true,
    showTooltip = true,
    isPercentage = false,
  } = config || {}

  return (
    <Card className="border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden transition-all hover:shadow-md">
      {title && (
        <CardHeader className="pb-0 pt-6 px-6">
          <CardTitle className="text-lg font-bold text-slate-800 tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="h-[320px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
            )}

            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                isPercentage ? `${value}%` : value.toString()
              }
            />

            {showTooltip && (
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold">
                        <p className="opacity-70 mb-1">{label}</p>
                        <p className="text-sm font-bold">
                          {isPercentage
                            ? `${payload[0].value}%`
                            : payload[0].value}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            )}

            <Bar
              dataKey={yKey}
              fill={fillColor}
              radius={[8, 8, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
