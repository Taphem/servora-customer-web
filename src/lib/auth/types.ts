export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

/**
 * Placeholder shape for the future authenticated customer. Fields will be
 * filled in once a real session endpoint exists to verify them against —
 * kept minimal on purpose so nothing here pretends to know the eventual
 * backend contract.
 */
export interface CustomerUser {
  id: string;
  email: string;
  displayName: string | null;
}

export interface AuthState {
  status: AuthStatus;
  user: CustomerUser | null;
}
