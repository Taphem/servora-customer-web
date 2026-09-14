import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      data-motion-exempt
      className={cn(
        "animate-pulse rounded-(--radius-sm) bg-ink-100",
        className,
      )}
      {...rest}
    />
  );
}
