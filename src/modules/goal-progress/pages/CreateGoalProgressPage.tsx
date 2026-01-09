import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"
import { useCreateGoalProgress } from "../hooks/useCreateGoalProgress"
import { useParams, Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Loader2Icon, PlusIcon, ChevronLeft, TrendingUp, Hash } from "lucide-react"

export const CreateGoalProgressPage = () => {
  const { goalId } = useParams()
  const { form, createGoalProgressMutation, showProgress } = useCreateGoalProgress(goalId ?? "")

  return (
    <div className="w-full max-w-lg min-h-[calc(100vh-4rem)] bg-slate-50/50 p-0 md:p-6 lg:p-10 flex flex-col items-center">

      {/* Navegación de regreso */}
      <Link
        to={`/panel/goals/${goalId}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 text-sm font-medium group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Volver al detalle
      </Link>

      {/* Encabezado resumido */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          Registrar Avance
        </h1>
        <p className="text-slate-500 mt-2">
          Añade tus nuevas métricas para actualizar el estado de tu meta.
        </p>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-8 lg:p-10 w-full">
        <form onSubmit={form.handleSubmit((data) => createGoalProgressMutation.mutate(data))} className="space-y-6">
          <FieldGroup className="space-y-1 md:space-y-6">

            {/* ID de la Meta (Read-only estilizado) */}
            <Controller
              name="goalId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor="goalId" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" /> ID de referencia
                  </FieldLabel>
                  <Input
                    {...field}
                    id="goalId"
                    className="h-11 bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-80"
                    placeholder="Selecciona una meta"
                    autoComplete="off"
                    disabled
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

            {/* Campo de Progreso Numérico */}
            {showProgress && (
              <Controller
                name="progress"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="grid gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
                    <FieldLabel htmlFor="progress" className="text-sm font-semibold text-slate-700">
                      Cantidad lograda
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        value={field.value ? Number(field.value) : 0}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        id="progress"
                        className="h-14 text-xl font-bold pl-5 border-slate-200 focus-visible:ring-indigo-600 transition-all"
                        placeholder="0"
                        autoComplete="off"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        Unidades
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">Ingresa el valor total acumulado o el incremento actual.</p>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                  </Field>
                )}
              />
            )}
          </FieldGroup>

          {/* Botón de envío */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] disabled:opacity-70"
              disabled={createGoalProgressMutation.isPending}
            >
              {createGoalProgressMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                  <span>Guardando progreso...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PlusIcon className="w-5 h-5" />
                  <span>Confirmar avance</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}