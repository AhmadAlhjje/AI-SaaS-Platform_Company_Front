import { axiosInstance } from "@/shared/api/axios-instance";
import type { ListDataTableRowsParams, PaginatedDataTableRows } from "../model/types";

// GET /data-tables/:id/rows?search=&filters=&page=&limit= — filters is JSON-encoded since the
// backend query string can't carry nested objects directly.
export async function getDataTableRows(
  dataTableId: string,
  params: ListDataTableRowsParams = {},
): Promise<PaginatedDataTableRows> {
  const { filters, ...rest } = params;

  const { data } = await axiosInstance.get<PaginatedDataTableRows>(`/data-tables/${dataTableId}/rows`, {
    params: {
      ...rest,
      filters: filters && filters.length > 0 ? JSON.stringify(filters) : undefined,
    },
  });

  return data;
}
