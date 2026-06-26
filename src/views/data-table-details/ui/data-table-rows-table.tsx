"use client";

import type { AxiosError } from "axios";
import { Inbox } from "lucide-react";
import type { DataTableColumn, ListDataTableRowsParams } from "@/entities/data-table";
import { useDataTableRows } from "@/entities/data-table";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { Pagination } from "@/shared/ui/pagination";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (typeof value === "boolean") {
    return value ? "نعم" : "لا";
  }
  return String(value);
}

interface DataTableRowsTableProps {
  dataTableId: string;
  columns: DataTableColumn[];
  params: ListDataTableRowsParams;
  page: number;
  onPageChange: (page: number) => void;
}

export function DataTableRowsTable({ dataTableId, columns, params, page, onPageChange }: DataTableRowsTableProps) {
  const { data, isLoading, isError, error, refetch } = useDataTableRows(dataTableId, params);
  const status = (error as AxiosError | null)?.response?.status;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-2 pt-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="pt-6">
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض بيانات الجدول." />
          ) : status === 422 ? (
            <ServerErrorState description="فلتر غير صالح لهذا الجدول." onRetry={() => refetch()} />
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
            icon={Inbox}
            title="لا توجد صفوف مطابقة"
            description="جرّب تعديل كلمة البحث أو الفلاتر المطبّقة."
          />
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.total / data.limit));

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b">
                {columns.map((column) => (
                  <th key={column.name} className="text-muted-foreground p-3 text-start font-medium whitespace-nowrap">
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {data.items.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.name} className="text-foreground p-3 whitespace-nowrap">
                      {formatCellValue(row[column.name])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
