import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router"

export const GoalView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate(`/panel/goals/progress/${id}/create`)}>
        <PlusIcon className="w-4 h-4" />
        Registrar progreso
      </Button>
    </div>
  )
}
