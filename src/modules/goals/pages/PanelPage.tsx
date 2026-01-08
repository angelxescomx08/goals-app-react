import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStatistics } from "../hooks/useStatistics"
import { PieChartComponent } from "@/components/charts/PieChart"
import { useState } from "react"

export const PanelPage = () => {
  const [rangeDate, setRangeDate] = useState<"week" | "month" | "year" | "all">("week")
  const { statistics } = useStatistics({ rangeDate })
  return (
    <div>
      <Tabs 
        defaultValue="week" 
        className="w-[400px]" 
        onValueChange={(value) => setRangeDate(value as "week" | "month" | "year" | "all")}>
        <TabsList>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mes</TabsTrigger>
          <TabsTrigger value="year">Año</TabsTrigger>
          <TabsTrigger value="all">Todo</TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <h1>Total de metas: {statistics.data?.data.totalGoals}</h1>
        <h1>Total de metas completadas: {statistics.data?.data.totalCompletedGoals}</h1>
        <h1>Total de metas pendientes: {statistics.data?.data.pendingGoals}</h1>
      </div>

      <PieChartComponent
        title="Progreso de las metas"
        data={[
          {
            name: "Metas completadas",
            value: statistics.data?.data.totalCompletedGoals ?? 0,
          },
          {
            name: "Metas pendientes",
            value: statistics.data?.data.pendingGoals ?? 0,
          },
        ]}
        config={{
          innerRadius: 70,
          outerRadius: 100,
          showLegend: true,
          colors: ["#22c55e", "#3b82f6"],
          isPercentage: false,
        }}
      />
    </div>
  )
}
