"use client";

import { User } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ROUTES } from "@/constants/routes";

/**
 * The header's account area. Real sign-in/sign-up isn't implemented yet
 * (see src/lib/auth) — this only wires up the three states the shell
 * needs to already render correctly for: resolving, signed out, signed in.
 */
export function AuthArea() {
  const { status, user } = useAuth();

  if (status === "loading") {
    return <Skeleton className="h-9 w-24" />;
  }

  if (status === "authenticated" && user) {
    return (
      <Button href={ROUTES.profile} variant="ghost" size="sm" icon={<User size={16} />}>
        {user.displayName ?? user.email}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button href={ROUTES.profile} variant="ghost" size="sm">
        Log in
      </Button>
      <Button href={ROUTES.profile} variant="primary" size="sm">
        Sign up
      </Button>
    </div>
  );
}
