import { Hash } from "lucide-react"
import { UnitCard } from "../components/UnitCard"
import { useUnitsByUser } from "../hooks/useUnitsByUser"

export const UnitsPage = () => {
  const { units } = useUnitsByUser()
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3 mb-4">
        <Hash className="text-indigo-600 w-8 h-8" />
        Unidades de medida
      </h1>
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {units.data?.data.units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
      </div>
    </div>
  )
}
