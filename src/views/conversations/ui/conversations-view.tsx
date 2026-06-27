"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useConversations } from "@/entities/conversation";
import { cn } from "@/shared/lib/utils";
import { EmptyState } from "@/shared/ui/empty-state";
import { ChatPanel } from "./chat-panel";
import { ConversationSidebar } from "./conversation-sidebar";

export function ConversationsView() {
  const { data: conversations } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  // على الموبايل تُعرض القائمة أو المحادثة بالتناوب (مساحة شاشة محدودة)؛
  // على الشاشات الكبيرة تُعرض القائمة والمحادثة معاً دائماً (انظر classes أدناه).
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  // Falls back to the most recent conversation until the user explicitly
  // picks one — derived directly instead of synced via an effect.
  const effectiveConversationId = selectedConversationId ?? conversations?.[0]?.id ?? null;
  const selectedConversation =
    conversations?.find((conversation) => conversation.id === effectiveConversationId) ?? null;

  function handleSelect(conversationId: string) {
    setSelectedConversationId(conversationId);
    setShowChatOnMobile(true);
  }

  function handleConversationDeleted(conversationId: string) {
    if (effectiveConversationId === conversationId) {
      setSelectedConversationId(null);
      setShowChatOnMobile(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col gap-4 lg:h-[calc(100vh-6.5rem)]">
      <div>
        <h1 className="text-foreground text-2xl font-bold">المساعد الذكي</h1>
        <p className="text-muted-foreground mt-1 text-sm">اسأل المساعد عن مستنداتك وبياناتك.</p>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className={cn("flex-1 lg:flex-none", showChatOnMobile && "hidden lg:block")}>
          <ConversationSidebar
            selectedConversationId={effectiveConversationId}
            onSelect={handleSelect}
            onDeleted={handleConversationDeleted}
          />
        </div>

        {selectedConversation ? (
          <div className={cn("min-w-0 flex-1", !showChatOnMobile && "hidden lg:flex")}>
            <ChatPanel
              conversationId={selectedConversation.id}
              conversationTitle={selectedConversation.title}
              onCleared={() => {
                setSelectedConversationId(null);
                setShowChatOnMobile(false);
              }}
              onBack={() => setShowChatOnMobile(false)}
            />
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center lg:flex">
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
