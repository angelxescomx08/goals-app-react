import { BarChartComponent } from "@/components/charts/BarChart"

type Props = {
  data: Array<{ goalId: string; goalTitle: string; totalProgress: number }>
}

export const ProgressByGoalChart = ({ data }: Props) => {
  // Transformar datos para el componente de gráfica
  const chartData = data.map((item) => ({
    label: item.goalTitle,
    value: item.totalProgress,
  }))

  return (
    <BarChartComponent
      title="Progreso por meta"
      data={chartData}
      config={{
        xKey: "label",
        yKey: "value",
        fillColor: "#8b5cf6",
        showGrid: true,
        showTooltip: true,
      }}
    />
  )
}
