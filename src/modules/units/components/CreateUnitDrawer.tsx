// components/CreateUnit.tsx
import { PlusIcon, Ruler } from 'lucide-react'
import { ResponsiveModal } from '@/components/ResponsiveModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller } from 'react-hook-form'
import { useCreateUnit } from '../hooks/useCreateUnit'

export const CreateUnit = () => {
  const { form, createUnitMutation, open, setOpen } = useCreateUnit()

  const trigger = (
    <Button
      variant="outline"
      className="h-11 w-11 p-0 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm transition-all active:scale-95"
    >
      <PlusIcon className="size-5" />
    </Button>
  )

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Nueva Unidad"
      description="Crea una unidad personalizada para medir tus éxitos."
    >
      {/* Contenido del Formulario */}
      <form
        id="create-unit-form"
        onSubmit={form.handleSubmit((data) => createUnitMutation.mutate(data))}
        className="space-y-4 pt-4 px-4 md:px-0"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Ruler className="size-4 text-slate-400" /> Nombre de la unidad
                </FieldLabel>
                <Input
                  {...field}
                  className="h-11 border-slate-200 focus-visible:ring-indigo-600 transition-all"
                  placeholder="Ej: Kilogramo, Metro, Libro..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                )}
              </Field>
            )}
          />

          <Controller
            name="pluralName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Ruler className="size-4 text-slate-400" /> Nombre plural de la unidad
                </FieldLabel>
                <Input
                  {...field}
                  className="h-11 border-slate-200 focus-visible:ring-indigo-600 transition-all"
                  placeholder="Ej: Kilogramos, Metros, Libros..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                )}
              </Field>
            )}
          />

          <Controller
            name="completedWord"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  Palabra completada de la unidad
                </FieldLabel>
                <Input
                  {...field}
                  className="h-11 border-slate-200 focus-visible:ring-indigo-600 transition-all"
                  placeholder="Ej: leído, visitado, etc."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                )}
              </Field>
            )}
          />

          <p>
            Cuando completes una meta, se usará la palabra "<span className="font-bold">{form.watch("completedWord") || "completado"}</span>" para referirse a la unidad.
            <br /> <br/>
            Ejemplo: "Has <span className="font-bold">leído</span> 10 <span className="font-bold">libros</span>".
          </p>
        </FieldGroup>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-indigo-100 transition-all"
          disabled={createUnitMutation.isPending}
        >
          {createUnitMutation.isPending ? "Creando..." : "Crear unidad"}
        </Button>
      </form>
    </ResponsiveModal>
  )
}