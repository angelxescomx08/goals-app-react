import { authClient } from "@/lib/auth";
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

    // 🔥 aquí se amplía el rango
    return [
      start.subtract(1, "day").format("YYYY-MM-DD"),
      end.add(1, "day").format("YYYY-MM-DD"),
    ];
  }, [rangeDate, data?.user.createdAt]);

  return {
    startDate,
    endDate,
    rangeDate,
    setRangeDate,
  };
};
