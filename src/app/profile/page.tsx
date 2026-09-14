"use client";

import { User } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";

export default function ProfilePage() {
  const { status, user, signOut } = useAuth();
  const { showToast } = useToast();

  return (
    <PlaceholderPage
      icon={<User size={22} aria-hidden />}
      eyebrow="Profile"
      title="Your account"
      description="Customer authentication isn't implemented yet — this page demonstrates the loading, signed-out, and signed-in states the rest of the app can already build against."
    >
      <Card className="max-w-md">
        {status === "loading" ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : status === "authenticated" && user ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-h4 text-text-primary">{user.displayName ?? "Customer"}</p>
              <p className="text-small text-text-secondary">{user.email}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => void signOut()}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-body text-text-secondary">
              You&apos;re not signed in.
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => showToast("Sign-in isn't available yet.", "info")}
              >
                Log in
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast("Sign-up isn't available yet.", "info")}
              >
                Sign up
              </Button>
            </div>
          </div>
        )}
      </Card>
    </PlaceholderPage>
  );
}
