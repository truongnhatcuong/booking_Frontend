"use client";
import React from "react";
import TableMaintenance from "./components/TableMaitenance";
import useSWR from "swr";
import ElegantTitle from "@/app/(dashboard)/components/TitleDashboard/ElegantTitle";

const Page = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL_API}/api/maintenance`);

  // Nếu còn loading

  return (
    <div className="bg-white p-6 rounded-xl ">
      <ElegantTitle title="Quản lý bảo trì" />
      <TableMaintenance maintenance={data || []} />
    </div>
  );
};

export default Page;
