"use client";

import { useQuery } from "@tanstack/react-query";
import { getDataTableRows } from "../api/get-data-table-rows";
import type { ListDataTableRowsParams } from "./types";

export function useDataTableRows(dataTableId: string, params: ListDataTableRowsParams = {}) {
  return useQuery({
    queryKey: ["data-table-rows", dataTableId, params],
    queryFn: () => getDataTableRows(dataTableId, params),
    retry: false,
    enabled: Boolean(dataTableId),
  });
}
