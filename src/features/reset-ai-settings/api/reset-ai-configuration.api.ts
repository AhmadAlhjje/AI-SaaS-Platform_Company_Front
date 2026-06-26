import { axiosInstance } from "@/shared/api/axios-instance";
import type { AiConfiguration } from "@/entities/ai-configuration";

// POST /ai-configuration/reset
export async function resetAiConfiguration(): Promise<AiConfiguration> {
  const { data } = await axiosInstance.post<AiConfiguration>("/ai-configuration/reset");
  return data;
}
