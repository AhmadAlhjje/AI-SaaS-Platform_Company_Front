"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

interface MessageComposerProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function MessageComposer({ onSend, disabled }: MessageComposerProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) {
      return;
    }
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-end gap-2">
      <Textarea
        placeholder="اكتب رسالتك... (Enter للإرسال، Shift+Enter لسطر جديد)"
        rows={2}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <Button size="icon-lg" aria-label="إرسال" disabled={disabled || !value.trim()} onClick={handleSend}>
        {disabled ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
      </Button>
    </div>
  );
}
