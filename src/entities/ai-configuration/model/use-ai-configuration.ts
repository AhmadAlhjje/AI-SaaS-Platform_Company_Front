"use client";

import { useQuery } from "@tanstack/react-query";
import { getAiConfiguration } from "../api/get-ai-configuration";

export function useAiConfiguration() {
  return useQuery({
    queryKey: ["ai-configuration"],
    queryFn: getAiConfiguration,
    retry: false,
  });
}
