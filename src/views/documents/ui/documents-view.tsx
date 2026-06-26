"use client";

import { useState } from "react";
import { DocumentsTable } from "./documents-table";
import { DocumentsToolbar } from "./documents-toolbar";

export function DocumentsView() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">المستندات</h1>
        <p className="text-muted-foreground mt-1 text-sm">إدارة قاعدة المعرفة الخاصة بشركتك.</p>
      </div>
      <DocumentsToolbar onSearchChange={handleSearchChange} />
      <DocumentsTable search={search} page={page} onPageChange={setPage} />
    </div>
  );
}
