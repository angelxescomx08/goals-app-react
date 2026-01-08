import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DonutDataItem = {
  name: string
  value: number
}

type DonutConfig = {
  dataKey?: string
  nameKey?: string
  outerRadius?: number
  colors?: string[]
  showLegend?: boolean
  showTooltip?: boolean
  isPercentage?: boolean
}

type Props = {
  title?: string
  data: DonutDataItem[]
  config?: DonutConfig
}

const DEFAULT_COLORS = [
  "#6366f1", // Indigo-500
  "#10b981", // Emerald-500
  "#f59e0b", // Amber-500
  "#ef4444", // Red-500
  "#8b5cf6", // Violet-500
]

export const PieChartComponent = ({ title, data, config }: Props) => {
  const {
    dataKey = "value",
    nameKey = "name",
    outerRadius = 100,
    colors = DEFAULT_COLORS,
    showLegend = true,
    showTooltip = true,
    isPercentage = false,
  } = config || {}

  return (
    <Card className="border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden transition-all hover:shadow-md">
      {title && (
        <CardHeader className="pb-0 pt-6 px-6 text-center md:text-left">
          <CardTitle className="text-lg font-bold text-slate-800 tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="h-[320px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%" // Centrado horizontal
              cy="50%" // Centrado vertical
              innerRadius={0} // <--- CAMBIO CLAVE: 0 para que sea Pie completo
              outerRadius={outerRadius}
              paddingAngle={2} // Un pequeño espacio para que se vea moderno
              cornerRadius={4} // Bordes ligeramente redondeados
              stroke="#fff"    // Línea blanca divisoria para limpieza visual
              strokeWidth={2}
              className="outline-none"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                  className="transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                />
              ))}
            </Pie>

            {showTooltip && (
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: payload[0].payload.fill }} 
                          />
                          <span className="opacity-70">{payload[0].name}</span>
                        </div>
                        <p className="text-sm font-bold ml-4">
                          {isPercentage ? `${payload[0].value}%` : payload[0].value}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            )}

            {showLegend && (
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-[13px] font-semibold text-slate-600 px-2">
                    {value}
                  </span>
                )}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}