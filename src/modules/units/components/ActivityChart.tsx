import { BarChartComponent } from "@/components/charts/BarChart"
import { formatLocalDate } from "@/lib/dateUtils"

type Props = {
  data: Array<{ date: string | Date; count: number }>
}

export const ActivityChart = ({ data }: Props) => {
  // Transformar datos para el componente de gráfica
  const chartData = data.map((item) => ({
    label: formatLocalDate(item.date),
    value: item.count,
  }))

  return (
    <BarChartComponent
      title="Actividad"
      data={chartData}
      config={{
        xKey: "label",
        yKey: "value",
        fillColor: "#10b981",
        showGrid: true,
        showTooltip: true,
      }}
    />
  )
}
