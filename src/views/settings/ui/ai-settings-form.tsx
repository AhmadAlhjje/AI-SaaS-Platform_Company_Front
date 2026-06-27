"use client";

import { Loader2, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { AiConfiguration } from "@/entities/ai-configuration";
import { AI_MODEL_OPTIONS } from "@/entities/ai-model";
import { ResetSettingsButton } from "@/features/reset-ai-settings";
import { useUpdateAiConfiguration } from "@/features/update-settings";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Skeleton } from "@/shared/ui/skeleton";
import { Textarea } from "@/shared/ui/textarea";

// محمَّل عبر next/dynamic لأنه ليس ظاهراً في أول رسم للصفحة (ROLE.md §16)
const TestPromptPanel = dynamic(() => import("@/features/test-prompt").then((mod) => mod.TestPromptPanel), {
  ssr: false,
  loading: () => <Skeleton className="h-40 w-full" />,
});

const SELECT_CLASS =
  "border-input bg-background h-9 rounded-lg border px-3 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface AiSettingsFormProps {
  config: AiConfiguration;
}

// Keyed by `config.updatedAt` from the caller — remounts (and resets local
// state) after a successful save/reset instead of syncing via an effect.
export function AiSettingsForm({ config }: AiSettingsFormProps) {
  const [systemPrompt, setSystemPrompt] = useState(config.systemPrompt ?? "");
  const [model, setModel] = useState(config.model);
  const [temperature, setTemperature] = useState(config.temperature);
  const [maxTokens, setMaxTokens] = useState(config.maxTokens);
  const [ragTopK, setRagTopK] = useState(config.ragTopK);

  const updateAiConfigurationMutation = useUpdateAiConfiguration();

  function handleSave() {
    updateAiConfigurationMutation.mutate({
      systemPrompt: systemPrompt.trim() ? systemPrompt.trim() : null,
      model,
      temperature,
      maxTokens,
      ragTopK,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الذكاء الاصطناعي</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              rows={6}
              placeholder="مثال: أنت مساعد دعم فني متخصص في شركتنا، أجب بالعربية وبأسلوب رسمي ومختصر."
              value={systemPrompt}
              onChange={(event) => setSystemPrompt(event.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              يحدد شخصية المساعد وأسلوب رده. اتركه فارغاً لاستخدام السلوك الافتراضي.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model">النموذج</Label>
              <select
                id="model"
                className={SELECT_CLASS}
                value={model}
                onChange={(event) => setModel(event.target.value)}
              >
                {AI_MODEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="temperature">درجة الإبداع (Temperature): {temperature.toFixed(1)}</Label>
              <input
                id="temperature"
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={temperature}
                onChange={(event) => setTemperature(Number(event.target.value))}
                className="accent-primary h-9"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="maxTokens">الحد الأقصى للرموز (Max Tokens)</Label>
              <Input
                id="maxTokens"
                type="number"
                min={1}
                max={8000}
                value={maxTokens}
                onChange={(event) => setMaxTokens(Number(event.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ragTopK">عدد المقاطع المسترجعة (RAG Top K)</Label>
              <Input
                id="ragTopK"
                type="number"
                min={1}
                max={50}
                value={ragTopK}
                onChange={(event) => setRagTopK(Number(event.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" disabled={updateAiConfigurationMutation.isPending} onClick={handleSave}>
              {updateAiConfigurationMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              حفظ الإعدادات
            </Button>
            <ResetSettingsButton />
          </div>
        </CardContent>
      </Card>

      <TestPromptPanel
        systemPrompt={systemPrompt.trim() ? systemPrompt.trim() : null}
        model={model}
        temperature={temperature}
        maxTokens={maxTokens}
      />
    </div>
  );
}
