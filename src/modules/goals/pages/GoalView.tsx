import { Button } from "@/components/ui/button"
import {
  PlusIcon, ChevronLeft, Target, TrendingUp, Info, CheckCircleIcon, Loader2Icon, PencilIcon,
  ArrowUp, GitBranch, ExternalLink, ClipboardList, CalendarClock, Zap, Flame,
} from "lucide-react"
import { useNavigate, useParams, Link } from "react-router"
import { useGoalById } from "../hooks/useGoalById"
import { PieChartComponent } from "@/components/charts/PieChart"
import { useToggleCompletion } from "../hooks/useToggleCompletion"
import { DeleteButton } from "@/components/DeleteButton"
import { useState } from "react"
import { useDeteleGoal } from "../hooks/useDeteleGoal"
import { useGoalStatistics } from "../hooks/useGoalStatistics"
import { LineChartComponent } from "@/components/charts/LineChartComponent"
import { useGoalProjection } from "../hooks/useGoalProjection"
import { useGoalStreak } from "../hooks/useGoalStreak"
import { Skeleton } from "@/components/ui/skeleton"
import dayjs from "dayjs"

const GoalViewSkeleton = () => (
  <div className="max-w-6xl mx-auto space-y-2 lg:space-y-8 min-h-screen bg-slate-50/50 p-0 md:p-6 lg:p-10">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-64" />
      </div>
    </div>

    <div className="flex items-center gap-2 flex-wrap">
      <Skeleton className="h-11 w-44 rounded-xl" />
      <Skeleton className="h-11 w-36 rounded-xl" />
      <Skeleton className="h-11 w-32 rounded-xl" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>

      <div className="lg:col-span-2 gap-4 flex flex-col">
        <Skeleton className="h-[380px] w-full rounded-2xl" />
        <Skeleton className="h-[280px] w-full rounded-2xl" />
      </div>
    </div>
  </div>
)

