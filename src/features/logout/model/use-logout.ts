import { useRouter } from "next/navigation";
import { axiosInstance } from "@/shared/api/axios-instance";

export function useLogout(): () => Promise<void> {
  const router = useRouter();

  return async function logout() {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      router.replace("/login");
    }
  };
}
