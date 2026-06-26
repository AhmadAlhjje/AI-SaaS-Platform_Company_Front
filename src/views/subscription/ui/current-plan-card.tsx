"use client";

import type { AxiosError } from "axios";
import { CreditCard, FileX2 } from "lucide-react";
import { useMySubscription } from "@/entities/subscription-plan";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";

const STATUS_LABELS: Record<string, string> = {
  active: "نشط",
  expired: "منتهي",
  cancelled: "ملغى",
};

export function CurrentPlanCard() {
  const { data: subscription, isLoading, isError, error, refetch } = useMySubscription();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الخطة الحالية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    const status = (error as AxiosError).response?.status;

    return (
      <Card>
        <CardHeader>
          <CardTitle>الخطة الحالية</CardTitle>
        </CardHeader>
        <CardContent>
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض بيانات الاشتراك." />
          ) : status === 404 ? (
            <EmptyState icon={FileX2} title="لا يوجد اشتراك نشط" />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
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
        <CardTitle>الخطة الحالية</CardTitle>
        <CreditCard className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-lg font-bold">{subscription.plan.name}</span>
          <Badge variant={subscription.status === "active" ? "success" : "secondary"}>
            {STATUS_LABELS[subscription.status] ?? subscription.status}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm">
          {subscription.plan.price === 0 ? "مجانية" : `${subscription.plan.price} / شهرياً`}
        </p>

        <dl className="text-muted-foreground grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="inline">تاريخ البدء: </dt>
            <dd className="text-foreground inline font-medium">
              {new Date(subscription.startDate).toLocaleDateString("ar")}
            </dd>
          </div>
          <div>
            <dt className="inline">تاريخ الانتهاء: </dt>
            <dd className="text-foreground inline font-medium">
              {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString("ar") : "بدون انتهاء"}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
