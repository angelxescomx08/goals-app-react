import { useStatistics } from "../hooks/useStatistics"
import { PieChartComponent } from "@/components/charts/PieChart"
import { CheckCircle2, Clock, Target } from "lucide-react" 
import { TabsDateRange } from "@/components/TabsDateRange"
import { useDateRange } from "@/hooks/useDateRange"

export const PanelPage = () => {
  const { endDate, startDate, setRangeDate, rangeDate } = useDateRange("all")
  const { statistics } = useStatistics({ endDate, startDate })

  return (
    <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
      
      {/* Cabecera del Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Estadísticas</h1>
          <p className="text-slate-500 mt-1">Monitorea tu progreso y cumplimiento de metas.</p>
        </div>

        <TabsDateRange rangeDate={rangeDate} setRangeDate={setRangeDate} />
      </div>

      {/* Grid de Tarjetas de Estadísticas (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total de Metas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Metas</p>
            <h2 className="text-3xl font-bold text-slate-900">{statistics.data?.data.totalGoals}</h2>
          </div>
        </div>

        {/* Metas Completadas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Completadas</p>
            <h2 className="text-3xl font-bold text-slate-900">{statistics.data?.data.totalCompletedGoals}</h2>
          </div>
        </div>

        {/* Metas Pendientes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-50 rounded-xl">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pendientes</p>
            <h2 className="text-3xl font-bold text-slate-900">{statistics.data?.data.pendingGoals}</h2>
          </div>
        </div>
      </div>

      {/* Sección del Gráfico */}
      <div className="bg-white p-4 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Distribución de Progreso</h3>
          <p className="text-sm text-slate-500">Visualización porcentual de tus objetivos.</p>
        </div>
        
        <div className="w-full">
          <PieChartComponent
            title="Progreso de las metas"
            data={[
              {
                name: "Completadas",
                value: statistics.data?.data.totalCompletedGoals ?? 0,
              },
              {
                name: "Pendientes",
                value: statistics.data?.data.pendingGoals ?? 0,
              },
            ]}
            config={{
              outerRadius: 120,
              showLegend: true,
              colors: ["#10b981", "#6366f1"], // Emerald-500 e Indigo-500
              isPercentage: false,
            }}
          />
        </div>
      </div>
    </div>
  )
}