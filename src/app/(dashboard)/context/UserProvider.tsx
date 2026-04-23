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
  const { initUser, user } = useUserStore(); // 👈 Lấy thẳng biến user từ zustand ra
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
      // 👈 Lấy từ user.token (nếu vừa login), hoặc fallback Local cho chắc
      const token = localStorage.getItem("token");

      if (!token) {
        // Này là báo bình thường khi người chơi chưa Login (Khách), không phải Lỗi
        console.log("❌ Không có token để check (do chưa đăng nhập)");
        return;
      }

      const remainingTime = getTokenRemainingTime(token);
      console.log("⏱ Token còn lại:", Math.round(remainingTime / 1000), "giây");

      if (remainingTime <= 1000) {
        console.log("🔄 Token sắp tàn phế → đang xách giỏ đi refresh...");
        try {
          const newToken = await refreshAccessToken();
          console.log("✅ Tu tiên Refresh thành công, thọ thêm 1 tiếng");
          initUser();
          const newRemaining = getTokenRemainingTime(newToken);
          timer = setTimeout(
            handleToken,
            newRemaining > 1000 ? newRemaining - 1000 : 30_000,
          );
        } catch (err: any) {
          console.log("❌ Refresh tạch rồi:", err?.message || err);
          localStorage.removeItem("token");
          router.push("/");
        }
      } else {
        initUser();
        // Cài báo thức lúc nó ngỏm - 1 giây sẽ gọi đi vòng lặp tiếp
        timer = setTimeout(handleToken, remainingTime - 1000);
      }
    };

    handleToken();

    return () => clearTimeout(timer); // Chống kẹt bộ nhớ khi thoát Component
  }, [user?.token]); // 👈 Quan trọng cực kì: Chèn user?.token vào đây. Để hễ cứ đăng nhập thành công là Token chạy vào -> useEffect tự thức tỉnh đo lại giờ!

  return <>{children}</>;
}
