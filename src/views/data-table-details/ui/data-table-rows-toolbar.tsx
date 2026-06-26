"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { DataTableColumn, RowFilter } from "@/entities/data-table";
import { Input } from "@/shared/ui/input";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { DataTableFilterBuilder } from "./data-table-filter-builder";

interface DataTableRowsToolbarProps {
  columns: DataTableColumn[];
  filters: RowFilter[];
  onSearchChange: (search: string) => void;
  onFiltersChange: (filters: RowFilter[]) => void;
}

export function DataTableRowsToolbar({
  columns,
  filters,
  onSearchChange,
  onFiltersChange,
}: DataTableRowsToolbarProps) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full max-w-sm">
        <Search className="text-muted-foreground absolute inset-s-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder="بحث في الصفوف..."
          className="ps-9"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      <DataTableFilterBuilder columns={columns} filters={filters} onChange={onFiltersChange} />
    </div>
  );
}
