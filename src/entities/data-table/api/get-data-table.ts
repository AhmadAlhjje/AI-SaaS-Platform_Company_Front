import { axiosInstance } from "@/shared/api/axios-instance";
import type { DataTableDetail } from "../model/types";

// GET /data-tables/:id/schema — columns + row count for the table info panel
export async function getDataTable(dataTableId: string): Promise<DataTableDetail> {
  const { data } = await axiosInstance.get<DataTableDetail>(`/data-tables/${dataTableId}/schema`);
  return data;
}
