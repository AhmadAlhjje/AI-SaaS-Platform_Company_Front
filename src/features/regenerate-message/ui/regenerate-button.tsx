"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useRegenerateMessage } from "../model/use-regenerate-message";

interface RegenerateButtonProps {
  conversationId: string;
  onRegenerated: (aiMessageId: string) => void;
}

export function RegenerateButton({ conversationId, onRegenerated }: RegenerateButtonProps) {
  const regenerateMessageMutation = useRegenerateMessage();

  function handleClick() {
    regenerateMessageMutation.mutate(conversationId, {
      onSuccess: (aiMessage) => onRegenerated(aiMessage.id),
    });
  }

  return (
    <Button variant="ghost" size="sm" disabled={regenerateMessageMutation.isPending} onClick={handleClick}>
      {regenerateMessageMutation.isPending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <RotateCcw className="size-3.5" />
      )}
      إعادة توليد الإجابة
    </Button>
  );
}
