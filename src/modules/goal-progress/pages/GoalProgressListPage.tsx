import { useState } from "react"
import { useParams, Link } from "react-router"
import {
  ChevronLeft, TrendingUp, Pencil, Check, X,
  CalendarDays, Hash, Loader2, ClipboardList, Plus,
} from "lucide-react"
import dayjs from "dayjs"
import { useGoalProgressList } from "../hooks/useGoalProgressList"
import { useDeleteGoalProgress } from "../hooks/useDeleteGoalProgress"
import { useUpdateGoalProgress } from "../hooks/useUpdateGoalProgress"
import { useGoalById } from "@/modules/goals/hooks/useGoalById"
import { DeleteButton } from "@/components/DeleteButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const GoalProgressListPage = () => {
  const { goalId } = useParams()
  const id = goalId ?? ""

  const { goalProgress } = useGoalProgressList(id)
  const { goal } = useGoalById(id)
  const { deleteGoalProgressMutation } = useDeleteGoalProgress(id)
  const { updateGoalProgressMutation } = useUpdateGoalProgress(id)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const isTargetGoal = goal.data?.data.goalType === "target"
  const records = goalProgress.data?.data.goalProgress ?? []

  const startEdit = (id: string, current: number | undefined) => {
    setEditingId(id)
    setEditValue(current ?? 0)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue(0)
  }

  const saveEdit = () => {
    if (!editingId || editValue <= 0) return
    updateGoalProgressMutation.mutate(
      { id: editingId, progress: editValue },
      { onSuccess: () => cancelEdit() }
    )
  }

  const handleDeleteClick = (id: string) => {
    setDeletingId(id)
    setOpenDeleteModal(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-0 md:p-6 lg:p-10">

      {/* Back nav */}
      <Link
        to={`/panel/goals/${id}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Volver al detalle
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            Historial de Progreso
          </h1>
          <p className="text-slate-500 mt-1">
            {goal.data?.data.title && (
              <span className="font-medium text-slate-700">{goal.data.data.title}</span>
            )}
          </p>
        </div>
        <Link
          to={`/panel/goals/progress/${id}/create`}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Registrar avance
        </Link>
      </div>

      {/* Loading */}
      {goalProgress.isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      )}

      {/* Empty state */}
      {!goalProgress.isLoading && records.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <ClipboardList className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Sin registros aún</h3>
          <p className="text-slate-500 max-w-xs mt-2 mb-6">
            Registra tu primer avance para comenzar a rastrear el progreso de esta meta.
          </p>
          <Link
            to={`/panel/goals/progress/${id}/create`}
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Registrar primer avance
          </Link>
        </div>
      )}

      {/* Records list */}
      {records.length > 0 && (
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center gap-4"
            >
              {/* Date */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                  <span>{dayjs(record.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                </div>

                {/* Value — view or edit */}
                {editingId === record.id ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={editValue === 0 ? "" : String(editValue)}
                      onChange={(e) => {
                        const n = Number(e.target.value)
                        if (e.target.value === "") setEditValue(0)
                        else if (!Number.isNaN(n) && n >= 0) setEditValue(n)
                      }}
                      className="h-9 w-32 text-base font-bold border-indigo-300 focus-visible:ring-indigo-500"
                      autoFocus
                    />
                    <Button
                      size="icon"
                      className="h-9 w-9 bg-emerald-600 hover:bg-emerald-700"
                      onClick={saveEdit}
                      disabled={updateGoalProgressMutation.isPending || editValue <= 0}
                    >
                      {updateGoalProgressMutation.isPending
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Check className="w-4 h-4" />
                      }
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9"
                      onClick={cancelEdit}
                      disabled={updateGoalProgressMutation.isPending}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xl font-bold text-slate-900">
                      {record.progress ?? "—"}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions (only when not editing this row) */}
              {editingId !== record.id && (
                <div className="flex items-center gap-2 shrink-0">
                  {isTargetGoal && (
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                      onClick={() => startEdit(record.id, record.progress)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 border-slate-200 hover:border-red-300 hover:text-red-600"
                    onClick={() => handleDeleteClick(record.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Shared delete confirmation */}
      <DeleteButton
        title="Eliminar registro"
        description="¿Estás seguro de querer eliminar este registro de progreso? Esta acción recalculará el progreso total de la meta."
        open={openDeleteModal}
        onOpenChange={(open) => {
          setOpenDeleteModal(open)
          if (!open) setDeletingId(null)
        }}
        onDelete={async () => {
          if (!deletingId) return
          await deleteGoalProgressMutation.mutateAsync(deletingId)
          setOpenDeleteModal(false)
          setDeletingId(null)
        }}
        isLoading={deleteGoalProgressMutation.isPending}
      />
    </div>
  )
}
