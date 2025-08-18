"use client";
import React from "react";
import RoomTypesAdminPage from "./components/TableRoomtype";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import CreateRoomtype from "./components/CreateRoomtype";
import ElegantTitle from "@/app/(dashboard)/components/TitleDashboard/ElegantTitle";
import SearchForm from "@/app/(dashboard)/components/searchPage/SearchForm";

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
      <ElegantTitle title="Quản Lý Loại Phòng" className="ml-5 mb-5" />
      <div className="flex justify-between items-center">
        {" "}
        <SearchForm
          placeholder="Tìm Kiếm Loại Phòng"
          search=""
          setPage={() => {}}
          setSearch={() => {}}
        />
        <CreateRoomtype />
      </div>
      <RoomTypesAdminPage roomTypes={data} />
    </div>
  );
};

export default Page;
