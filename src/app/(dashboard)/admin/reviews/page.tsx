"use client";
import React from "react";
import CheckReviewUser from "./components/CheckReviewUser";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";
import useAuth from "@/lib/authUser";

const Page = () => {
  const { data } = useSWR(`${URL_API}/api/review/all`);
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);

  // Nếu còn loading
  if (loadingLog) {
    return <div>đang kiểm tra quyền truy cập...</div>;
  }
  return (
    <>
      <CheckReviewUser reviews={data || []} />
    </>
  );
};

export default Page;
