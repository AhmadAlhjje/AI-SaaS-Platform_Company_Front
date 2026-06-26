"use client";

import type { AxiosError } from "axios";
import { CreditCard, FileX2 } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMySubscription } from "@/entities/subscription-plan";

const STATUS_LABELS: Record<string, string> = {
  active: "نشط",
  expired: "منتهي",
  cancelled: "ملغى",
};

export function UsageSummary() {
  const { data: subscription, isLoading, isError, error, refetch } = useMySubscription();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الاشتراك الحالي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    const status = (error as AxiosError).response?.status;

    return (
      <Card>
        <CardHeader>
          <CardTitle>الاشتراك الحالي</CardTitle>
        </CardHeader>
        <CardContent>
          {status === 403 && (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض بيانات الاشتراك." />
          )}
          {status === 404 && (
            <EmptyState icon={FileX2} title="لا يوجد اشتراك نشط" />
          )}
          {status !== 403 && status !== 404 && <ServerErrorState onRetry={() => refetch()} />}
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>الاشتراك الحالي</CardTitle>
        <CreditCard className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-lg font-bold">{subscription.plan.name}</span>
          <Badge variant={subscription.status === "active" ? "success" : "secondary"}>
            {STATUS_LABELS[subscription.status] ?? subscription.status}
          </Badge>
        </div>
        <dl className="text-muted-foreground grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="inline">الحد الأقصى للمستندات: </dt>
            <dd className="text-foreground inline font-medium">{subscription.plan.limits.maxDocuments}</dd>
          </div>
          <div>
            <dt className="inline">الحد الأقصى لجداول البيانات: </dt>
            <dd className="text-foreground inline font-medium">{subscription.plan.limits.maxDataTables}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
