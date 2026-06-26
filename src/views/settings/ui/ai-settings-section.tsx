"use client";

import type { AxiosError } from "axios";
import { useAiConfiguration } from "@/entities/ai-configuration";
import { Card, CardContent } from "@/shared/ui/card";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { AiSettingsForm } from "./ai-settings-form";

export function AiSettingsSection() {
  const { data: config, isLoading, isError, error, refetch } = useAiConfiguration();
  const status = (error as AxiosError | null)?.response?.status;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-3 pt-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-1/3" />
        </CardContent>
      </Card>
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
