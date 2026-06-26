"use client";

import { useQuery } from "@tanstack/react-query";
import { getDataTable } from "../api/get-data-table";

export function useDataTable(dataTableId: string) {
  return useQuery({
    queryKey: ["data-table", dataTableId],
    queryFn: () => getDataTable(dataTableId),
    retry: false,
    enabled: Boolean(dataTableId),
  });
}
