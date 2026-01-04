import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createGoalSchema, CreateGoalSchema } from "../schemas/goalSchema"
import { createGoal } from "../actions/goalsActions"
import { useEffect, useState } from "react"
import { useUnitsByUser } from "@/modules/units/hooks/useUnitsByUser"

export const useCreateGoal = () => {

  const [showTargetAndUnit, setShowTargetAndUnit] = useState(false)
  const { units } = useUnitsByUser()

  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      goal_type: "target",
      parent_goal_id: null,
      target: null,
      unit_id: null,
    },
  })

  const handleSubmit = async (data: CreateGoalSchema) => {
    return await createGoal(data)
  }

  useEffect(() => {
    if (form.getValues("goal_type") === "target") {
      form.setValue("unit_id", null)
      form.setValue("target", null)
      setShowTargetAndUnit(true)
    } else {
      setShowTargetAndUnit(false)
    }
  }, [form.watch("goal_type")])

  return {
    form,
    handleSubmit,
    showTargetAndUnit,
    units,
  }
}
