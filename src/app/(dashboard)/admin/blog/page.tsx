"use client";
import React from "react";
import TableBlog from "./components/TableBlog";
import useSWR from "swr";
import useAuth from "@/lib/authUser";

const Page = () => {
  const { data, isLoading } = useSWR(`/api/blog/employee`);
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);

  // Nếu còn loading
  if (loadingLog) {
    return <div>đang kiểm tra quyền truy cập...</div>;
  }
  if (isLoading) return <>...</>;
  return (
    <div>
      <TableBlog posts={data || []} />
    </div>
  );
};

export default Page;
