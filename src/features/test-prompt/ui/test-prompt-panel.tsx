"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";
import { useTestPrompt } from "../model/use-test-prompt";

interface TestPromptPanelProps {
  systemPrompt: string | null;
  model: string;
  temperature: number;
  maxTokens: number;
}

// Tests the form's current (possibly unsaved) settings — does not require
// saving first, since /ai/test-prompt accepts them directly.
export function TestPromptPanel({ systemPrompt, model, temperature, maxTokens }: TestPromptPanelProps) {
  const [question, setQuestion] = useState("");
  const testPromptMutation = useTestPrompt();

  function handleTest() {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }
    testPromptMutation.mutate({ question: trimmed, systemPrompt, model, temperature, maxTokens });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>اختبار Prompt</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Textarea
          placeholder="اكتب سؤالاً تجريبياً لمعرفة كيف سيرد المساعد بهذه الإعدادات..."
          rows={2}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          className="self-start"
          disabled={!question.trim() || testPromptMutation.isPending}
          onClick={handleTest}
        >
          {testPromptMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          اختبار
        </Button>

        {testPromptMutation.data && (
          <div className="bg-muted/50 border-border flex flex-col gap-2 rounded-lg border p-3">
            <p className="text-foreground text-sm whitespace-pre-wrap">{testPromptMutation.data.content}</p>
            <Badge variant="secondary" className="self-start">
              {testPromptMutation.data.modelUsed}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
