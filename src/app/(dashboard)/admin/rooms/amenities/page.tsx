"use client";
import React from "react";
import TableAmenies from "./components/TableAmenies";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddAmenies from "./components/AddAmenies";
import { Input } from "@/components/ui/input";
import ElegantTitle from "@/app/(dashboard)/components/TitleDashboard/ElegantTitle";

const Page = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/amenity`,
    fetcher
  );

  // Nếu còn loading

  if (error) {
    return <div>Đã xảy ra lỗi: {error.message}</div>;
  }

  // Kiểm tra trạng thái loading và hiển thị thông báo
  return (
    <div className="bg-white p-6 rounded-xl">
      <ElegantTitle title="Quản lý tiện nghi" />
      <div className="flex justify-end items-center ">
        <AddAmenies />
      </div>
      {isLoading ? (
        <div className="text-center col-span-5">Đang tải dữ liệu...</div>
      ) : (
        <TableAmenies amenities={data?.amenity || []} />
      )}
    </div>
  );
};

export default Page;
