import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/utils";
import type { AsyncStatus } from "@/types/common";

interface AsyncCardGridProps<T> {
  status: AsyncStatus;
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  renderSkeleton: (index: number) => ReactNode;
  skeletonCount?: number;
  emptyIcon?: ReactNode;
  emptyTitle: string;
  emptyDescription?: string;
  errorDescription?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * The shared loading/empty/error/success rendering used by every
 * discovery grid (Home's rails, /services, /providers, /search) so each
 * page doesn't re-implement the same four-state branch. `status` is
 * whatever an `AsyncStatus`-shaped hook (e.g. `useSearchState`, or a
 * page's own `useEffect` + repository call) produces.
 */
export function AsyncCardGrid<T>({
  status,
  items,
  getKey,
  renderItem,
  renderSkeleton,
  skeletonCount = 3,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  errorDescription,
  onRetry,
  className,
}: AsyncCardGridProps<T>) {
  if (status === "error") {
    return <ErrorState description={errorDescription} onRetry={onRetry} />;
  }

  if (status === "loading" || status === "idle") {
    return (
      <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index}>{renderSkeleton(index)}</div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={getKey(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
