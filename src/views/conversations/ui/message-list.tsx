"use client";

import { MessageSquare, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Message } from "@/entities/message";
import { EmptyState } from "@/shared/ui/empty-state";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  conversationId: string;
  messages: Message[];
  isWaitingForReply: boolean;
  streamingMessageId: string | null;
  onStreamDone: () => void;
  onRegenerated: (aiMessageId: string) => void;
}

export function MessageList({
  conversationId,
  messages,
  isWaitingForReply,
  streamingMessageId,
  onStreamDone,
  onRegenerated,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isWaitingForReply]);

  if (messages.length === 0 && !isWaitingForReply) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={MessageSquare}
          title="ابدأ محادثة مع المساعد الذكي"
          description="اكتب سؤالك في الأسفل واضغط إرسال."
        />
      </div>
    );
  }

  const lastAiMessageId = [...messages].reverse().find((message) => message.senderType === "ai")?.id;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          conversationId={conversationId}
          isStreaming={message.id === streamingMessageId}
          onStreamDone={onStreamDone}
          showRegenerate={message.id === lastAiMessageId && message.id !== streamingMessageId}
          onRegenerated={onRegenerated}
        />
      ))}

      {isWaitingForReply && (
        <div className="flex items-center gap-2">
          <div className="bg-ai/10 text-ai flex size-7 shrink-0 items-center justify-center rounded-full">
            <Sparkles className="size-4" />
          </div>
          <div className="bg-card border-border flex items-center gap-1 rounded-2xl border px-4 py-2.5">
            <span className="bg-muted-foreground motion-reduce:animate-none size-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
            <span className="bg-muted-foreground motion-reduce:animate-none size-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
            <span className="bg-muted-foreground motion-reduce:animate-none size-1.5 animate-bounce rounded-full" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
