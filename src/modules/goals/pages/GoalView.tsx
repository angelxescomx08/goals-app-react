import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { useGoalById } from "../hooks/useGoalById"
import { PieChartComponent } from "@/components/charts/PieChart"

export const GoalView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { goal } = useGoalById(id ?? "")
  return (
    <div>
      <Button onClick={() => navigate(`/panel/goals/progress/${id}/create`)}>
        <PlusIcon className="w-4 h-4" />
        Registrar progreso
      </Button>

      {goal.data?.data.goalType === "target" &&
        <PieChartComponent
        title="Progreso de la meta"
        data={[
          {
            name: "Progreso actual",
            value:
              goal.data?.data?.target != null &&
              goal.data?.data?.currentProgress != null &&
              goal.data.data.target > 0
                ? Math.min(
                    (goal.data.data.currentProgress / goal.data.data.target) * 100,
                    100
                  )
                : 0,
          },
          {
            name: "Progreso pendiente",
            value:
              goal.data?.data?.target != null &&
              goal.data?.data?.currentProgress != null &&
              goal.data.data.target > 0
                ? Math.max(
                    100 -
                      Math.min(
                        (goal.data.data.currentProgress / goal.data.data.target) * 100,
                        100
                      ),
                    0
                  )
                : 100,
          },
        ]}
        config={{
          innerRadius: 70,
          outerRadius: 100,
          showLegend: true,
          colors: ["#22c55e", "#3b82f6"],
          isPercentage: true,
        }}
      />
      }
    </div>
  )
}
