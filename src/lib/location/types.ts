export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * A resolved, human-facing location. `displayAddress` is deliberately a
 * plain string rather than structured address parts — the existing
 * map/places integration (see servora-provider-web's `PlaceAutocomplete`/
 * `GoogleMap` components) is the source of truth for richer place data;
 * this shape only carries what the rest of the customer app needs to
 * render "where" without depending on that integration's internals.
 */
export interface SelectedLocation {
  coordinates: Coordinates;
  displayAddress: string;
}

export type LocationPermissionState =
  | "prompt"
  | "granted"
  | "denied"
  | "unsupported";

export type LocationStatus =
  /** No location has been requested or set yet. */
  | "idle"
  /** A location lookup (e.g. browser geolocation) is in progress. */
  | "loading"
  /** A location was successfully resolved. */
  | "resolved"
  /** A location was requested but could not be resolved. */
  | "unavailable";

export interface LocationState {
  status: LocationStatus;
  permission: LocationPermissionState;
  location: SelectedLocation | null;
  /** Set only when status is "unavailable" — human-readable, not thrown. */
  error: string | null;
}
