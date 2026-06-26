import { axiosInstance } from "@/shared/api/axios-instance";
import type { AiConfiguration } from "../model/types";

// GET /ai-configuration — auto-provisioned with defaults if the company has none yet
export async function getAiConfiguration(): Promise<AiConfiguration> {
  const { data } = await axiosInstance.get<AiConfiguration>("/ai-configuration");
  return data;
}
