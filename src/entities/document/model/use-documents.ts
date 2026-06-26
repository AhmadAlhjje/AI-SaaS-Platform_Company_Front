"use client";

import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../api/get-documents";

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
    retry: false,
  });
}
