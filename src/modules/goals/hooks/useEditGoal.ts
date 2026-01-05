import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createGoalSchema, type CreateGoalSchema } from "@/modules/goals/schemas/goalSchema"
import { createGoal } from "../actions/goalsActions"
import { useEffect, useState } from "react"
import { KEY, useUnitsByUser } from "@/modules/units/hooks/useUnitsByUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { authClient } from "@/lib/auth"
import { useGoalById } from "@/modules/goals/hooks/useGoalById"

export const useEditGoal = (id: string) => {

  const [showTargetAndUnit, setShowTargetAndUnit] = useState(false)
  const { units } = useUnitsByUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const session = authClient.useSession()
  const { goal } = useGoalById(id ?? "")

  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      goalType: "target",
      parentGoalId: null,
      target: 0,
      unitId: null,
    },
  })

  const editGoalMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          [KEY, { userId: session.data?.user?.id }]
      })
      toast.success("Meta creada correctamente")
      form.reset()
      navigate("/panel")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (goal.data) {
      form.reset({
        title: goal.data.data.title,
        description: goal.data.data.description,
        goalType: goal.data.data.goalType,
        parentGoalId: goal.data.data.parentGoalId,
        unitId: goal.data.data.units.id,
        target: goal.data.data.target,
      })
    }
  }, [goal.data, form])

  useEffect(() => {
    if (form.getValues("goalType") === "target") {
      form.setValue("unitId", null)
      form.setValue("target", 0)
      setShowTargetAndUnit(true)
    } else {
      setShowTargetAndUnit(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("goalType")])

  return {
    form,
    editGoalMutation,
    showTargetAndUnit,
    units,
  }
}
