import type { AiModelOption } from "./types";

// Mirrors backend/src/shared/constants/ai-models.constants.ts (SUPPORTED_AI_MODELS) —
// keep both lists in sync when adding a model.
export const AI_MODEL_OPTIONS: AiModelOption[] = [
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
  { value: "deepseek-chat", label: "DeepSeek Chat" },
  { value: "llama3.1:8b", label: "Llama 3.1 8B" },
];
