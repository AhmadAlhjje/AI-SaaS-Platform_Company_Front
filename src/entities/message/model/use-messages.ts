"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/get-messages";

export function useMessages(conversationId: string | null) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId!),
    retry: false,
    enabled: Boolean(conversationId),
  });
}
