import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useCreateGoal } from "../hooks/useCreateGoal"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2Icon, PlusIcon, Target, NotebookPen, Ruler } from "lucide-react"
import { CreateUnitDrawer } from "@/modules/units/components/CreateUnitDrawer"

export const CreateGoalPage = () => {
  const { form, createGoalMutation, showTargetAndUnit, units } = useCreateGoal()

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Encabezado de la página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <PlusIcon className="w-6 h-6" />
            </div>
            Crear nueva meta
          </h1>
          <p className="text-slate-500 mt-2 ml-14">
            Define tus objetivos y el sistema te ayudará a medir tu éxito.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
          <form onSubmit={form.handleSubmit((data) => createGoalMutation.mutate(data))} className="space-y-8">
            <FieldGroup className="space-y-6">
              
              {/* Título de la Meta */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="grid gap-2">
                    <FieldLabel htmlFor="title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <NotebookPen className="w-4 h-4 text-slate-400" /> Título de la meta
                    </FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      className="h-11 focus-visible:ring-indigo-600 border-slate-200"
                      placeholder="Ej: Leer 12 libros este año"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                  
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
                    <FieldLabel className="text-sm font-semibold text-slate-700">Descripción (Opcional)</FieldLabel>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      className="min-h-[120px] resize-none border-slate-200 focus-visible:ring-indigo-600"
                      placeholder="¿Por qué es importante esta meta para ti?"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Botón de Envío */}
            <div className="pt-4 border-t border-slate-50">
              <Button 
                type="submit" 
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 disabled:opacity-70"
                disabled={createGoalMutation.isPending}
              >
                {createGoalMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                    <span>Guardando meta...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    <span>Crear meta ahora</span>
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