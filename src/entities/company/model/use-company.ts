"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../api/get-company";

export function useCompany() {
  return useQuery({
    queryKey: ["company", "me"],
    queryFn: getCompany,
    retry: false,
  });
}