export const GoalView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { goal } = useGoalById(id ?? "")
  const { toggleCompletionMutation } = useToggleCompletion()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const { deleteGoalMutation } = useDeteleGoal()
  const { goalStatistics } = useGoalStatistics(id ?? "")
  const goalData = goal.data?.data
  const { goalProjection } = useGoalProjection(id ?? "", goalData?.goalType === "target")
  const { goalStreak } = useGoalStreak(id ?? "", goalData?.goalType === "manual")

  const showPieChartProgress = goalData?.goalType === "target" || goalData?.goalType === "goals"
  const showLineChartProgress = goalData?.goalType === "target"

  const progressPercentage =
    goalData?.target != null &&
      goalData?.currentProgress != null &&
      goalData.target > 0
      ? Math.min((goalData.currentProgress / goalData.target) * 100, 100)
      : 0

  const pendingPercentage = Math.max(100 - progressPercentage, 0)

  if (goal.isLoading) return <GoalViewSkeleton />

  return (
    <div className="max-w-6xl mx-auto space-y-2 lg:space-y-8 min-h-screen bg-slate-50/50 p-0 md:p-6 lg:p-10">
      {/* Navegación y Acciones Superiores */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            to="/panel/goals"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium group mb-2"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a metas
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            {goalData?.title || "Detalle de Meta"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {
          goal.data?.data.goalType === "manual" && (
            goal.data?.data.completedAt ? (
              <Button
                disabled={toggleCompletionMutation.isPending}
                onClick={() => toggleCompletionMutation.mutate(id ?? "")}
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95">
                {
                  toggleCompletionMutation.isPending ? (
                    <>
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      <span>Desmarcando como completada...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      <span>Desmarcar como completada</span>
                    </>
                  )
                }
              </Button>
            ) : (
              <Button

                disabled={toggleCompletionMutation.isPending}
                onClick={() => toggleCompletionMutation.mutate(id ?? "")} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95">
                {
                  toggleCompletionMutation.isPending ? (
                    <>
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      <span>Marcando como completada...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      <span>Marcar como completada</span>
                    </>
                  )
                }
              </Button>
            )
          )
        }
        <Button
          onClick={() => navigate(`/panel/goals/progress/${id}/create`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Registrar progreso
        </Button>

        <DeleteButton 
          title="Eliminar meta" 
          description="¿Estás seguro de querer eliminar esta meta?" 
          open={openDeleteModal} 
          onOpenChange={setOpenDeleteModal} 
          onDelete={async() => {
            await deleteGoalMutation.mutateAsync(id ?? "")
            setOpenDeleteModal(false)
            navigate("/panel/goals")
          }}
          isLoading={deleteGoalMutation.isPending}
        />
        
        <Button onClick={() => navigate(`/panel/goals/edit/${id}`)} variant="outline" className="bg-slate-600 hover:bg-slate-700 text-white hover:text-white shadow-lg shadow-slate-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95">
          <PencilIcon className="w-5 h-5 mr-2" />
          Editar meta
        </Button>

        <Button onClick={() => navigate(`/panel/goals/progress/${id}`)} variant="outline" className="h-11 px-6 rounded-xl font-bold transition-all active:scale-95">
          <ClipboardList className="w-5 h-5 mr-2" />
          Ver historial
        </Button>
      </div>

      {/* Layout Principal: Info + Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna Izquierda: Detalles e Información */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" /> Descripción
            </h3>
            <p className="text-slate-600 leading-relaxed italic">
              {goalData?.description || "Esta meta no tiene una descripción detallada."}
            </p>
          </div>

          {/* Relaciones de Meta: Padre e Hijas */}
          {(goalData?.parentGoal || (goalData?.children && goalData.children.length > 0)) && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <GitBranch className="w-4 h-4" /> Relaciones
              </h3>

              {/* Meta Padre */}
              {goalData?.parentGoal && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <ArrowUp className="w-3.5 h-3.5" />
                    Meta Padre
                  </div>
                  <Link
                    to={`/panel/goals/${goalData.parentGoal.id}`}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-all duration-200"
                  >
                    <div className="p-2 bg-white group-hover:bg-indigo-100 rounded-lg transition-colors">
                      <Target className="w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 group-hover:text-indigo-900 truncate transition-colors">
                        {goalData.parentGoal.title}
                      </p>
                      {goalData.parentGoal.description && (
                        <p className="text-xs text-slate-500 group-hover:text-indigo-600 line-clamp-1 transition-colors">
                          {goalData.parentGoal.description}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                  </Link>
                </div>
              )}

              {/* Metas Hijas */}
              {goalData?.children && goalData.children.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <GitBranch className="w-3.5 h-3.5" />
                    Submetas ({goalData.children.length})
                  </div>
                  <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {goalData.children.map((childGoal) => (
                      <Link
                        key={childGoal.id}
                        to={`/panel/goals/${childGoal.id}`}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-all duration-200"
                      >
                        <div className="p-2 bg-white group-hover:bg-emerald-100 rounded-lg transition-colors">
                          <Target className="w-4 h-4 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 group-hover:text-emerald-900 truncate transition-colors">
                            {childGoal.title}
                          </p>
                          {childGoal.description && (
                            <p className="text-xs text-slate-500 group-hover:text-emerald-600 line-clamp-1 transition-colors">
                              {childGoal.description}
                            </p>
                          )}
                          {childGoal.completedAt && (
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                              Completada
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {goalData?.goalType !== "manual" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Estado actual</p>
                <p className="text-2xl font-bold text-slate-900">
                  {goalData?.currentProgress || 0} / {goalData?.target || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
                <TrendingUp className="text-emerald-600 w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Gráfico de Progreso + Proyección */}
        <div className="lg:col-span-2 gap-4 flex flex-col">
          {showPieChartProgress ? (
            <PieChartComponent
              title="Visualización de avance"
              data={[
                {
                  name: "Progreso actual",
                  value: progressPercentage,
                },
                {
                  name: "Progreso pendiente",
                  value: pendingPercentage,
                },
              ]}
              config={{
                outerRadius: 110,
                showLegend: true,
                colors: ["#10b981", "#e2e8f0"], // Emerald para progreso, Slate suave para el resto
                isPercentage: true,
              }}
            />
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-white border-slate-200 rounded-2xl shadow-md p-10 text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <BarChart className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Vista de meta manual</h3>
              <p className="text-slate-500 max-w-[300px]">
                Esta meta es de tipo manual y no requiere visualización de objetivo numérico.
              </p>
            </div>
          )}

          {
            showLineChartProgress && (
              <LineChartComponent
                title="Progreso diario"
                data={
                  goalStatistics.data?.data.historicalData.map((item) => ({
                    label: item.date,
                    value: item.progress,
                  })) ?? []
                }
              />
            )
          }

          {/* Proyección */}
          {goalData?.goalType === "target" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <CalendarClock className="w-4 h-4" /> Proyección
              </h3>

              {goalProjection.isLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2Icon className="w-6 h-6 animate-spin text-indigo-400" />
                </div>
              ) : goalProjection.isError ? (
                <p className="text-sm text-slate-400 text-center py-4">No se pudo cargar la proyección.</p>
              ) : goalProjection.data ? (() => {
                const p = goalProjection.data.data
                const { daysLeft, estimatedDate } = p.projection
                return (
                  <div className="space-y-5">
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Objetivo", value: p.target },
                        { label: "Progreso", value: p.currentProgress },
                        { label: "Restante", value: p.remaining },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-xl px-4 py-3 text-center">
                          <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
                          <p className="text-xl font-bold text-slate-900">{value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tasas de avance */}
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> Ritmo de avance
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Semanal", value: p.averages.weekly },
                          { label: "Mensual", value: p.averages.monthly },
                          { label: "Anual", value: p.averages.yearly },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                            <span className="text-sm text-slate-500">{label}</span>
                            <span className="text-sm font-bold text-slate-800">{value.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fecha estimada */}
                    <div className="bg-indigo-50 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Fecha estimada</p>
                        <p className="text-lg font-bold text-indigo-900">
                          {estimatedDate
                            ? dayjs(estimatedDate).format("DD MMM YYYY")
                            : "Sin datos suficientes"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Días restantes</p>
                        <p className="text-lg font-bold text-indigo-900">
                          {daysLeft === null ? "—" : daysLeft === 0 ? "Completado" : `${daysLeft} días`}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })() : null}
            </div>
          )}

          {/* Racha de actividad (metas manuales) */}
          {goalData?.goalType === "manual" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <Flame className="w-4 h-4" /> Racha de actividad
              </h3>

              {goalStreak.isLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2Icon className="w-6 h-6 animate-spin text-indigo-400" />
                </div>
              ) : goalStreak.isError ? (
                <p className="text-sm text-slate-400 text-center py-4">No se pudo cargar la racha.</p>
              ) : goalStreak.data ? (() => {
                const s = goalStreak.data.data
                const activity = s.dailyActivity

                const filledActivity = (() => {
                  if (activity.length === 0) return []
                  const activityByDate = new Map(activity.map((a) => [a.date, a.count]))
                  const start = dayjs(activity[0].date)
                  const totalDaysInRange = dayjs(activity[activity.length - 1].date).diff(start, "day") + 1
                  return Array.from({ length: totalDaysInRange }, (_, i) => {
                    const date = start.add(i, "day").format("YYYY-MM-DD")
                    return {
                      label: dayjs(date).format("DD MMM"),
                      value: activityByDate.get(date) ?? 0,
                    }
                  })
                })()

                return (
                  <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Días totales", value: s.totalDays },
                        { label: "Racha máxima", value: s.maxStreak },
                        { label: "Racha promedio", value: s.averageStreak },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-xl px-4 py-3 text-center">
                          <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
                          <p className="text-xl font-bold text-slate-900">{value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <LineChartComponent
                      title="Actividad diaria"
                      data={filledActivity}
                      config={{ strokeColor: "#f97316" }}
                    />
                  </div>
                )
              })() : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Icono extra para el estado sin gráfico
const BarChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)