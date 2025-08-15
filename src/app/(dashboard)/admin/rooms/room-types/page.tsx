"use client";
import React from "react";
import RoomTypesAdminPage from "./components/TableRoomtype";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/roomtype`,
    fetcher
  );

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl">
      <RoomTypesAdminPage roomTypes={data} />
    </div>
  );
};

export default Page;
