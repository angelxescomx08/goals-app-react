import { useInfiniteGoalsByUser, type UseInfiniteGoalsByUserFilters } from "../hooks/useInfiniteGoalsByUser"
import { Link } from "react-router"
import { Plus, Target, LayoutGrid, Search, GitBranch, CheckCircle2, Circle } from "lucide-react"
import { InfiniteList } from "@/components/InfiniteList"
import { GoalCard } from "../components/GoalCard"
import { TabsDateRange } from "@/components/TabsDateRange"
import { useDateRange } from "@/hooks/useDateRange"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CompletedFilter = "all" | true | false
type GoalTypeFilter = "all" | "target" | "manual" | "goals"

export const GoalsPage = () => {
  const { endUtc, startUtc, setRangeDate, rangeDate } = useDateRange("all")
  const [searchInput, setSearchInput] = useState("")
  const [searchApplied, setSearchApplied] = useState("")
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>("all")
  const [goalTypeFilter, setGoalTypeFilter] = useState<GoalTypeFilter>("all")
  const [excludeChildGoals, setExcludeChildGoals] = useState(false)

  const filters: UseInfiniteGoalsByUserFilters = {
    startDate: startUtc,
    endDate: endUtc,
    ...(searchApplied.trim() !== "" && { search: searchApplied.trim() }),
    ...(completedFilter !== "all" && { completed: completedFilter }),
    ...(goalTypeFilter !== "all" && { goalType: goalTypeFilter }),
    ...(excludeChildGoals && { excludeChildGoals: true }),
  }
  const { goals } = useInfiniteGoalsByUser(filters)

  const handleSearch = useCallback(() => {
    setSearchApplied(searchInput)
  }, [searchInput])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch()
    },
    [handleSearch]
  )

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

      {/* Panel de filtros */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 space-y-4">
        {/* Fila 1: Rango de fechas + Buscador */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-6 lg:items-center">
          <div className="w-full lg:w-auto lg:min-w-0">
            <TabsDateRange rangeDate={rangeDate} setRangeDate={setRangeDate} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-0">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 shrink-0" />
              <Input
                placeholder="Buscar en título o descripción..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9 h-10 rounded-xl border-slate-200 w-full"
              />
            </div>
            <Button onClick={handleSearch} variant="secondary" className="h-10 rounded-xl shrink-0">
              <Search className="size-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Buscar</span>
            </Button>
          </div>
        </div>

        {/* Fila 2: Estado, Tipo, Solo raíz */}
        <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 pt-3 border-t border-slate-200/80">
          <div className="flex flex-wrap gap-2 items-center min-w-0">
            <span className="text-sm font-medium text-slate-600 shrink-0 w-14">Estado</span>
            <div className="flex flex-wrap gap-1.5">
              {([
                { value: "all" as const, label: "Todas", icon: null },
                { value: true as const, label: "Completadas", short: "Hechas", icon: CheckCircle2 },
                { value: false as const, label: "Pendientes", short: "Pend.", icon: Circle },
              ]).map(({ value, label, short: s, icon: Icon }) => (
                <Button
                  key={String(value)}
                  type="button"
                  variant={completedFilter === value ? "default" : "outline"}
                  size="sm"
                  className={cn("rounded-lg h-8", completedFilter === value && "bg-indigo-600 hover:bg-indigo-700")}
                  onClick={() => setCompletedFilter(value)}
                >
                  {Icon && <Icon className="size-3.5 shrink-0" />}
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{s ?? label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center min-w-0">
            <span className="text-sm font-medium text-slate-600 shrink-0 w-14">Tipo</span>
            <div className="flex flex-wrap gap-1.5">
              {([
                { value: "all" as const, label: "Todos" },
                { value: "target" as const, label: "Target" },
                { value: "manual" as const, label: "Manual" },
                { value: "goals" as const, label: "Contenedor" },
              ]).map(({ value, label }) => (
                <Button
                  key={value}
                  type="button"
                  variant={goalTypeFilter === value ? "default" : "outline"}
                  size="sm"
                  className={cn("rounded-lg h-8", goalTypeFilter === value && "bg-indigo-600 hover:bg-indigo-700")}
                  onClick={() => setGoalTypeFilter(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              type="button"
              variant={excludeChildGoals ? "default" : "outline"}
              size="sm"
              className={cn("rounded-lg h-8", excludeChildGoals && "bg-indigo-600 hover:bg-indigo-700")}
              onClick={() => setExcludeChildGoals((prev) => !prev)}
            >
              <GitBranch className="size-3.5" />
              <span className="hidden md:inline">Solo metas raíz</span>
              <span className="md:hidden">Raíz</span>
            </Button>
          </div>
        </div>
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