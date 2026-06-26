"use client";

import type { AxiosError } from "axios";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { DOCUMENT_STATUS_LABEL, DOCUMENT_STATUS_VARIANT, useDocuments } from "@/entities/document";

interface DocumentListProps {
  limit?: number;
}

export function DocumentList({ limit }: DocumentListProps) {
  const { data, isLoading, isError, error, refetch } = useDocuments({ limit });
  const documents = data?.items ?? [];
  const status = (error as AxiosError | null)?.response?.status;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>أحدث المستندات</CardTitle>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/documents" />}>
          عرض الكل
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {isError && status === 403 && (
          <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض المستندات." />
        )}
        {isError && status !== 403 && <ServerErrorState onRetry={() => refetch()} />}

        {!isLoading && !isError && documents.length === 0 && (
          <EmptyState icon={FileText} title="لا توجد مستندات بعد" description="ابدأ برفع أول مستند لشركتك." />
        )}

        {!isLoading && !isError && documents.length > 0 && (
          <ul className="divide-border divide-y">
            {documents.map((document) => (
              <li key={document.id} className="flex items-center justify-between gap-2 py-2.5 text-sm">
                <span className="text-foreground truncate">{document.fileName}</span>
                <Badge variant={DOCUMENT_STATUS_VARIANT[document.status] ?? "secondary"}>
                  {DOCUMENT_STATUS_LABEL[document.status] ?? document.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
