import type { ReactNode } from "react"

type Props<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  skeleton: ReactNode;
  alertNoItems: ReactNode;
  isLoading: boolean;
  className?: string;
}

export function InfiniteList<T>({ 
  items, renderItem, skeleton, alertNoItems, isLoading, className 
}: Props<T>) {
  if (isLoading) return skeleton;
  if (items.length === 0) return alertNoItems;
  return (
    <div className={className}>
      {items.map(renderItem)}
    </div>
  )
}
