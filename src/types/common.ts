/**
 * Small, generic utility types shared across features. Domain entities
 * (Service, Provider, Booking, …) intentionally don't live here yet —
 * this is a foundation milestone with no verified backend contract for
 * any of them, so their shape belongs in each feature folder once that
 * feature is actually built against a real API.
 */

export type Nullable<T> = T | null;

/** The lifecycle of an async operation not already covered by a dedicated context (auth, location). */
export type AsyncStatus = "idle" | "loading" | "success" | "error";
