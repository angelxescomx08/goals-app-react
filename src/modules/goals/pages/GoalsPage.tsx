import { useInfiniteGoalsByUser } from "../hooks/useInfiniteGoalsByUser"
import { Link } from "react-router"
import { Plus, Target, LayoutGrid } from "lucide-react"
import { InfiniteList } from "@/components/InfiniteList"
import { GoalCard } from "../components/GoalCard"
import { TabsDateRange } from "@/components/TabsDateRange"
import { useDateRange } from "@/hooks/useDateRange"

export const GoalsPage = () => {
  const { endDate, startDate, setRangeDate } = useDateRange()
  const { goals } = useInfiniteGoalsByUser({ endDate, startDate })

  return (
    <div className="space-y-8 p-0 md:p-6 lg:p-10 max-w-7xl mx-auto">
      
      {/* Encabezado con Acción Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Target className="text-indigo-600 w-8 h-8" />
            Mis Metas
          </h1>
          <p className="text-slate-500 mt-1">Gestiona y haz seguimiento de tus objetivos personales.</p>
        </div>

        <Link 
          to="/panel/goals/create" 
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 text-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Crear nueva meta</span>
        </Link>
      </div>

      <div className="w-80">
        <TabsDateRange setRangeDate={setRangeDate} />
      </div>

      {/* Contenedor de la Lista Infinita */}
      <div className="relative">
        <InfiniteList
          isLoading={goals.isFetching}
          // PASAMOS LAS CLASES DEL GRID AQUÍ
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          
          alertNoItems={
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed border-slate-200 rounded-3xl text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <LayoutGrid className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No tienes metas aún</h3>
              <p className="text-slate-500 max-w-[280px] mt-2 mb-6">
                Comienza a organizar tu futuro creando tu primera meta hoy mismo.
              </p>
              <Link 
                to="/panel/goals/create" 
                className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1"
              >
                Crear mi primera meta <Plus className="w-4 h-4" />
              </Link>
            </div>
          }

          items={goals.data?.pages.flatMap(page => page.data.data) ?? []}
          
          // AHORA RENDERITEM SOLO DEVUELVE LA CARD
          renderItem={goal => (
            <GoalCard key={goal.id} goal={goal} />
          )}

          // SKELETON
          skeleton={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-50 rounded animate-pulse" />
                    <div className="h-3 w-5/6 bg-slate-50 rounded animate-pulse" />
                  </div>
                  <div className="h-8 w-full bg-slate-100 rounded-xl animate-pulse mt-4" />
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  )
}