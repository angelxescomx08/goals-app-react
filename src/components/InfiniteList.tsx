import { useRef, useEffect, type ReactNode } from "react"
import { Loader2 } from "lucide-react"

type Props<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  skeleton: ReactNode;
  alertNoItems: ReactNode;
  isLoading: boolean;
  className?: string;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function InfiniteList<T>({
  items,
  renderItem,
  skeleton,
  alertNoItems,
  isLoading,
  className,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props<T>) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage?.()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) return <>{skeleton}</>
  if (items.length === 0) return <>{alertNoItems}</>

  return (
    <div>
      <div className={className}>
        {items.map(renderItem)}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  )
}
