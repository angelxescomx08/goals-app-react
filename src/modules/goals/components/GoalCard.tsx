import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalSchema } from "../schemas/goalSchema"
import { Link } from "react-router";
import { EyeIcon } from "lucide-react";

type Props = {
  goal: GoalSchema;
}

export const GoalCard = ({ goal }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.title}</CardTitle>
        <CardDescription>{goal.description}</CardDescription>
        <CardAction>
          <Link to={`/panel/goals/${goal.id}`}> 
            <EyeIcon className="size-4" /> Ver
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
