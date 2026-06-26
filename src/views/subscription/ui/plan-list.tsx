"use client";

import { useMySubscription, usePlans } from "@/entities/subscription-plan";
import { Card, CardContent } from "@/shared/ui/card";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { PlanCard } from "./plan-card";

export function PlanList() {
  const { data: plans, isLoading, isError, refetch } = usePlans();
  const { data: subscription } = useMySubscription();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <ServerErrorState onRetry={() => refetch()} />
        </CardContent>
      </Card>
    );
  }

  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} isCurrent={subscription?.plan.id === plan.id} />
      ))}
    </div>
  );
}
