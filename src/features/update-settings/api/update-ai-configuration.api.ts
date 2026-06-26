import { axiosInstance } from "@/shared/api/axios-instance";
import type { AiConfiguration, UpdateAiConfigurationInput } from "@/entities/ai-configuration";

// PATCH /ai-configuration
export async function updateAiConfiguration(input: UpdateAiConfigurationInput): Promise<AiConfiguration> {
  const { data } = await axiosInstance.patch<AiConfiguration>("/ai-configuration", input);
  return data;
}
