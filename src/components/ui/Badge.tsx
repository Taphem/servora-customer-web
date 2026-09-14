import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-ink-100 text-ink-700",
  brand: "bg-primary-soft text-text-brand",
  success: "bg-success-100 text-success-500",
  warning: "bg-warning-100 text-warning-500",
  danger: "bg-danger-100 text-danger-600",
};

export function Badge({ variant = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-(--radius-full) px-2.5 py-1 text-label uppercase",
        variantStyles[variant],
        className,
      )}
      {...rest}
    />
  );
}
