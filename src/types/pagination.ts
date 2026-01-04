export type Pagination<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}