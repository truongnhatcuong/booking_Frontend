"use client";
import React, { useState } from "react";
import TableCustomer from "./components/TableCustomer";
import SearchForm from "@/app/(dashboard)/components/searchPage/SearchForm";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";
import Pagination from "@/app/(dashboard)/components/Pagination/Pagination";
import LimitSelector from "@/app/(dashboard)/components/Pagination/SelectRecord";
import { useDebounce } from "../../../../../hook/Debounce";
import ElegantTitle from "@/app/(dashboard)/components/TitleDashboard/ElegantTitle";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400); // gọi API sau khi ngừng gõ 0.4s
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useSWR(
    `${URL_API}/api/auth/customer?search=${debouncedSearch}&page=${currentPage}&limit=${limit}`
  );

  return (
    <div className="bg-white p-6 rounded-xl">
      <ElegantTitle title="Quản Lý Khách Hàng" />
      <div className="my-6">
        <SearchForm
          placeholder="Tìm Kiếm Theo Tên / CCCD..."
          search={searchTerm}
          setSearch={setSearchTerm}
          setPage={setCurrentPage}
        />
      </div>
      {isLoading ? (
        <div className="text-center col-span-5">Đang tải dữ liệu...</div>
      ) : (
        <TableCustomer customers={data?.customer.result ?? []} />
      )}
      <Pagination
        page={currentPage}
        setPage={setCurrentPage}
        totalPages={data?.customer.totalPages || 1}
      />
      <LimitSelector onChange={setLimit} value={limit} />
    </div>
  );
};

export default Page;
