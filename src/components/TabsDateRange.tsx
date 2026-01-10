import type { Dispatch, SetStateAction } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

type Props = {
  setRangeDate: Dispatch<SetStateAction<"week" | "month" | "year" | "all">>
  rangeDate: "week" | "month" | "year" | "all"
}

export const TabsDateRange = ({ setRangeDate, rangeDate }: Props) => {
  return (
    <>
      {/* Tabs Estilizados */}
      <Tabs
        className="w-full md:w-auto"
        value={rangeDate}
        onValueChange={(value) => setRangeDate(value as "week" | "month" | "year" | "all")}
      >
        <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 h-11 border border-slate-200 shadow-sm">
          <TabsTrigger value="week" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Semana</TabsTrigger>
          <TabsTrigger value="month" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Mes</TabsTrigger>
          <TabsTrigger value="year" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Año</TabsTrigger>
          <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Todo</TabsTrigger>
        </TabsList>
      </Tabs>

    </>
  )
}
