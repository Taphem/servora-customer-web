import type { CustomerUser } from "./types";

export type SessionResult =
  | { authenticated: false }
  | { authenticated: true; user: CustomerUser };

/**
 * Resolves the current session. Deliberately NOT wired to a real backend
 * yet — this is the foundation milestone, and Servora doesn't have a
 * customer session endpoint verified for this app to call. When one
 * exists (see servora-web's `src/lib/auth/api.ts` for the shape used
 * against `servora-auth`: `GET /api/v1/auth/session`, `credentials:
 * "include"`, an always-200 `{ authenticated }` discriminated union),
 * replace this function's body with that real call — `AuthProvider`
 * already treats any thrown error as "unauthenticated", never as
 * "logged in", so the calling contract won't need to change.
 */
export async function getSession(): Promise<SessionResult> {
  return { authenticated: false };
}

export async function signOut(): Promise<void> {
  // No-op until a real session exists to end.
}
