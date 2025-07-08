"use client";
import React from "react";
import TableMaintenance from "./components/TableMaitenance";
import useSWR from "swr";
import useAuth from "@/lib/authUser";

const Page = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL_API}/api/maintenance`);
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);

  // Nếu còn loading
  if (loadingLog) {
    return <div>đang kiểm tra quyền truy cập...</div>;
  }
  return (
    <div>
      <TableMaintenance maintenance={data || []} />
    </div>
  );
};

export default Page;
