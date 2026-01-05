import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"
import { useCreateGoalProgress } from "../hooks/useCreateGoalProgress"
import { useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Loader2Icon, PlusIcon } from "lucide-react"

export const CreateGoalProgressPage = () => {

  const { goalId } = useParams()
  const { form, createGoalProgressMutation } = useCreateGoalProgress(goalId ?? "")
  return (
    <div>
      <form onSubmit={form.handleSubmit((data) => createGoalProgressMutation.mutate(data))}>
        <FieldGroup>
        <Controller
            name="goalId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="goalId">
                  Meta id
                </FieldLabel>
                <Input
                  {...field}
                  id="goalId"
                  aria-invalid={fieldState.invalid}
                  placeholder="Selecciona una meta"
                  autoComplete="off"
                  disabled
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="progress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="progress">
                  Progreso
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  value={field.value ? Number(field.value) : 0}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  id="progress"
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={createGoalProgressMutation.isPending}>
            {createGoalProgressMutation.isPending ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                Crear
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
