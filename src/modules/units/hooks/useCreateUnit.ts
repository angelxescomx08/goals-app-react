import { useForm } from "react-hook-form"
import { createUnitSchema, CreateUnitSchema } from "../schemas/unitSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUnit } from "../actions/unitsAction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState } from "react"

export const useCreateUnit = () => {

  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<CreateUnitSchema>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {
      name: "",
    },
  })

  const createUnitMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["units"] })
      toast.success("Unidad de medida creada correctamente")
      form.reset()
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    form,
    createUnitMutation,
    open,
    setOpen,
  }
}
