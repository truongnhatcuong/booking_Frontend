"use client";
import React, { useEffect, useState } from "react";
import TableCustomer from "./components/TableCustomer";
import useSWR from "swr";
import { fetcher, URL_API } from "@/lib/fetcher";
import Pagination from "@/app/(dashboard)/components/Pagination/Pagination";
import LimitSelector from "@/app/(dashboard)/components/Pagination/SelectRecord";
import { useDebounce } from "../../../../../../hook/Debounce";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400); // gọi API sau khi ngừng gõ 0.4s
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const { data, isLoading } = useSWR(
    `${URL_API}/api/auth/customer?search=${debouncedSearch}&page=${currentPage}&limit=${limit}`,
    fetcher
  );

  // Kiểm tra trạng thái loading và hiển thị thông báo
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl">
      <TableCustomer
        customers={data.customer.result || []}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Pagination
        page={currentPage}
        setPage={setCurrentPage}
        totalPages={data.customer.totalPages || 1}
      />
      <LimitSelector onChange={setLimit} value={limit} />
    </div>
  );
};

export default Page;
