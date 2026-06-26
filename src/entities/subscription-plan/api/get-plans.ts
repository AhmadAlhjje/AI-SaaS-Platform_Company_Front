import { axiosInstance } from "@/shared/api/axios-instance";
import type { Plan } from "../model/types";

// GET /plans — all available plans ordered by price asc
export async function getPlans(): Promise<Plan[]> {
  const { data } = await axiosInstance.get<Plan[]>("/plans");
  return data;
}
