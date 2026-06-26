import { axiosInstance } from "@/shared/api/axios-instance";
import type { MySubscription } from "../model/types";

// GET /subscriptions/me
export async function getMySubscription(): Promise<MySubscription> {
  const { data } = await axiosInstance.get<MySubscription>("/subscriptions/me");
  return data;
}
