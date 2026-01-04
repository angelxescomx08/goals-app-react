import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useCreateGoal } from "../hooks/useCreateGoal"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { CreateUnitDrawer } from "@/modules/units/components/CreateUnitDrawer"

export const CreateGoalPage = () => {

  const { form, handleSubmit, showTargetAndUnit, units } = useCreateGoal()

  return (
    <main className="container p-2">
      <h1 className="text-2xl font-bold">Crear meta</h1>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">
                  Título
                </FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Mi meta de lectura"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="goal_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="goal_type">
                  Tipo de meta
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value ?? "target"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo de meta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="target">Objetivo</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="goals">Metas</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {showTargetAndUnit && <div className="flex gap-2 items-end">
            <Controller
              name="unit_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="unit_id">
                    Unidad de medida
                  </FieldLabel>
                  <Select {...field} value={field.value ?? "null"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de meta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Ninguna</SelectItem>
                      {units.data?.data.units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <CreateUnitDrawer  />
          </div>}

          {showTargetAndUnit && <Controller
            name="target"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="target">
                  Objetivo
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ""}
                  id="target"
                  aria-invalid={fieldState.invalid}
                  placeholder="100"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">
                  Descripción
                </FieldLabel>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe tu meta"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit">
            Crear meta
            <PlusIcon className="w-4 h-4" />
          </Button>
        </FieldGroup>
      </form>
    </main>
  )
}
