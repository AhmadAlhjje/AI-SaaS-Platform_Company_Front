"use client";

import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../api/get-documents";
import type { ListDocumentsParams, PaginatedDocuments } from "./types";

const POLL_INTERVAL_MS = 4000;

// Polls while any document on the current page is still "processing"
export function useDocuments(params: ListDocumentsParams = {}) {
  return useQuery({
    queryKey: ["documents", params],
    queryFn: () => getDocuments(params),
    retry: false,
    refetchInterval: (query) => {
      const data = query.state.data as PaginatedDocuments | undefined;
      return data?.items.some((document) => document.status === "processing") ? POLL_INTERVAL_MS : false;
    },
  });
}
