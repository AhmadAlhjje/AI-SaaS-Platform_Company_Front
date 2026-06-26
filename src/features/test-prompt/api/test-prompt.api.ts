import { axiosInstance } from "@/shared/api/axios-instance";

export interface TestPromptInput {
  question: string;
  systemPrompt: string | null;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface TestPromptResult {
  content: string;
  modelUsed: string;
}

// POST /ai/test-prompt — runs the (possibly unsaved) prompt/model/temperature
// directly against the LLM, bypassing RAG/SQL routing entirely.
export async function testPrompt(input: TestPromptInput): Promise<TestPromptResult> {
  const { data } = await axiosInstance.post<TestPromptResult>("/ai/test-prompt", input);
  return data;
}
