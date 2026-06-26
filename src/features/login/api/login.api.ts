import { axiosInstance } from "@/shared/api/axios-instance";
import type { LoginCredentials } from "../model/types";

// POST /auth/login — backend sets the session as httpOnly cookies, body is discarded
export async function login(credentials: LoginCredentials): Promise<void> {
  await axiosInstance.post("/auth/login", credentials);
}
