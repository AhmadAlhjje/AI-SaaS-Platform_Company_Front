"use client";

import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../api/get-conversations";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    retry: false,
  });
}
