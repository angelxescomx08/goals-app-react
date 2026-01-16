import { LineChartComponent } from "@/components/charts/LineChartComponent"
import { formatLocalDate } from "@/lib/dateUtils"

type Props = {
  data: Array<{ date: string | Date; value: number }>
}

export const ProgressOverTimeChart = ({ data }: Props) => {
  // Transformar datos para el componente de gráfica
  const chartData = data.map((item) => ({
    label: formatLocalDate(item.date),
    value: item.value,
  }))

  return (
    <LineChartComponent
      title="Progreso en el tiempo"
      data={chartData}
      config={{
        xKey: "label",
        yKey: "value",
        strokeColor: "#6366f1",
        showGrid: true,
        showTooltip: true,
      }}
    />
  )
}
