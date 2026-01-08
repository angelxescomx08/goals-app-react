import { useParams } from "react-router"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateUnitDrawer } from "@/modules/units/components/CreateUnitDrawer"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Edit2Icon, Loader2Icon, Target, NotebookPen, Ruler, ChevronLeft } from "lucide-react"
import { useEditGoal } from "@/modules/goals/hooks/useEditGoal"
import { Link } from "react-router"

export const GoalByIdPage = () => {
  const { id } = useParams()
  const { form, editGoalMutation, showTargetAndUnit, units } = useEditGoal(id ?? "")

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Botón de volver sutil */}
        <Link 
          to="/panel/goals" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 text-sm font-medium group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver a mis metas
        </Link>

        {/* Encabezado de la página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Edit2Icon className="w-6 h-6" />
            </div>
            Editar meta
          </h1>
          <p className="text-slate-500 mt-2 ml-14">
            Actualiza los detalles de tu objetivo para mantener tus estadísticas al día.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
          <form onSubmit={form.handleSubmit((data) => editGoalMutation.mutate(data))} className="space-y-8">
            <FieldGroup className="space-y-6">
              
              {/* Título de la Meta */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="grid gap-2">
                    <FieldLabel htmlFor="title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <NotebookPen className="w-4 h-4 text-slate-400" /> Título
                    </FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      className="h-11 focus-visible:ring-indigo-600 border-slate-200"
                      placeholder="Mi meta de lectura"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                  </Field>
                )}
              />

              {/* Tipo de Meta */}
              <Controller
                name="goalType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="grid gap-2">
                    <FieldLabel htmlFor="goalType" className="text-sm font-semibold text-slate-700">Tipo de seguimiento</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? "target"}>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="target">Objetivo Numérico</SelectItem>
                        <SelectItem value="manual">Registro Manual</SelectItem>
                        <SelectItem value="goals">Sub-metas</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                  </Field>
                )}
              />

              {/* Campos Condicionales: Unidad y Objetivo */}
              {showTargetAndUnit && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  <div className="space-y-2">
                    <Controller
                      name="unitId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="grid gap-2">
                          <FieldLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-slate-400" /> Unidad
                          </FieldLabel>
                          <div className="flex gap-2">
                            <Select onValueChange={field.onChange} value={field.value ?? "null"}>
                              <SelectTrigger className="h-11 bg-white border-slate-200">
                                <SelectValue placeholder="Unidad" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="null">Ninguna</SelectItem>
                                {units.data?.data.units.map((unit) => (
                                  <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <CreateUnitDrawer />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name="target"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="grid gap-2">
                        <FieldLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Target className="w-4 h-4 text-slate-400" /> Valor Objetivo
                        </FieldLabel>
                        <Input
                          {...field}
                          type="number"
                          className="h-11 bg-white border-slate-200"
                          value={field.value ? Number(field.value) : 0}
                          onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                          placeholder="100"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                      </Field>
                    )}
                  />
                </div>
              )}

              {/* Descripción */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="grid gap-2">
                    <FieldLabel className="text-sm font-semibold text-slate-700">Descripción</FieldLabel>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      className="min-h-[120px] resize-none border-slate-200 focus-visible:ring-indigo-600"
                      placeholder="Describe tu meta..."
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Acciones del Formulario */}
            <div className="pt-6 border-t border-slate-50 flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 disabled:opacity-70"
                disabled={editGoalMutation.isPending}
              >
                {editGoalMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                    <span>Actualizando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Edit2Icon className="w-4 h-4" />
                    <span>Guardar cambios</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}