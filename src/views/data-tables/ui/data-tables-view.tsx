"use client";

import { useState } from "react";
import { DataTablesList } from "./data-tables-list";
import { DataTablesToolbar } from "./data-tables-toolbar";

export function DataTablesView() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">جداول البيانات</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          البيانات المستخرجة من ملفات CSV و Excel، والتي يستخدمها مساعد الاستعلام الذكي.
        </p>
      </div>
      <DataTablesToolbar onSearchChange={handleSearchChange} />
      <DataTablesList search={search} page={page} onPageChange={setPage} />
    </div>
  );
}
