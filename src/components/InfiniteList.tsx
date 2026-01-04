import { ReactNode } from "react"

type Props<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  skeleton: ReactNode;
  alertNoItems: ReactNode;
  isLoading: boolean;
}

export function InfiniteList<T>({ 
  items, renderItem, skeleton, alertNoItems, isLoading 
}: Props<T>) {
  if (isLoading) return skeleton;
  if (items.length === 0) return alertNoItems;
  return (
    <div>
      {items.map(renderItem)}
    </div>
  )
}
