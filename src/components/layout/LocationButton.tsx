"use client";

import { MapPin } from "lucide-react";
import { useLocation } from "@/lib/location/LocationProvider";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

interface LocationButtonProps {
  className?: string;
  /** Hides the text label, keeping only the icon — used in the compact mobile header. */
  iconOnly?: boolean;
}

export function LocationButton({ className, iconOnly = false }: LocationButtonProps) {
  const { status, location, requestCurrentLocation } = useLocation();

  const label =
    status === "loading"
      ? "Locating…"
      : status === "resolved" && location
        ? location.displayAddress
        : "Set location";

  return (
    <button
      type="button"
      onClick={() => void requestCurrentLocation()}
      disabled={status === "loading"}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
      className={cn(
        "flex h-11 items-center gap-1.5 rounded-(--radius-md) px-2.5 text-small text-text-secondary transition-colors duration-(--duration-hover) hover:bg-ink-50 hover:text-text-primary disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
    >
      {status === "loading" ? (
        <Spinner size={16} />
      ) : (
        <MapPin size={16} className="shrink-0" aria-hidden />
      )}
      {iconOnly ? null : <span className="max-w-32 truncate">{label}</span>}
    </button>
  );
}
