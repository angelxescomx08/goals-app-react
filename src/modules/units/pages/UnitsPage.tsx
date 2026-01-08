import { UnitCard } from "../components/UnitCard"
import { useUnitsByUser } from "../hooks/useUnitsByUser"

export const UnitsPage = () => {
  const { units } = useUnitsByUser()
  return (
    <div>
      <h1>Unidades de medida</h1>
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {units.data?.data.units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
      </div>
    </div>
  )
}
