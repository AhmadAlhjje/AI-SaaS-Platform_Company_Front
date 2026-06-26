export interface AiConfiguration {
  id: string;
  systemPrompt: string | null;
  model: string;
  temperature: number;
  maxTokens: number;
  ragTopK: number;
  updatedAt: string;
}

export interface UpdateAiConfigurationInput {
  systemPrompt: string | null;
  model: string;
  temperature: number;
  maxTokens: number;
  ragTopK: number;
}
