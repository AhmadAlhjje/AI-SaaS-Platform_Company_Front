"use client";

import type { AxiosError } from "axios";
import { Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { useCompany } from "@/entities/company";

const STATUS_LABELS: Record<string, string> = {
  active: "نشطة",
  suspended: "معلّقة",
};

export function CompanyCard() {
  const { data: company, isLoading, isError, error, refetch } = useCompany();
  const status = (error as AxiosError | null)?.response?.status;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الشركة</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الشركة</CardTitle>
        </CardHeader>
        <CardContent>
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

  if (!company) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>الشركة</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Avatar size="lg">
          {company.logo && <AvatarImage src={company.logo} alt={company.name} />}
          <AvatarFallback>
            <Building2 className="size-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-foreground font-semibold">{company.name}</p>
          <Badge variant={company.status === "active" ? "success" : "warning"} className="mt-1">
            {STATUS_LABELS[company.status] ?? company.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
