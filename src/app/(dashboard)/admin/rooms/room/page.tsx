"use client";
import React, { useState } from "react";
import TableRoom from "./components/TableRoom";
import CreateRoom from "./components/CreateRoom";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";
import SearchForm from "@/app/(dashboard)/components/searchPage/SearchForm";
import Pagination from "@/app/(dashboard)/components/Pagination/Pagination";
import { RoomTypeFilter } from "./components/RoomTypeFilter";
import { StatusFilter } from "./components/StatusFilter";
import ElegantTitle from "@/app/(dashboard)/components/TitleDashboard/ElegantTitle";
import LimitSelector from "@/app/(dashboard)/components/Pagination/SelectRecord";

const Page = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const params = new URLSearchParams();

  selectedRoomTypes.forEach((item) => params.append("roomType", item));
  const { data: dataRoom } = useSWR(
    `${URL_API}/api/room?search=${search}&limit=${limit}&page=${page}&${params.toString()}&status=${selectedStatuses}`
  );
  const { data: DataTypeRoom } = useSWR(
    `${URL_API}/api/roomtype?page=1&limit=9999`
  );

  const totalPages: number = dataRoom?.room.pagination?.totalPages || 1;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <ElegantTitle title="Quản Lý Danh Sách Phòng" className="mb-5 ml-5" />

      <div className="lg:flex lg:justify-between items-center my-5">
        <div className="hidden lg:block">
          <SearchForm
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            placeholder="Nhập Số Phòng Tại Đây ...."
          />
        </div>

        <CreateRoom data={DataTypeRoom?.roomType ?? []} />
        <div className="block lg:hidden">
          <SearchForm
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            placeholder="Nhập Số Phòng Tại Đây ...."
          />
        </div>
      </div>
      <div className="mb-5 flex flex-col lg:flex-row items-center gap-6">
        <RoomTypeFilter
          className="w-full lg:w-60"
          placeholder="Chọn loại phòng"
          showCapacity={true}
          options={DataTypeRoom?.roomType}
          onTypeChange={setSelectedRoomTypes}
          selectedTypes={selectedRoomTypes}
        />
        <StatusFilter
          options={dataRoom?.room?.data || []}
          selectedStatuses={selectedStatuses}
          onStatusChange={setSelectedStatuses}
          placeholder="Chọn trạng thái phòng"
          multiple={false}
          className="w-full lg:w-60 "
        />
      </div>
      <TableRoom
        rooms={dataRoom?.room.data ?? []}
        data={DataTypeRoom?.roomType || []}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      <LimitSelector value={limit} onChange={(value) => setLimit(value)} />
    </div>
  );
};

export default Page;
