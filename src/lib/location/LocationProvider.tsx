"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  LocationPermissionState,
  LocationState,
  SelectedLocation,
} from "./types";

interface LocationContextValue extends LocationState {
  /**
   * Asks the browser for the visitor's current coordinates. This only
   * resolves *coordinates* for real — it does not fabricate a street
   * address. Reverse-geocoding those coordinates into a real address is
   * the existing map/places integration's job (see servora-provider-web's
   * `GoogleMap`/`googleMaps.ts`); until that's wired in here, the
   * resolved location's `displayAddress` is the coordinates themselves,
   * formatted for display.
   */
  requestCurrentLocation: () => Promise<void>;
  /**
   * The integration point for the existing map/places implementation:
   * once a `PlaceAutocomplete`-style component resolves a real place, it
   * calls this with the real address, replacing any coordinate-only
   * location set by `requestCurrentLocation`.
   */
  setLocation: (location: SelectedLocation) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

function formatCoordinatesForDisplay(latitude: number, longitude: number) {
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LocationState>({
    status: "idle",
    permission: "prompt",
    location: null,
    error: null,
  });

  const requestCurrentLocation = useCallback(async () => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setState((previous) => ({
        ...previous,
        status: "unavailable",
        permission: "unsupported",
        error: "Location isn't supported in this browser.",
      }));
      return;
    }

    setState((previous) => ({ ...previous, status: "loading", error: null }));

    await new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState({
            status: "resolved",
            permission: "granted",
            error: null,
            location: {
              coordinates: { latitude, longitude },
              displayAddress: formatCoordinatesForDisplay(latitude, longitude),
            },
          });
          resolve();
        },
        (geoError) => {
          const permission: LocationPermissionState =
            geoError.code === geoError.PERMISSION_DENIED ? "denied" : "prompt";
          setState({
            status: "unavailable",
            permission,
            location: null,
            error:
              permission === "denied"
                ? "Location access was denied."
                : "Couldn't determine your location.",
          });
          resolve();
        },
        { timeout: 10_000 },
      );
    });
  }, []);

  const setLocation = useCallback((location: SelectedLocation) => {
    setState({ status: "resolved", permission: "granted", location, error: null });
  }, []);

  const clearLocation = useCallback(() => {
    setState({ status: "idle", permission: "prompt", location: null, error: null });
  }, []);

  const value = useMemo<LocationContextValue>(
    () => ({ ...state, requestCurrentLocation, setLocation, clearLocation }),
    [state, requestCurrentLocation, setLocation, clearLocation],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextValue {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
