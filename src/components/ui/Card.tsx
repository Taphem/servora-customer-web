import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover elevation/border for cards that act as click targets. */
  interactive?: boolean;
}

export function Card({ interactive = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-(--radius-lg) border border-border-default bg-surface-raised p-5 shadow-xs",
        interactive &&
          "transition-shadow duration-(--duration-hover) hover:border-border-strong hover:shadow-sm",
        className,
      )}
      {...rest}
    />
  );
}
