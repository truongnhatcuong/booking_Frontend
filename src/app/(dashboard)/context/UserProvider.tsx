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
      let token = localStorage.getItem("token");
      if (!token) return;

      let remainingTime = getTokenRemainingTime(token);
      console.log("Thời gian còn lại của token:", remainingTime, "ms");

      // nếu token đã hết hạn hoặc sắp hết hạn
      if (remainingTime <= 1000) {
        try {
          const newToken = await refreshAccessToken();
          localStorage.setItem("token", newToken); // ✅ lưu lại
          token = newToken;
          remainingTime = getTokenRemainingTime(token);
          initUser(); // ✅ cập nhật store sau khi có token mới
        } catch (err) {
          console.error("Refresh token thất bại:", err);
          localStorage.removeItem("token");
          router.push("/signIn");
          return;
        }
      } else {
        // token còn hạn ngay từ đầu → vẫn phải init user
        initUser(); // ✅ chỗ này trong code cũ bị thiếu
      }

      // đặt lịch kiểm tra/refresh tiếp theo
      if (remainingTime > 1000) {
        timer = setTimeout(handleToken, remainingTime - 1000);
      } else {
        // fallback nếu remainingTime quá nhỏ hoặc bằng 0
        timer = setTimeout(handleToken, 30_000);
      }
    };

    handleToken();

    return () => clearTimeout(timer);
  }, [router, initUser]);

  return <>{children}</>;
}
