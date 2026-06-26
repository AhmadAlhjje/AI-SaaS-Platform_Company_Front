"use client";

import type { AxiosError } from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { RowFilter } from "@/entities/data-table";
import { useDataTable } from "@/entities/data-table";
import { Card, CardContent } from "@/shared/ui/card";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { DataTableColumns } from "./data-table-columns";
import { DataTableInfo } from "./data-table-info";
import { DataTableRowsTable } from "./data-table-rows-table";
import { DataTableRowsToolbar } from "./data-table-rows-toolbar";

const PAGE_SIZE = 20;

interface DataTableDetailsViewProps {
  dataTableId: string;
}

export function DataTableDetailsView({ dataTableId }: DataTableDetailsViewProps) {
  const { data: dataTable, isLoading, isError, error, refetch } = useDataTable(dataTableId);
  const status = (error as AxiosError | null)?.response?.status;

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<RowFilter[]>([]);
  const [page, setPage] = useState(1);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleFiltersChange(value: RowFilter[]) {
    setFilters(value);
    setPage(1);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !dataTable) {
    return (
      <Card>
        <CardContent className="pt-6">
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض هذا الجدول." />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/data-tables"
          className="text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-1 text-sm"
        >
          <ArrowRight className="size-4" />
          جداول البيانات
        </Link>
        <h1 className="text-foreground text-2xl font-bold">{dataTable.tableName}</h1>
      </div>

      <DataTableInfo dataTable={dataTable} />
      <DataTableColumns columns={dataTable.columns} />

      <div className="flex flex-col gap-4">
        <DataTableRowsToolbar
          columns={dataTable.columns}
          filters={filters}
          onSearchChange={handleSearchChange}
          onFiltersChange={handleFiltersChange}
        />
        <DataTableRowsTable
          dataTableId={dataTableId}
          columns={dataTable.columns}
          params={{ search, filters, page, limit: PAGE_SIZE }}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
