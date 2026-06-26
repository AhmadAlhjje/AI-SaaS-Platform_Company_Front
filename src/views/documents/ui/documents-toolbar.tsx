"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { UploadDocumentSheet } from "./upload-document-sheet";

interface DocumentsToolbarProps {
  onSearchChange: (search: string) => void;
}

export function DocumentsToolbar({ onSearchChange }: DocumentsToolbarProps) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full max-w-sm">
        <Search className="text-muted-foreground absolute inset-s-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder="بحث باسم الملف..."
          className="ps-9"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      <UploadDocumentSheet />
    </div>
  );
}
