"use client";

import { useQuery } from "@tanstack/react-query";
import { getMySubscription } from "../api/get-my-subscription";

export function useMySubscription() {
  return useQuery({
    queryKey: ["subscription", "me"],
    queryFn: getMySubscription,
    retry: false,
  });
}
