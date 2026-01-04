import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useInfiniteGoalsByUser } from "../hooks/useInfiniteGoalsByUser"
import { Link } from "react-router"
import { Plus } from "lucide-react"
import { InfiniteList } from "@/components/InfiniteList"
import { GoalCard } from "../components/GoalCard"

export const GoalsPage = () => {
  const { goals } = useInfiniteGoalsByUser()

  return (
    <main className="container p-2">
      <Link to="/panel/goals/create" className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md p-2">
        <Plus className="size-6" />
        <span className="text-sm font-medium">Crear meta</span>
      </Link>
      {

        <InfiniteList
          isLoading={goals.isFetching}
          alertNoItems={
            <Alert variant="destructive">
              <AlertTitle>No hay metas</AlertTitle>
              <AlertDescription>No hay metas creadas todavía.</AlertDescription>
            </Alert>
          }
          items={goals.data?.pages.flatMap(page => page.data.data) ?? []}
          renderItem={goal => <GoalCard key={goal.id} goal={goal} />}
          skeleton={<div className="animate-pulse">
            <div className="h-20 w-full bg-muted rounded-md" />
          </div>}
        />
      }
    </main>
  )
}
