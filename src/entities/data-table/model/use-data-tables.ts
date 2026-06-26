"use client";

import { useQuery } from "@tanstack/react-query";
import { getDataTables } from "../api/get-data-tables";

export function useDataTables() {
  return useQuery({
    queryKey: ["data-tables"],
    queryFn: getDataTables,
    retry: false,
  });
}
