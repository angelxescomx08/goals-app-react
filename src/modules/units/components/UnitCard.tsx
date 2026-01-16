import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UnitSchema } from "../schemas/unitSchema"
import { Link } from "react-router"
import { BarChart3, Hash } from "lucide-react"

type Props = {
  unit: UnitSchema
}

export const UnitCard = ({ unit }: Props) => {
  return (
    <Link to={`/panel/units/${unit.id}/statistics`}>
      <Card className="group overflow-hidden border-slate-100 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
        <CardHeader className="space-y-4 pb-4">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors duration-300">
              <Hash className="size-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors duration-300">
              <BarChart3 className="size-4 text-slate-400 group-hover:text-indigo-600 transition-colors duration-300" />
            </div>
          </div>

          <div className="space-y-1.5">
            <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1 tracking-tight">
              {unit.name}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="grow pb-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <BarChart3 className="size-3.5" />
            <span>Ver estadísticas</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
