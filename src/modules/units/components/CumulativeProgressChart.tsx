import { AreaChartComponent } from "@/components/charts/AreaChart"
import { formatLocalDate } from "@/lib/dateUtils"

type Props = {
  data: Array<{ date: string | Date; total: number }>
}

export const CumulativeProgressChart = ({ data }: Props) => {
  // Transformar datos para el componente de gráfica
  const chartData = data.map((item) => ({
    label: formatLocalDate(item.date),
    value: item.total,
  }))

  return (
    <AreaChartComponent
      title="Progreso acumulado"
      data={chartData}
      config={{
        xKey: "label",
        yKey: "value",
        fillColor: "#6366f1",
        strokeColor: "#4f46e5",
        showGrid: true,
        showTooltip: true,
      }}
    />
  )
}
