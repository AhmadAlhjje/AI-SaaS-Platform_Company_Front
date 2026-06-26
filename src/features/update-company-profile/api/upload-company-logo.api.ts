import { axiosInstance } from "@/shared/api/axios-instance";
import type { Company } from "@/entities/company";

// POST /companies/me/logo (multipart/form-data)
export async function uploadCompanyLogo(file: File): Promise<Company> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post<Company>("/companies/me/logo", formData, {
    // The shared instance defaults to Content-Type: application/json, which
    // makes axios JSON-stringify the FormData instead of sending it as
    // multipart — clearing it lets the browser set the correct boundary.
    headers: { "Content-Type": undefined },
  });

  return data;
}
