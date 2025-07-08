"use client";
import React from "react";
import RoleTable from "./components/RoleTable";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";
import RoleAdd from "./components/RoleAdd";
import useAuth from "@/lib/authUser";

const Page = () => {
  const { data } = useSWR(`${URL_API}/api/role`);
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);

  // Nếu còn loading
  if (loadingLog) {
    return <div>đang kiểm tra quyền truy cập...</div>;
  }
  return (
    <div>
      <div className="flex justify-end mb-5 mr-7">
        {" "}
        <RoleAdd />
      </div>
      <RoleTable roles={data ?? []} />
    </div>
  );
};

export default Page;
