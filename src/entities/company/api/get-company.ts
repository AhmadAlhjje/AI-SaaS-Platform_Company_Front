import { axiosInstance } from "@/shared/api/axios-instance";
import type { Company } from "../model/types";

// GET /companies/me
export async function getCompany(): Promise<Company> {
  const { data } = await axiosInstance.get<Company>("/companies/me");
  return data;
}
