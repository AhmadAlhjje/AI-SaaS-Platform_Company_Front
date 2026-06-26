import { axiosInstance } from "@/shared/api/axios-instance";
import type { UsageSummary } from "../model/types";

// GET /subscriptions/me/usage
export async function getUsageSummary(): Promise<UsageSummary> {
  const { data } = await axiosInstance.get<UsageSummary>("/subscriptions/me/usage");
  return data;
}
