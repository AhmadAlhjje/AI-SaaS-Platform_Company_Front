"use client";

import type { AxiosError } from "axios";
import { Table2 } from "lucide-react";
import Link from "next/link";
import { COLUMN_TYPE_LABEL, useDataTables } from "@/entities/data-table";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { Pagination } from "@/shared/ui/pagination";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";

const PAGE_SIZE = 10;

interface DataTablesListProps {
  search: string;
  page: number;
  onPageChange: (page: number) => void;
}

export function DataTablesList({ search, page, onPageChange }: DataTablesListProps) {
  const { data, isLoading, isError, error, refetch } = useDataTables();
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
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض جداول البيانات." />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </CardContent>
      </Card>
    );
  }

  const allTables = data ?? [];
  const filtered = search
    ? allTables.filter((table) => table.tableName.toLowerCase().includes(search.toLowerCase()))
    : allTables;

  if (filtered.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <EmptyState
            icon={Table2}
            title={search ? "لا توجد نتائج مطابقة" : "لا توجد جداول بيانات بعد"}
            description={search ? "جرّب كلمة بحث مختلفة." : "ارفع ملف CSV أو Excel من صفحة المستندات لإنشاء جدول."}
          />
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="p-0">
          <ul className="divide-border divide-y">
            {pageItems.map((table) => (
              <li key={table.id}>
                <Link
                  href={`/data-tables/${table.id}`}
                  className="hover:bg-muted/50 flex items-center justify-between gap-3 p-4 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">{table.tableName}</p>
                    <p className="text-muted-foreground text-xs">
                      {table.columns.map((column) => `${column.name} (${COLUMN_TYPE_LABEL[column.type]})`).join("، ")}
                    </p>
                  </div>
                  <Badge variant="secondary">{table.columns.length} أعمدة</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
