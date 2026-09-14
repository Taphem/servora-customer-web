"use client";

import type { ReactNode } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "./AuthProvider";

interface AuthGuardProps {
  children: ReactNode;
  /** Rendered while the session is still being resolved. */
  loadingFallback?: ReactNode;
  /** Rendered when no customer is signed in. */
  signedOutFallback: ReactNode;
}

/**
 * Gates its children behind an authenticated session. Not yet applied to
 * any route in this milestone — real customer authentication doesn't
 * exist to gate against — but the shape a future protected route
 * (bookings, favorites, profile) will wrap itself in is established here.
 */
export function AuthGuard({
  children,
  loadingFallback,
  signedOutFallback,
}: AuthGuardProps) {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      loadingFallback ?? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )
    );
  }

  if (status === "unauthenticated") {
    return signedOutFallback;
  }

  return children;
}
