import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useCreateUnit } from '../hooks/useCreateUnit'
import { Input } from '@/components/ui/input'

export const CreateUnitDrawer = () => {

  const { form, createUnitMutation, open, setOpen } = useCreateUnit()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="button">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Crear unidad de medida</DrawerTitle>
          <DrawerDescription>
            Crea una nueva unidad de medida para medir el progreso de tu meta
          </DrawerDescription>
        </DrawerHeader>
        <form
          id="create-unit-form"
          onSubmit={form.handleSubmit((data) => createUnitMutation.mutate(data))}
          className='px-4'
          >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Nombre
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Kilogramos, metros, etc."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DrawerFooter>
          <Button type="submit" form="create-unit-form">
            {
              createUnitMutation.isPending 
              ? <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Creando...
              </> 
              : <>
                <PlusIcon className="w-4 h-4" />
                Crear
              </>
            }
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
