"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsageSummary } from "../api/get-usage-summary";

export function useUsageSummary() {
  return useQuery({
    queryKey: ["subscription", "me", "usage"],
    queryFn: getUsageSummary,
    retry: false,
  });
}
