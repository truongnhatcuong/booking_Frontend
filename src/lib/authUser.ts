"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/getUser";

export default function useAuth(
  expectedRole?: ("CUSTOMER" | "EMPLOYEE" | "ADMIN")[]
) {
  const [user, setUser] = useState<any>(null);
  const [loadingLog, setLoadingLog] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const data = await getUser();

      if (!data) {
        setLoadingLog(false);
        router.push("/");
        return;
      }

      if (expectedRole && !expectedRole.includes(data.userType)) {
        router.push("/");
        return;
      }

      setUser(data);
      setLoadingLog(false);
    };

    checkUser();
  }, [expectedRole, router]);

  return { user, loadingLog };
}
