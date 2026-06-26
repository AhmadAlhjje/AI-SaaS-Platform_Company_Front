"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useConversations } from "@/entities/conversation";
import { EmptyState } from "@/shared/ui/empty-state";
import { ChatPanel } from "./chat-panel";
import { ConversationSidebar } from "./conversation-sidebar";

export function ConversationsView() {
  const { data: conversations } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Falls back to the most recent conversation until the user explicitly
  // picks one — derived directly instead of synced via an effect.
  const effectiveConversationId = selectedConversationId ?? conversations?.[0]?.id ?? null;
  const selectedConversation =
    conversations?.find((conversation) => conversation.id === effectiveConversationId) ?? null;

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col gap-4 lg:h-[calc(100vh-6.5rem)]">
      <div>
        <h1 className="text-foreground text-2xl font-bold">المساعد الذكي</h1>
        <p className="text-muted-foreground mt-1 text-sm">اسأل المساعد عن مستنداتك وبياناتك.</p>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <ConversationSidebar selectedConversationId={effectiveConversationId} onSelect={setSelectedConversationId} />

        {selectedConversation ? (
          <ChatPanel
            conversationId={selectedConversation.id}
            conversationTitle={selectedConversation.title}
            onCleared={() => setSelectedConversationId(null)}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              icon={MessageSquare}
              title="اختر محادثة أو أنشئ محادثة جديدة"
              description="استخدم الزر في الأعلى لبدء محادثة جديدة مع المساعد الذكي."
            />
          </div>
        )}
      </div>
    </div>
  );
}
