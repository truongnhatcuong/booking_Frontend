"use client";
import React, { useState } from "react";
import TableRoom from "./components/TableRoom";
import CreateRoom from "./components/CreateRoom";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";
import SearchForm from "@/app/(dashboard)/components/searchPage/SearchForm";
import Pagination from "@/app/(dashboard)/components/Pagination/Pagination";

const Page = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: dataRoom } = useSWR(
    `${URL_API}/api/room?search=${search}&limit=${limit}&page=${page}`
  );
  const { data: DataTypeRoom } = useSWR(`${URL_API}/api/roomtype`);
  const totalPages: number = dataRoom?.room.pagination?.totalPages || 1;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <SearchForm search={search} setSearch={setSearch} setPage={setPage} />
        <CreateRoom data={DataTypeRoom ?? []} />
      </div>
      <TableRoom rooms={dataRoom?.room.data ?? []} data={DataTypeRoom} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Page;
