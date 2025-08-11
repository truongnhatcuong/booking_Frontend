"use client";
import React, { useEffect, useState } from "react";
import TableCustomer from "../components/TableCustomer";
import useSWR from "swr";
import { fetcher, URL_API } from "@/lib/fetcher";
import useAuth from "@/lib/authUser";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading } = useSWR(
    `${URL_API}/api/auth/customer?searchName=${debouncedSearch}&idNumber=${debouncedSearch}`,
    fetcher
  );
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);

  // Nếu còn loading
  if (loadingLog) {
    return <div>đang kiểm tra quyền truy cập...</div>;
  }

  // Kiểm tra trạng thái loading và hiển thị thông báo
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl">
      {
        <TableCustomer
          customers={data.customer || []}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      }
    </div>
  );
};

export default Page;
