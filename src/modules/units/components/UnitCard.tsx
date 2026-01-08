import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { UnitSchema } from "../schemas/unitSchema"

type Props = {
  unit: UnitSchema
}

export const UnitCard = ({ unit }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{unit.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}
