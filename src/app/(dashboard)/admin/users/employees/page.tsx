"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import EmployeeTable from "./components/TableEmployee";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import useAuth from "@/lib/authUser";

const Page = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/auth/employee`,
    fetcher
  );
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);
  // Kiểm tra trạng thái loading và hiển thị thông báo
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Nếu còn loading
  if (loadingLog) {
    return <div>đang kiểm tra quyền truy cập...</div>;
  }
  return (
    <div className="bg-white p-6 rounded-xl">
      {<EmployeeTable employee={data?.employee || []} />}
    </div>
  );
};

export default Page;
