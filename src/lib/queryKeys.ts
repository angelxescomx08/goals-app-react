export const queryKeys = {
  goals: {
    all: ["goals"] as const,
    lists: () => ["goals", "list"] as const,
    list: (userId: string | undefined, filters: Record<string, unknown>) =>
      ["goals", "list", { userId, ...filters }],
    details: () => ["goals", "detail"] as const,
    detail: (id: string) => ["goals", "detail", id] as const,
    detailStatistics: (id: string) => ["goals", "detail", id, "statistics"] as const,
    withType: (userId: string | undefined) => ["goals", "with-type", { userId }],
  },
  units: {
    all: ["units"] as const,
    list: (userId: string | undefined) => ["units", "list", { userId }],
    statistics: (unitId: string, startUtc: string, endUtc: string) =>
      ["units", "statistics", { unitId, startUtc, endUtc }],
  },
  statistics: {
    all: ["statistics"] as const,
    range: (startDate: string, endDate: string) =>
      ["statistics", { startDate, endDate }],
  },
  userStats: {
    all: ["user-stats"] as const,
    byParams: (params: object) => ["user-stats", params],
  },
}
