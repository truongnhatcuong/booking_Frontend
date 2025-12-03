"use client";
import React from "react";
import RoleTable from "./components/RoleTable";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";
import RoleAdd from "./components/RoleAdd";
import ElegantTitle from "@/app/(dashboard)/components/TitleDashboard/ElegantTitle";

const Page = () => {
  const { data } = useSWR(`${URL_API}/api/role`);

  return (
    <div className="bg-white p-5  rounded-xl">
      <ElegantTitle title="Quản Lý Vai Trò" />
      <div className="flex justify-end mb-5 mr-7">
        {" "}
        <RoleAdd />
      </div>
      <RoleTable roles={data ?? []} />
    </div>
  );
};

export default Page;
