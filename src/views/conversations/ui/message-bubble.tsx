"use client";

import { Check, Copy, Sparkles, User2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Message } from "@/entities/message";
import { RegenerateButton } from "@/features/regenerate-message";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { MarkdownContent } from "./markdown-content";
import { TypewriterMarkdown } from "./typewriter-markdown";

interface MessageBubbleProps {
  message: Message;
  conversationId: string;
  isStreaming: boolean;
  onStreamDone: () => void;
  showRegenerate: boolean;
  onRegenerated: (aiMessageId: string) => void;
}

export function MessageBubble({
  message,
  conversationId,
  isStreaming,
  onStreamDone,
  showRegenerate,
  onRegenerated,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.senderType === "user";

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("تم نسخ الرسالة");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="bg-ai/10 text-ai mt-1 flex size-7 shrink-0 items-center justify-center rounded-full">
          <Sparkles className="size-4" />
        </div>
      )}

      <div className={cn("group flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser ? "bg-primary text-primary-foreground" : "bg-card border-border border",
          )}
        >
          {isStreaming ? (
            <TypewriterMarkdown key={message.id} content={message.content} onDone={onStreamDone} />
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="ghost" size="icon-xs" aria-label="نسخ الرسالة" onClick={handleCopy}>
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          </Button>
          {showRegenerate && <RegenerateButton conversationId={conversationId} onRegenerated={onRegenerated} />}
        </div>
      </div>

      {isUser && (
        <div className="bg-muted text-muted-foreground mt-1 flex size-7 shrink-0 items-center justify-center rounded-full">
          <User2 className="size-4" />
        </div>
      )}
    </div>
  );
}
