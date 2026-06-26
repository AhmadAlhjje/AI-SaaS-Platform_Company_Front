"use client";

import type { AxiosError } from "axios";
import { useUsageSummary, type UsageSummaryResource } from "@/entities/subscription-plan";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { Progress } from "@/shared/ui/progress";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";

interface UsageRowProps {
  label: string;
  resource: UsageSummaryResource;
}

function UsageRow({ label, resource }: UsageRowProps) {
  const percent = resource.limit > 0 ? Math.min(100, Math.round((resource.used / resource.limit) * 100)) : 0;
  const isNearLimit = percent >= 80;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className={isNearLimit ? "text-destructive" : "text-muted-foreground"}>
          {resource.used} / {resource.limit}
        </span>
      </div>
      <Progress value={percent} />
    </div>
  );
}

export function UsageLimitsCard() {
  const { data: usage, isLoading, isError, error, refetch } = useUsageSummary();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>حدود الاستخدام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    const status = (error as AxiosError).response?.status;

    return (
      <Card>
        <CardHeader>
          <CardTitle>حدود الاستخدام</CardTitle>
        </CardHeader>
        <CardContent>
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض حدود الاستخدام." />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </CardContent>
      </Card>
    );
  }

  if (!usage) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>حدود الاستخدام</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UsageRow label="المستندات" resource={usage.documents} />
        <UsageRow label="جداول البيانات" resource={usage.dataTables} />
      </CardContent>
    </Card>
  );
}
