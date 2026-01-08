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
  innerRadius?: number
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
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "#22c55e",
  "#ef4444",
]

export const PieChartComponent = ({ title, data, config }: Props) => {
  const {
    dataKey = "value",
    nameKey = "name",
    outerRadius = 90,
    colors = DEFAULT_COLORS,
    showLegend = true,
    showTooltip = true,
    isPercentage = false,
  } = config || {}

  // Sin separación para evitar huecos
  const paddingAngle = 0

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            {showTooltip && (
              <Tooltip
                formatter={(value: number) =>
                  isPercentage ? `${value.toFixed(0)}%` : value
                }
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            )}

            {showLegend && (
              <Legend
                formatter={(value) => (
                  <span className="text-foreground">
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
