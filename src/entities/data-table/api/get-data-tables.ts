import { axiosInstance } from "@/shared/api/axios-instance";
import type { DataTable } from "../model/types";

// GET /data-tables — all tables for the current company, ordered by createdAt desc
export async function getDataTables(): Promise<DataTable[]> {
  const { data } = await axiosInstance.get<DataTable[]>("/data-tables");
  return data;
}
