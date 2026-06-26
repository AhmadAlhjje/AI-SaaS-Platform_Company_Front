"use client";

import type { AxiosError } from "axios";
import { Building2 } from "lucide-react";
import { useCompany } from "@/entities/company";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { CompanyProfileForm } from "./company-profile-form";

export function CompanyProfileSection() {
  const { data: company, isLoading, isError, error, refetch } = useCompany();
  const status = (error as AxiosError | null)?.response?.status;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-3 pt-6">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !company) {
    return (
      <Card>
        <CardContent className="pt-6">
          {status === 404 ? (
            <EmptyState
              icon={Building2}
              title="لم يتم إنشاء ملف الشركة بعد"
              description="أنشئ ملف شركتك لتفعيل جميع ميزات المنصة."
            />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </CardContent>
      </Card>
    );
  }

  return <CompanyProfileForm company={company} />;
}
