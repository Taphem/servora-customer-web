import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

const PALETTE = [
  "bg-brand-100 text-brand-700",
  "bg-accent-100 text-accent-600",
  "bg-info-100 text-info-600",
  "bg-success-100 text-success-500",
  "bg-ink-100 text-ink-700",
];

function paletteIndexForSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % PALETTE.length;
  }
  return Math.abs(hash);
}

interface PlaceholderThumbnailProps {
  seed: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  className?: string;
}

/**
 * A deterministic, brand-palette placeholder standing in for a real
 * service/provider photo — never presented as an actual picture. The
 * same `seed` always produces the same color so a given mock record
 * looks consistent across the app, without pretending to be photography.
 */
export function PlaceholderThumbnail({ seed, icon: Icon, className }: PlaceholderThumbnailProps) {
  const paletteClass = PALETTE[paletteIndexForSeed(seed)];

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-(--radius-md)",
        paletteClass,
        className,
      )}
    >
      <Icon size={28} />
    </div>
  );
}
