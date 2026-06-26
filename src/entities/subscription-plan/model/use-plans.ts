"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../api/get-plans";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    retry: false,
  });
}
