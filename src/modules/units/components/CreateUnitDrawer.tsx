import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Loader2Icon, PlusIcon, Ruler } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { useCreateUnit } from '../hooks/useCreateUnit'
import { Input } from '@/components/ui/input'

// --- DEFINICIÓN DE TIPOS ---

// Definimos la estructura de los datos del formulario de unidad
interface UnitFormValues {
  name: string
}

// Interfaz para el estado de la mutación (basado en lo que devuelve useCreateUnit)
interface MutationState {
  mutate: (data: UnitFormValues) => void
  isPending: boolean
}

interface FormProps {
  form: UseFormReturn<UnitFormValues>
  mutation: MutationState
}

// --- COMPONENTES AUXILIARES ---

const FormContent = ({ form, mutation }: FormProps) => (
  <form
    id="create-unit-form"
    onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
    className="space-y-4 pt-4 px-4 md:px-0"
  >
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="grid gap-2">
            <FieldLabel htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Ruler className="size-4 text-slate-400" /> Nombre de la unidad
            </FieldLabel>
            <Input
              {...field}
              id="name"
              className="h-11 border-slate-200 focus-visible:ring-indigo-600 transition-all"
              aria-invalid={fieldState.invalid}
              placeholder="Ej: Kilogramos, Metros, Libros..."
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  </form>
)

const SubmitButton = ({ mutation }: { mutation: MutationState }) => (
  <Button 
    type="submit" 
    form="create-unit-form"
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-indigo-100 transition-all"
    disabled={mutation.isPending}
  >
    {mutation.isPending ? (
      <>
        <Loader2Icon className="size-4 mr-2 animate-spin" /> 
        Creando...
      </>
    ) : (
      <>
        <PlusIcon className="size-4 mr-2" /> 
        Crear unidad
      </>
    )}
  </Button>
)

// --- COMPONENTE PRINCIPAL ---

export const CreateUnitDrawer = () => {
  const { form, createUnitMutation, open, setOpen } = useCreateUnit()
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const TriggerBtn = (
    <Button 
      type="button" 
      variant="outline" 
      className="h-11 w-11 p-0 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm transition-all active:scale-95"
    >
      <PlusIcon className="size-5" />
    </Button>
  )

  // Aseguramos que el casting de tipos sea coherente con useCreateUnit
  const mutation = createUnitMutation as MutationState
  const typedForm = form as UseFormReturn<UnitFormValues>

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {TriggerBtn}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-slate-100 shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">Nueva Unidad</DialogTitle>
            <DialogDescription className="text-slate-500">
              Crea una unidad personalizada para medir tus éxitos.
            </DialogDescription>
          </DialogHeader>
          
          <FormContent form={typedForm} mutation={mutation} />
          
          <div className="pt-6">
            <SubmitButton mutation={mutation} />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {TriggerBtn}
      </DrawerTrigger>
      <DrawerContent className="rounded-t-[2.5rem] border-none shadow-2xl">
        <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-slate-200" />
        <DrawerHeader className="text-left px-6 pt-6">
          <DrawerTitle className="text-2xl font-bold text-slate-900">Crear unidad</DrawerTitle>
          <DrawerDescription className="text-slate-500 text-base">
            Define cómo medirás el progreso de tu meta.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="pb-4">
           <FormContent form={typedForm} mutation={mutation} />
        </div>

        <DrawerFooter className="px-6 pt-2 pb-10 gap-3">
          <SubmitButton mutation={mutation} />
          <DrawerClose asChild>
            <Button variant="ghost" className="text-slate-500 font-semibold hover:bg-slate-50">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}