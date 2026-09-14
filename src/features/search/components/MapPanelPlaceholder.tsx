"use client";

import { MapPin } from "lucide-react";
import { useLocation } from "@/lib/location/LocationProvider";

/**
 * The map integration seam for /search — deliberately not a real map.
 * The existing map/places implementation (see servora-provider-web's
 * GoogleMap component) plugs in here later; this only proves the layout
 * and reflects real location state honestly (no fake pins, no invented
 * provider markers).
 */
export function MapPanelPlaceholder() {
  const { status, location } = useLocation();

  const message =
    status === "resolved" && location
      ? `Will center on ${location.displayAddress}`
      : "Set your location to center the map";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 bg-surface-sunken px-6 text-center text-text-tertiary">
      <MapPin size={28} aria-hidden />
      <p className="text-small font-medium text-text-secondary">Map integration point</p>
      <p className="text-caption">{message}</p>
    </div>
  );
}
