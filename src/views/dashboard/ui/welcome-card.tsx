"use client";

import { useAuth } from "@/app/providers/auth-provider/auth-provider";
import { Skeleton } from "@/shared/ui/skeleton";

export function WelcomeCard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Skeleton className="h-8 w-64" />;
  }

  return (
    <div>
      <h1 className="text-foreground text-2xl font-bold">مرحباً، {user?.fullName ?? "بك"}</h1>
      <p className="text-muted-foreground mt-1 text-sm">نظرة عامة على نشاط شركتك.</p>
    </div>
  );
}
