import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DiscoveryLayoutProps {
  /** The list/results panel — always rendered. */
  list: ReactNode;
  /**
   * The map panel. When omitted, the list renders full-width — this is
   * what makes the same layout usable for both a plain list page and a
   * future list+map split view without a second component.
   */
  map?: ReactNode;
  className?: string;
}

/**
 * The layout foundation for discovery pages (search, services, providers)
 * that will eventually pair a results list with a map. Below `lg`, the
 * map panel — when present — stacks under the list rather than
 * squeezing both into a narrow column; there's no map implementation
 * wired in yet (see src/lib/location), so callers pass their own map
 * panel content once one exists.
 */
export function DiscoveryLayout({ list, map, className }: DiscoveryLayoutProps) {
  if (!map) {
    return <div className={className}>{list}</div>;
  }

  return (
    <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-start", className)}>
      <div className="min-w-0 flex-1">{list}</div>
      <div className="top-20 h-[70vh] w-full shrink-0 overflow-hidden rounded-(--radius-lg) border border-border-default lg:sticky lg:h-[calc(100vh-6rem)] lg:w-[42%]">
        {map}
      </div>
    </div>
  );
}
