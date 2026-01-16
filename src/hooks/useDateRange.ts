import { authClient } from "@/lib/auth";
import { dayStringToStartUtc, dayStringToEndUtc } from "@/lib/dateUtils";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export const useDateRange = (
  initialRangeDate: "week" | "month" | "year" | "all" = "year"
) => {
  const [rangeDate, setRangeDate] = useState<
    "week" | "month" | "year" | "all"
  >(initialRangeDate);

  const { data } = authClient.useSession();

  const [startDate, endDate] = useMemo(() => {
    const today = dayjs();
    const createdAt = data?.user.createdAt;

    let start: dayjs.Dayjs;
    let end: dayjs.Dayjs;

    switch (rangeDate) {
      case "week":
        start = today.subtract(7, "day");
        end = today;
        break;

      case "month":
        start = today.subtract(1, "month");
        end = today;
        break;

      case "year":
        start = today.subtract(1, "year");
        end = today;
        break;

      case "all":
        start = createdAt ? dayjs(createdAt) : today.startOf("year");
        end = today;
        break;
    }

    // Strings "YYYY-MM-DD" para UI solamente
    return [
      start.format("YYYY-MM-DD"),
      end.format("YYYY-MM-DD"),
    ];
  }, [rangeDate, data?.user.createdAt]);

  // Convertir fechas locales a UTC para enviar al backend
  const startUtc = useMemo(() => dayStringToStartUtc(startDate), [startDate]);
  const endUtc = useMemo(() => dayStringToEndUtc(endDate), [endDate]);

  return {
    startDate, // Para UI: "YYYY-MM-DD"
    endDate,   // Para UI: "YYYY-MM-DD"
    startUtc,  // Para API: ISO 8601 UTC (inicio del día)
    endUtc,    // Para API: ISO 8601 UTC (fin del día)
    rangeDate,
    setRangeDate,
  };
};
