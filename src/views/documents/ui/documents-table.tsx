"use client";

import type { AxiosError } from "axios";
import { FileText } from "lucide-react";
import { DOCUMENT_STATUS_LABEL, DOCUMENT_STATUS_VARIANT, useDocuments } from "@/entities/document";
import { DeleteDocumentButton } from "@/features/delete-document";
import { ReprocessDocumentButton } from "@/features/reprocess-document";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { Pagination } from "@/shared/ui/pagination";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";

const PAGE_SIZE = 10;

interface DocumentsTableProps {
  search: string;
  page: number;
  onPageChange: (page: number) => void;
}

export function DocumentsTable({ search, page, onPageChange }: DocumentsTableProps) {
  const { data, isLoading, isError, error, refetch } = useDocuments({ search, page, limit: PAGE_SIZE });
  const status = (error as AxiosError | null)?.response?.status;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-2 pt-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="pt-6">
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض المستندات." />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </CardContent>
      </Card>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <EmptyState
            icon={FileText}
            title={search ? "لا توجد نتائج مطابقة" : "لا توجد مستندات بعد"}
            description={search ? "جرّب كلمة بحث مختلفة." : "ابدأ برفع أول مستند لشركتك."}
          />
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.total / data.limit));

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="p-0">
          <ul className="divide-border divide-y">
            {data.items.map((document) => (
              <li key={document.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">{document.fileName}</p>
                  <p className="text-muted-foreground text-xs">{document.knowledgeType}</p>
                </div>
                <Badge variant={DOCUMENT_STATUS_VARIANT[document.status] ?? "secondary"}>
                  {DOCUMENT_STATUS_LABEL[document.status] ?? document.status}
                </Badge>
                <div className="flex items-center gap-1">
                  {document.status === "failed" && <ReprocessDocumentButton documentId={document.id} />}
                  <DeleteDocumentButton documentId={document.id} fileName={document.fileName} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
