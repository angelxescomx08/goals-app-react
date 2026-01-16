import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type GoalSchema } from "@/modules/goals/schemas/goalSchema"
import { Link } from "react-router";
import { Edit2Icon, EyeIcon, Target, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatLocalDate, formatRelativeTime } from "@/lib/dateUtils";

type Props = {
  goal: GoalSchema;
}

export const GoalCard = ({ goal }: Props) => {
  return (
    <Card className="group overflow-hidden border-slate-100 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      {/* Encabezado con Icono Decorativo */}
      <CardHeader className="space-y-4 pb-4">
        <div className="flex justify-between items-start">
          <div className="p-2.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors duration-300">
            <Target className="size-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
          </div>
          
          {/* Badge de estado (Simulado con estilos) */}
          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full",
            {
              "bg-emerald-50 text-emerald-600": goal.completedAt,
              "bg-red-50 text-amber-600": !goal.completedAt,
            }
          )}>
            {goal.completedAt ? "Completada" : "En progreso"}
          </span>
        </div>

        <div className="space-y-1.5">
          <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1 tracking-tight">
            {goal.title}
          </CardTitle>
          <CardDescription className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
            {goal.description || "Sin descripción proporcionada."}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Contenido Intermedio */}
      <CardContent className="grow pb-6">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Calendar className="size-3.5" />
          <span>
            {goal.createdAt 
              ? `Creado ${formatRelativeTime(goal.createdAt)}` 
              : "Creado recientemente"}
          </span>
        </div>
        {goal.completedAt && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mt-2">
            <Calendar className="size-3.5" />
            <span>Completada {formatLocalDate(goal.completedAt)}</span>
          </div>
        )}
      </CardContent>

      {/* Footer con Acciones Estilizadas */}
      <CardFooter className="border-t border-slate-50 bg-slate-50/50 p-4 grid grid-cols-2 gap-3">
        <Link 
          to={`/panel/goals/${goal.id}`}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
        >
          <EyeIcon className="size-4 text-slate-400" /> 
          Ver
        </Link>
        
        <Link 
          to={`/panel/goals/edit/${goal.id}`}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition-all active:scale-95"
        >
          <Edit2Icon className="size-4" /> 
          Editar
        </Link>
      </CardFooter>
    </Card>
  )
}