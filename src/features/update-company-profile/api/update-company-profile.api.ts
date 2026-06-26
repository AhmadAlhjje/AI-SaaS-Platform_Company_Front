import { axiosInstance } from "@/shared/api/axios-instance";
import type { Company, UpdateCompanyProfileInput } from "@/entities/company";

// PATCH /companies/me
export async function updateCompanyProfile(input: UpdateCompanyProfileInput): Promise<Company> {
  const { data } = await axiosInstance.patch<Company>("/companies/me", input);
  return data;
}
