"use client";
import { useEffect } from "react";
import { useUserStore } from "@/hook/useUserStore";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initUser } = useUserStore();
  const router = useRouter();

  function getTokenRemainingTime(token: string | null): number {
    if (!token) return 0;
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      if (!decoded.exp) return 0;
      const remaining = decoded.exp * 1000 - Date.now();
      return remaining > 0 ? remaining : 0;
    } catch (e) {
      console.error("Token không hợp lệ:", e);
      return 0;
    }
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ Không có token trong localStorage");
        return;
      }

      const remainingTime = getTokenRemainingTime(token);
      console.log("⏱ Token còn lại:", Math.round(remainingTime / 1000), "giây");

      if (remainingTime <= 1000) {
        console.log("🔄 Token hết hạn → đang refresh...");
        try {
          const newToken = await refreshAccessToken();
          console.log("✅ Refresh thành công");
          initUser();
          const newRemaining = getTokenRemainingTime(newToken);
          timer = setTimeout(
            handleToken,
            newRemaining > 1000 ? newRemaining - 1000 : 30_000,
          );
        } catch (err: any) {
          console.log("❌ Refresh thất bại:", err?.message || err);
          console.log("❌ Response:", err?.response?.data);
          console.log("❌ Status:", err?.response?.status);
          localStorage.removeItem("token");
          router.push("/");
        }
      } else {
        initUser();
        timer = setTimeout(handleToken, remainingTime - 1000);
      }
    };

    handleToken();

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
