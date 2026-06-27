"use client";

import type { AxiosError } from "axios";
import { useAiConfiguration } from "@/entities/ai-configuration";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { AiSettingsForm } from "./ai-settings-form";

export function AiSettingsSection() {
  const { data: config, isLoading, isError, error, refetch } = useAiConfiguration();
  const status = (error as AxiosError | null)?.response?.status;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Skeleton className="h-24 w-full" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !config) {
    return (
      <Card>
        <CardContent className="pt-6">
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لتعديل إعدادات الذكاء الاصطناعي." />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </CardContent>
      </Card>
    );
  }

  return <AiSettingsForm key={config.updatedAt} config={config} />;
}
