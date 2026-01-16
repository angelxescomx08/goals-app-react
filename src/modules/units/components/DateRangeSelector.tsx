import { dayStringToStartUtc, dayStringToEndUtc } from "@/lib/dateUtils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

type Props = {
  onDateChange: (startUtc: string, endUtc: string) => void
  initialStartDate?: string // "YYYY-MM-DD"
  initialEndDate?: string // "YYYY-MM-DD"
}

export const DateRangeSelector = ({
  onDateChange,
  initialStartDate,
  initialEndDate,
}: Props) => {
  const today = dayjs().format("YYYY-MM-DD")
  const oneMonthAgo = dayjs().subtract(1, "month").format("YYYY-MM-DD")

  const [startDate, setStartDate] = useState<string>(
    initialStartDate || oneMonthAgo
  )
  const [endDate, setEndDate] = useState<string>(initialEndDate || today)

  // Convertir fechas locales a UTC y notificar cambios
  useEffect(() => {
    if (startDate && endDate) {
      const startUtc = dayStringToStartUtc(startDate)
      const endUtc = dayStringToEndUtc(endDate)
      onDateChange(startUtc, endUtc)
    }
  }, [startDate, endDate, onDateChange])

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1">
        <Label htmlFor="start-date" className="text-sm font-semibold text-slate-700 mb-2 block">
          Fecha inicio
        </Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={endDate}
          className="w-full"
        />
      </div>

      <div className="flex-1">
        <Label htmlFor="end-date" className="text-sm font-semibold text-slate-700 mb-2 block">
          Fecha fin
        </Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
          max={today}
          className="w-full"
        />
      </div>
    </div>
  )
}
