"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSession, signOut as signOutRequest } from "./api";
import type { AuthState, CustomerUser } from "./types";

interface AuthContextValue extends AuthState {
  /** Re-checks the session (e.g. after a future login/logout action). */
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: "loading",
    user: null,
  });

  const resolveSession = useCallback(async () => {
    try {
      const result = await getSession();
      return result.authenticated
        ? ({ status: "authenticated", user: result.user } as const)
        : ({ status: "unauthenticated", user: null } as const);
    } catch {
      // A failed session check is never treated as "logged in" — only a
      // confirmed, successful response can produce that state.
      return { status: "unauthenticated", user: null } as const;
    }
  }, []);

  // Only an explicit, user-triggered `refresh()` call sets "loading"
  // synchronously — the initial mount check runs its own effect below so
  // the state update always lands after the `await`, never synchronously
  // within the effect body.
  const refresh = useCallback(async () => {
    setState((previous) => ({ ...previous, status: "loading" }));
    setState(await resolveSession());
  }, [resolveSession]);

  useEffect(() => {
    let ignore = false;
    void resolveSession().then((next) => {
      if (!ignore) setState(next);
    });
    return () => {
      ignore = true;
    };
  }, [resolveSession]);

  const handleSignOut = useCallback(async () => {
    await signOutRequest();
    setState({ status: "unauthenticated", user: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, refresh, signOut: handleSignOut }),
    [state, refresh, handleSignOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { CustomerUser };
